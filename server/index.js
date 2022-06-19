require('dotenv/config');
const pg = require('pg');
const path = require('path');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/feed', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
      with "liked_tags" AS (
        select distinct "pt"."tagId"
        from "postTags" as "pt"
        join "likes" as "l" using ("postId")
        where "l"."userId" = $1
      ), "recommendations" AS (
        select distinct "p"."postId",
                        "p"."imageUrl",
                        "p"."createdAt"
        from "posts" as "p"
        join "postTags" using ("postId")
        join "liked_tags" using ("tagId")
        )
        select "f"."postId",
               "f"."imageUrl",
               "f"."numberOfLikes"
          from (
              select "p"."postId",
                     "p"."imageUrl",
                     "p"."createdAt",
                     count("l".*) as "numberOfLikes"
                from "posts" as "p"
                left join "likes" as "l" on "p"."postId" = "l"."postId"
                where not exists (select 1 from "recommendations")
                group by "p"."postId"
                union
                select "r"."postId",
                       "r"."imageUrl",
                       "r"."createdAt",
                       count("l".*) as "numberOfLikes"
                  from "recommendations" as "r"
                  left join "likes" as "l" on "r"."postId" = "l"."postId"
                  group by "r"."postId",
                           "r"."imageUrl",
                           "r"."createdAt"
                ) as f
          order by "f"."createdAt" DESC;
        `;
  const params = [userId];
  return db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/posts/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  const sql = `
      select "u"."username",
             "postId",
             "imageUrl",
             "caption"
       from "posts"
       join "users" as "u" using ("userId")
       where "postId" = $1;
  `;
  const params = [postId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find post with ${postId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/createPost', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { caption, tags } = req.body;
  if (!caption) {
    throw new ClientError(400, 'caption is a required field');
  } else if (!tags) {
    throw new ClientError(400, 'tags is a required field');
  } else {
    const tagsArray = tags.split(',').map(tag => tag.toLowerCase());
    const newURL = `https://bubblesocialapp.s3.us-west-1.amazonaws.com/${req.file.key}`;
    const sql = `
     with "new_post" AS (
       insert into "posts" ("userId", "caption", "imageUrl")
       values($1, $2, $3)
       returning *
    ), "new_tags" AS (
      insert into "tags" ("label")
      select unnest($4::text[])
      on conflict ("label")
      do nothing
      returning "tagId"
    ), "postTagIds" AS (
      select "tagId"
      from (select unnest($4::text[]) as "label") as "labels"
      join "tags" using ("label")
      union
      select "tagId" from "new_tags"
    ),
    "new_postTags" AS (
    insert into "postTags" ("postId", "tagId")
      select "np"."postId",
              "pti"."tagId"
      from "new_post" as "np",
            "postTagIds" as "pti"
    ) select * from "new_post";
    `;
    const params = [userId, caption, newURL, tagsArray];
    return db.query(sql, params)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  }
}
);

app.get('/api/likes/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = Number(req.params.postId);
  if (!postId) {
    throw new ClientError(400, 'postid must be a positive integer');
  }
  const sql = `
        select exists(select 1
                      from "likes"
                      where "postId" = $1
                             AND
                             "userId" = $2);
  `;
  const params = [postId, userId];
  db.query(sql, params)
    .then(results => res.json(results.rows))
    .catch(err => next(err));
});

app.put('/api/likes', (req, res, next) => {
  const { userId } = req.user;
  const { postId } = req.body;
  if (!postId) {
    throw new ClientError(400, 'postId required');
  }
  const sql = `
          insert into "likes" ("userId", "postId")
          select $1,
                 $2
          where not exists (
            select 1
              from "likes"
              where "userId" = $1
                and "postId" = $2
          )
  `;
  const params = [userId, postId];
  db.query(sql, params)
    .then(results => res.json({ postId, userId: 1 }))
    .catch(err => next(err));
});

app.delete('/api/likes', (req, res, next) => {
  const { userId } = req.user;
  const { postId } = req.body;
  if (!postId) {
    throw new ClientError(400, 'postid required');
  }
  const sql = `
          delete from "likes"
          where "userId" = $1
                 AND
                "postId" = $2
          returning *;
  `;
  const params = [userId, postId];
  db.query(sql, params)
    .then(results => res.json(results.rows))
    .catch(err => next(err));
});

app.post('/api/comments', (req, res, next) => {
  const { userId } = req.user;
  const { postId, content } = req.body;
  if (!postId) {
    throw new ClientError(400, 'postId required');
  }
  const sql = `
          insert into "comments" ("userId", "postId", "content")
          values ($1, $2, $3)
          returning *
  `;
  const params = [userId, postId, content];
  db.query(sql, params)
    .then(results => res.json(results.rows))
    .catch(err => next(err));
});

app.get('/api/comments/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    throw new ClientError(400, 'postid must be a positive integer');
  }
  const sql = `
         select "c"."userId",
                "u"."username",
                "c"."postId",
                "c"."content",
                "c"."commentId"
          from "users" as "u"
          join "comments" as "c" using ("userId")
          where "c"."postId" = $1;
  `;
  const params = [postId];
  db.query(sql, params)
    .then(results => res.json(results.rows))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

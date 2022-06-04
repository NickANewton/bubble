require('dotenv/config');
const pg = require('pg');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');

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

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/feed', (req, res, next) => {
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
               "f"."imageUrl"
          from (
              select "p"."postId",
                     "p"."imageUrl",
                     "p"."createdAt"
                from "posts" as "p"
                where not exists (select 1 from "recommendations")
                union
                select "postId",
                       "imageUrl",
                       "createdAt"
                  from "recommendations"
                ) as f
          order by "f"."createdAt" DESC;
        `;

  return db.query(sql, [2])
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
  const { caption, tags } = req.body;
  if (!caption) {
    throw new ClientError(400, 'caption is a required field');
  } else if (!tags) {
    throw new ClientError(400, 'tags is a required field');
  } else {
    const tagsArray = tags.split(',').map(tag => tag.toLowerCase());
    const newURL = `/images/${req.file.filename}`;
    const sql = `
     with "new_post" AS (
       insert into "posts" ("userId", "caption", "imageUrl")
       values(1, $1, $2)
       returning *
    ), "new_tags" AS (
      insert into "tags" ("label")
      select unnest($3::text[])
      on conflict ("label")
      do nothing
      returning "tagId"
    ), "postTagIds" AS (
      select "tagId"
      from (select unnest($3::text[]) as "label") as "labels"
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
    const params = [caption, newURL, tagsArray];
    return db.query(sql, params)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  }
}
);

app.use(express.json());

app.post('/api/likes', (req, res, next) => {
  const { userId, postId } = req.body;
  if (!userId || !postId) {
    throw new ClientError(400, 'userid and postid required');
  }
  const sql = `
          insert into "likes" ("postId", "userId")
           select "p"."postId",
                  "u"."userId"
           from "posts" as "p",
                "users" as "u"
           where "u"."userId" = $1
                  AND
                  "p"."postId" = $2
           returning *
  `;
  const params = [userId, postId];
  db.query(sql, params)
    .then(results => res.json(results.rows))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

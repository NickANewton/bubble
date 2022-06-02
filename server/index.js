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

app.post('/api/createPost', uploadsMiddleware, (req, res, next) => {
  const { caption, tags } = req.body;
  if (!caption) {
    throw new ClientError(400, 'caption is a required field');
  } else if (!tags) {
    throw new ClientError(400, 'tags is a required field');
  } else {

    const newURL = `/images/${req.file.filename}`;
    const sql = `
      insert into "posts" ("userId", "caption", "imageUrl", "tags")
        select "userId", $1, $2, $3 from "users"
        returning *;
    `;
    const params = [caption, newURL, tags];
    return db.query(sql, params)
      .then(result => {
        const [post] = result.rows;
        res.json(post);
      })
      .catch(err => next(err));
  }
}
);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

insert into "users" ("username", "hashedPassword")
 values ('Gon', 'jiekaafsddjfkwelk'),
        ('Killua', ';laksjdf;lakjwoie'),
        ('Leorio', 'a;ksjdf;ajll;alks'),
        ('Kurapika', 'jfiw;oiwj;asdkj;f');

insert into "posts" ("userId", "imageUrl", "caption")
  values ('2', '/images/image-1653957949934.png',  'BBC is the best when it comes to soccer news, prove me wrong!'),
         ('2', '/images/image-1654036586244.jpeg', 'Warzone saved me during the pandemic, anyone else have a similar exerience?'),
         ('2', '/images/image-1654036710760.jpeg', 'In n Out has the best burger ever! End. Of. Story. Case closed.'),
         ('3', '/images/image-1654039483214.webp', 'What is your favorite place to enjoy nature?'),
         ('3', '/images/image-1654108307779.jpeg', 'This action in this anime is actually insane. 10/10 would recommend!'),
         ('3', '/images/image-1654108361874.webp', 'Steins Gate is definitely the best time travel anime out there!'),
         ('4', '/images/image-1654108361874.webp', 'I use reuters as my internation news source. Where do you get yours?'),
         ('4', '/images/image-1654108361874.webp', 'Coronavirus is still out there, be safe everyone! Where a mask!'),
         ('4', '/images/image-1654108361874.webp', 'Enjoying the beach! Who likes to surf?'),
         ('4', '/images/image-1654108361874.webp', 'Healthy choices = happy life');

insert into "likes" ("postId", "userId")
  values (2, 1),
         (4, 1),
         (7, 1);

insert into "tags" ("label")
  values ('animals'),
         ('apparel'),
         ('art'),
         ('automotive'),
         ('entertainment'),
         ('food'),
         ('health'),
         ('lifestyle'),
         ('music'),
         ('nature'),
         ('news'),
         ('sports');

insert into "postTags" ("postId", "tagId")
values (1, 11),
       (1, 12),
       (2, 5),
       (3, 6),
       (4, 10),
       (4, 8),
       (5, 5),
       (6, 5),
       (7, 11),
       (8, 7),
       (8, 8),
       (9, 10),
       (9, 8),
       (10, 6),
       (10, 7),
       (10, 8);

--  postId w/ associated tags
        -- 1 '{"news","sports"}',
        -- 2 '{"entertainment"}',
        -- 3 '{"food"}',
        -- 4 '{"nature","lifestyle"}',
        -- 5 '{"entertainment"}',
        -- 6 '{"entertainment"}',
        -- 7 '{"news"}',
        -- 8 '{"health","lifestyle"}',
        -- 9 '{"nature","lifestyle"}',
        -- 10 '{"food","health","lifestyle"}'

-- tagId
        --  1  ('animals'),
        --  2  ('apparel'),
        --  3  ('art'),
        --  4  ('automotive'),
        --  5  ('entertainment'),
        --  6  ('food'),
        --  7  ('health'),
        --  8  ('lifestyle'),
        --  9  ('music'),
        --  10 ('nature'),
        --  11 ('news'),
        --  12 ('sports');

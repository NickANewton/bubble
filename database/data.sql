insert into "users" ("username", "hashedPassword")
 values ('Gon', 'jiekaafsddjfkwelk'),
        ('Killua', ';laksjdf;lakjwoie'),
        ('Leorio', 'a;ksjdf;ajll;alks'),
        ('Kurapika', 'jfiw;oiwj;asdkj;f'),
        ('L', ';ksjdf;ajll;alks'),
        ('R', 'a;ksjdf;ajll;alk'),
        ('J', 'a;ksjdf;jll;alks'),
        ('K', 'a;ksjdf;ajll;alks'),
        ('P', 'a;sjdf;ajll;alks'),
        ('O', 'a;ksjd;ajll;alks'),
        ('Z', 'ajdf;ajll;alks'),
        ('T', 'a;ksjdf;ajll;ks');


insert into "posts" ("userId", "imageUrl", "caption")
  values ('2', '/images/image-1653957949934.png',  'BBC is the best when it comes to soccer news, prove me wrong!'),
         ('2', '/images/image-1654036586244.jpeg', 'Warzone saved me during the pandemic, anyone else have a similar exerience?'),
         ('2', '/images/image-1654036710760.jpeg', 'In n Out has the best burger ever! End. Of. Story. Case closed.'),
         ('3', '/images/image-1654039483214.webp', 'What is your favorite place to enjoy nature?'),
         ('3', '/images/image-1654282428275.jpeg', 'This action in this anime is actually insane. 10/10 would recommend!'),
         ('3', '/images/image-1654282391733.jpg', 'Steins Gate is definitely the best time travel anime out there!'),
         ('4', '/images/image-1654282226325.png',  'I use reuters as my internation news source. Where do you get yours?'),
         ('4', '/images/image-1654282133733.webp', 'Coronavirus is still out there, be safe everyone! Wear a mask!'),
         ('4', '/images/image-1654282191251.jpeg', 'Enjoying the beach! Who likes to surf?'),
         ('4', '/images/image-1654108361874.webp', 'Healthy choices = happy life');

insert into "likes" ("postId", "userId")
  values (4, 1),
         (4, 2),
         (4, 3),
         (4, 4),
         (4, 5),
         (4, 6),
         (4, 7),
         (4, 8),
         (7, 1),
         (7, 2),
         (7, 3),
         (7, 4),
         (7, 5),
         (7, 6),
         (7, 7),
         (7, 8),
         (7, 9),
         (7, 10),
         (7, 11),
         (7, 12);


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

insert into "comments" ("userId", "postId", "content")
values (1, 4, 'I would like to go on a hike soon!'),
       (2, 4, 'Nature is incredible!'),
       (3, 4, 'I like a good hike, but take me to the beach!'),
       (4, 9, 'I tried, but its super hard!'),
       (1, 9, 'Im a beach bum too!'),
       (2, 9, 'Where can I learn to surf?'),
       (3, 9, 'Nice moves!')

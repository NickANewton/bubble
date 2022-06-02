insert into "users" ("username", "hashedPassword")
 values ('iceMan', 'jiekaafsddjfkweiojoasd');

insert into "users" ("username", "hashedPassword")
  values ('Mikey', ';laksjdf;lakjwoie');

insert into "posts" ("userId", "imageUrl", "tags", "caption")
  values ('2', '/images/image-1653957949934.png', '{"BBC","Sport News"}', 'BBC Sport'),
         ('2', '/images/image-1654036586244.jpeg', '{"Warzone","Gaming","COD"}', 'This game is fun!'),
         ('2', '/images/image-1654036710760.jpeg', '{"innout","food","yum"}', 'In n Out is the best burger!'),
         ('2', '/images/image-1654039483214.webp', '{"Outdoor","hiking","nature"}', 'This hike was beautiful!'),
         ('2', '/images/image-1654108307779.jpeg', '{"anime","jujutsu kaisen","Action"}', 'his is an awesome anime!'),
         ('2', '/images/image-1654108361874.webp', '{"food","Yum","healthy"}','This is some good looking food!');

insert into "likes" ("postId", "userId")
  select "postId", 1 from "posts"
  where "tags" = '{"innout", "food", "yum"}';

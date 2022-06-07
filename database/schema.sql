set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"postId" serial NOT NULL,
	"userId" int NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	"location" TEXT,
	"caption" TEXT NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"postId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"commentId" serial NOT NULL,
	"userId" int NOT NULL,
	"postId" int NOT NULL,
	"content" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "commentLikes" (
	"commentId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "followers" (
	"followerId" int NOT NULL,
	"followedId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "merges" (
	"postId" int NOT NULL,
	"userId" int NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "postTags" (
	"postId" int NOT NULL,
	"tagId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tags" (
	"tagId" serial NOT NULL,
	"label" TEXT NOT NULL UNIQUE,
	CONSTRAINT "tags_pk" PRIMARY KEY ("tagId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "commentLikes" ADD CONSTRAINT "commentLikes_fk0" FOREIGN KEY ("commentId") REFERENCES "comments"("commentId");
ALTER TABLE "commentLikes" ADD CONSTRAINT "commentLikes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followerId") REFERENCES "users"("userId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("followedId") REFERENCES "users"("userId");

ALTER TABLE "merges" ADD CONSTRAINT "merges_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "merges" ADD CONSTRAINT "merges_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "postTags" ADD CONSTRAINT "postTags_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "postTags" ADD CONSTRAINT "postTags_fk1" FOREIGN KEY ("tagId") REFERENCES "tags"("tagId");

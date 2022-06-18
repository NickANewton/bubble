# Bubble

A full-stack web application for social media users lookiing for quality content.

## Why Bubble?

Bubble was my first full-stack project. It came from an idea to push social media in a positive direction
focusing on user engagement with quality content rather than quantity. I wanted
to create a compelling UI and put a circular twist on apps like twitter and facebook. Expand your
social bubble, with Bubble!

A link to the live app:

https://bubble-social-app.herokuapp.com/#sign-up


## Technologies Used
- React
- Postgresql
- Express
- argon2
- JWT
- multer
- JavaScript
- CSS
- HTML


## Finished Features

- User can view their feed
- User can create a post
- User can view their post in their feed
- User can like a post
- User can comment on a post
- User can view comments
- User can sign-up
- User can sign-in

## Gifs
![alt text](server/public/images/bubbleFeed.gif "Feed and Posts")


## Stretch Features to Implement
- User can view profile
- User can sign-out
- User can see comment count
- User can see like count
- User can add profile picture
- User can edit thier post
- User can delete their post

## Getting Started
- Copy the .env.example file by using the command: cp .env.example .env
- install all dependencies using the command: npm i
- set up a database using Postgresql
- 3rd party account set-up:
  - Create a Heroku account
  - Set up an AWS account
  - Create an IAM user for S3
  - Create an S3 bucket for your uploads
    - Add your AWS_S3_BUCKET name to your .env
  - set your environment variables on Heroku
    - DATABASE_URL
    - AWS_S3_BUCKET

    !!WARNING DO NOT add these to your .env file!!
    - AWS_S3_BUCKET
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - TOKEN_SECRET (use a dummy token in .env for now)

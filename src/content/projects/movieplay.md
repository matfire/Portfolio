---
title: MoviePlay
githubUrl: https://github.com/matfire/movieplay
summary: Create and share the favourite viewing order of your movies
image: ./images/movieplay_img.webp
date: 2023-05-24
epitech: false
stack:
- typescript
- react
---

This project was created as a submission to the [Appwrite](https://appwrite.io) and [Hashnode](https://hashnode.com) hackaton

## The Idea

The goal of this project was to build a movie playlist creator (I'll probably revisit this project later on, but for now this is here for history purposes) so that you could share the "correct" order to watch movies (like the Star Wars Machete order).

## The implementation

The application was built using just React, React-Router and Appwrite, with some styling using [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/).

### Appwrite

I used Appwrite to handle all the authentication and database querying. Since they also allow running cloud functions, I decided to use one to count playlist views; I had to do a bit of hack for this, since Appwrite does not support table read triggers for cloud functions (the router navigation triggers the function that increments the counter by 1)
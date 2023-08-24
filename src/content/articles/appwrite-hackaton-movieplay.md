---
title: "Appwrite Hackaton: MoviePlay"
publishDate: 2023-06-10
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/tV80374iytg/upload/0ba31d6430f0e72ac3416e8afee0cb3b.jpeg
tags: 
- reactjs
- typescript
- tailwind-css
- appwrite

---

Well, I recently quit my job so I got free time and this hackathon between [Hashnode](https://hashnode.com) and [Appwrite](https://appwrite.io) is announced. This is clearly a sign. So I decided to build [MoviePlay](https://appwrite.io). Before we get into the trials and tribulations of this project, let's get all the technical stuff out of the way.

## The Idea

Have you ever had a debate with someone as to what is the correct order to watch Star Wars? There's the chronological order, the release order, the machete order

![enough already](https://media.giphy.com/media/SRka2MLKzpzE6K24al/giphy.gif)

## Team

* Me
    

## Tech Stack

* ReactJS & Typescript (ViteJS)
    
* TailwindCSS & DaisyUI
    
* [Appwrite Cloud](https://cloud.appwrite.io)
    
    * Database
        
    * Account
        
    * Functions
        
        * NodeJS
            
* Vercel
    
* [The-Movie-Wrapper](https://www.npmjs.com/package/@matfire/the_movie_wrapper) (I made this one, but still...)
    

## Look at the code

You can see the code [here](https://github.com/matfire/movieplay) and see it live [here](https://movieplay.nirah.tech)

## Demo

https://www.youtube.com/watch?v=8GJyqRNkZrA 

## On the using of Appwrite

I had already used a self-hosted version of Appwrite and have been tinkering with the closed cloud beta for a bit, so I was already familiar with the tool and will not really talk about onboarding.

### Database

I was a bit disappointed relationships (as of 06/04/2023) are not yet supported on Cloud, so you still need to do all the foreign key constraints by hand, which makes fetching client-side a bit of a hassle.

### Account

I really like how accounts are handled, especially oauth2 stuff; the fact that you can connect multiple providers for the same account seamlessly is pretty cool

### Functions

I needed to use functions to store the number of views a playlist could get. I would have loved a trigger on **database read operations**, but I can see it would probably be too much performance overhead; the way I solved this is when navigating to a page, the page loader function triggers the function to increment the views number.
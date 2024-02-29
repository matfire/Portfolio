---
title: "How  filesystem-based routers work: building one for express"
cover_image: "https://cdn.blog.matteogassend.com/file-router-cover.webp"
publishDate: 2023-10-22
tags:
- javascript
- node
---

Have you ever wondered how Next, Sveltekit, Nuxt (even Expo now) do their routing? What's the magic that makes it so when you create a file called `+page.svelte` in a directory called `routes`, just for it to magically works? Well, wonder no more! I'll show you how to build your own file-based router for [express](https://expressjs.com/) in Javascript, though the concepts we'll see are usable in other frameworks and other languages. This article will focus on parsing files, ignoring folders (because that is a whole of grenades I'm not yet ready to step - and write - on). Let's get to it!

![GIF by MIRAMAX](https://media0.giphy.com/media/W5WwFpEtd5Tvq/giphy.gif?cid=bcfb6944t52lnri18evg0ro1r8f5vl3fjaxm54dhbeqpceom&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## How file routing works

First, let's start by saying what file-based routing is and how it works.
Usually, a function will loop through the `routes` folder (ever noticed how you always have a single place where you place your `pages`? this avoid crawling the whole project directory every time your app starts), getting all the files matching a certain pattern (for svelte, that will be `+page.svelte`) and, based on their location in the folder, determines what requests should be sent to it. The first part of this series, as specified above, will not be handling folders; instead, we will just do a basic file router; here's how it'll work:
![file based structure explainer](https://cdn.blog.matteogassend.com/file-based-router-structure.png)

This means that when we'll call our function, it will step through our route directory and generate a separate route for each filename: `user.js` will create `/user` for example.

## Building a file-based router

### Initial Setup

First of all, we should setup our base structure. For this example, I'll have an `index.js` file at the root of my project that will instanciate the express application and call the function to generate the routing. Then I'll have a `routes` folder that will contain - you guessed it - our routing files. The only dependency you should need is the `express` package; if you haven't already done so, you should install it in a new project using:
```sh
npm install --save express
```
and let's initialize the express application in `index.js`

```js
const express = require("express");

const app = express();

app.listen(4000, () => {
    console.log("listening");
});
```
This should be enough to have a basic http server listening on port 4000 (btw, you should probably use an environment variable here instead of hardcoding it like this). Next, let's see how we should define our route file; inside our `routes` folder, let's create a `user.route.js` file; this suffix (.route) allows us to filter only the files we are sure belong to our application thanks to the power of regex (oh yes, we'll be writing a regex - just one, I promise)!

![Hacker Deal With It GIF by Sleeping Giant Media](https://media1.giphy.com/media/mYhd1NHQkHmZLiqN7M/giphy.gif?cid=bcfb6944cxheq2gck8p5iorudqqvis1ad0z2o4aathprma1b&ep=v1_gifs_search&rid=giphy.gif&ct=g)

### Making a route

Let's start by defining a simple rule: **every route file should have a Router instance as its main export**. This will allow us to do simple programmatic requires to load our route files (we'll look at how to do more specific filtering and imports in a following article, don't worry).

So, let's say we have a `user.route.js` file containing the following:
```js
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("test");
});

router.get("/:id", (req, res) => {
  res.send(`test ${req.params.id}`);
});

module.exports = router;
```
When our loader will be finished, this should generate two routes:
- /user
- /user/:id (this one will match /user/1, /user/2 etc)

### Making the loader

Now it's time to make the actual loader:

![Its Time Vegas GIF by BPONGofficial](https://media2.giphy.com/media/SKcxqI1GiASU783uT2/giphy.gif?cid=bcfb69440p5hlnpm71c54qwekk0jbebhx4qwp6q7v02oa60c&ep=v1_gifs_search&rid=giphy.gif&ct=g)

Let's recap what our loader needs to do:
- walk the `routes` folder
- for each file matching the pattern (routeName).route.js, add a route to  our express app that looks like `/routeName`

So, i'll make a new file called `router.js` which exports an asynchronous function. This function will take as an argument the express application and define a regex we will use to match our route name and save it as a group.

```js
module.exports = async (app) => {
  const fileNameRegex = /(.*).routes.js$/;
};
```
And in this function we'll begin by walking the whole `routes` folder
```js
/* add this at the top of the file */ const fs = require("node:fs/promises");

  const folders = await fs.readdir("./routes");
```
And then check each file to see if it matches the regex we defined earlier:
```js
  folders.forEach((file) => {
    const regexName = fileNameRegex.exec(file);
    if (!regexName) return;
  });
```
And finally, we add the route to our application with a little log line:

```js
    console.log(`[+] Router file ${file} loaded under /${regexName[1]}`);
    app.use(`/${regexName[1]}`, require(`./routes/${file}`));
```

The last step is to use our loader function: your index.js should look something like this:
```js
const express = require("express");
const loadRoutes = require("./router");
const app = express();
loadRoutes(app).then(() => {
  app.listen(4000, () => {
    console.log("listening");
  });
});
```
![](https://media1.giphy.com/media/vN3fMMSAmVwoo/giphy.gif?cid=bcfb694476ov89l4f91ymnaon8r1wwg13pgrqobo6ijfnke7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

This is the simplest way to make a file-based router in express js. This logic can obviously be translated to be used in other framework, like [this plugin](https://github.com/GiovanniCardamone/fastify-autoroutes) for [fastify](https://fastify.dev/)

You can see a working example below:

https://stackblitz.com/edit/fbr-express-umc23i?embed=1&file=index.js
---
title: "test everywhere with dagger.io"
cover_image: "https://cdn.blog.matteogassend.com/dagger-test-cover.webp"
publishDate: 2023-10-15
summary: "How to use Dagger to create CI/CD pipelines that run everywhere"
tags:
- docker
- devops
- dagger.io
- javascript
---

Have you ever had to implement a CI/CD pipeline and then proceed to push to a repository 10/20 times just to see if the pipeline works correctly? Well, this ends today!

## Dagger (not the stabby kind)

Dagger's tagline is
> CI/CD as Code that Runs Anywhere

It is a way for developers to create pipelines that run everywhere, be it locally, as Github Actions or anywhere where you can spawn containers; it is what I use to do a test build on [magiedit](https://magiedit.magitools.app) and what I'll use when I eventually write unit tests (it'll come one day, I promise.)

### How do you use it?

Dagger provides different sdks (for Javascript, Python, Go etc) and they also have an HTTP and GraphQL api, so you can use with whatever coding language you prefer. Then you just run it wherever your pipelines run.

## Creating a Pipeline

In this article I'll be using the Javascript sdk, because that is the one I know better (and because it is my article, after all). We'll be looking at how to create a simple pipeline script with some extra configuration like setting some env variables.

### Prerequisites

#### Container engine

Dagger requires a container engine for it run wherever it needs to run (at this stage, at least, locally); the recommended one is Docker (I have an article on the basics of Docker [here](https://matteogassend.com/blog/taming-the-whale)), but other runtimes are compatible (podman, containerd etc): here's [an article](https://docs.dagger.io/541047/alternative-runtimes) detailing how to use them, though I would still recommend Docker.

#### Install Dagger CLI

You can find the installation instructions [here](https://docs.dagger.io/quickstart/729236/cli), but the gist is (for Linux / WSL) to execute this line:
```sh
cd /usr/local
curl -L https://dl.dagger.io/dagger/install.sh | sh
```

#### Install Dagger SDK

For this example I'll be using the NodeJS sdk which you can install like this:
```sh
npm install @dagger.io/dagger --save-dev
```

### Writing the actual pipeline

The main thing to do is import the `connect` function from the Dagger sdk, because everything will happen in there:

```javascript
import { connect } from '@dagger.io/dagger';
```

Once we call this function, we can pass it a callback that gets as its argument the client instance; this is what we will use to define our pipeline:

```javascript
connect(
	async (client) => {
	},
	{ LogOutput: process.stdout }
);
```
As you can see from the snippet above, you can also specify where the output logs will be sent; in this case, the standard output is good enough, but you could also sent them to a file that could, for example, be uploaded as an artifact for the pipeline run.

Then you can declare a runner with a base image and run all the commands you need with it;

```javascript
		const node = await client
			.container()
			.from('node:18')
			.withDirectory('/app', client.host().directory('.'), {
				exclude: ['node_modules', 'ci']
			})
		const runner = node.withWorkdir('/app').withExec(['npm', 'install']);
```
In the above snippet, we declare a container based on node 18 and we copy the contents of the current directory (excluding the folders called node_modules and ci), then set the working directory to /app (the directory we copied our project to) and execute npm install inside it.

![The Walking Dead Easy Peasy GIF](https://media0.giphy.com/media/NaboQwhxK3gMU/giphy.gif?cid=bcfb6944db5rkmw2adjnr7wtx95a7veo71t5t5zl7aj2gs9h&ep=v1_gifs_search&rid=giphy.gif&ct=g)

Now, how about running a build script and getting the error output (if any)? Simple, we just continue adding calls to our connect callback:
```javascript
await runner
	.withExec(['npm', 'run', 'build'])
	.stderr();
```

### Running the pipeline

To run pipeline, you simply execute it like any other NodeJS script; assuming you have saved your script as `build.mjs` in a `ci` folder, you can just run:
```sh
node ci/build.mjs
```

![Weird Al GIF by The Roku Channel](https://media1.giphy.com/media/iFCmbYrTnj96luPXhE/giphy.gif?cid=bcfb69441tcje7xshjfsao2o95j0e18ft09mbqt9mfjs0g6f&ep=v1_gifs_search&rid=giphy.gif&ct=g)

And that's how you can create and run a basic pipeline; note that you can create multi-stage builds, publish images, using existing Dockerfiles and much more!

### Bonus Round: Github Actions

Running a Dagger pipeline in Github Actions is pretty straightforward; you need to setup your environment to be able to run Dagger, which means basically installing nodejs js and installing dependencies:
```yaml
name: build
on:
  push:
    branches:
      - master
      - feature/*

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: node ci/build.mjs
```
In this example, I'm using pnpm to install my dependencies, and then simply execute the pipeline.

If you want to learn more about Dagger, check out [their website](https://dagger.io/); they have some very nice real case articles on how to use Dagger to build more complex pipelines.

---
title: "Taming the whale: introduction to Docker"
publishDate: 2023-03-09
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/GjKPTkhni6Y/upload/9bd7a815beddfee597bf0631b4c697c2.jpeg
tags: 
- docker
- programming
- devops
- beginners
- introduction
---

Have you ever had to work on a project that requires lots of parts that need to be installed separately? And one of those parts refuses to work because maybe the other developer worked on Windows and you are on Linux? Well, what I told you that those problems can be (relatively) easily solved? Let's take a look at what Docker is and how we can use it.

## What is Docker?

Docker is a suite of tools allowing you to run containers on your system.

### But what is a container?

according to [docker.com](https://docker.com), a container is *a sandboxed process on your machine that is isolated from all other processes on the host machine*; this feature has been available on Linux for some time, but Docker managed to standardize and make it available on other operating systems.

## Why would you use a container?

One of the reasons Docker is so popular is that it allows people to get started and run projects without necessarily needing to install a whole environment. This usually allows for faster onboarding and testing while also simplifying the deployment of services; by using a container you needn't worry about the exact system-specific settings you might need to handle for (most) of the production applications (a single container can be run on (basically) any operating system).

## Images? Containers?

I have mentioned both containers and images so far, but what's the difference?

* An image is the piece of software that contains all the instructions to run your program; the installed programs, the start command etc...
    
* A container is what runs an Image; it also handles transmitting environment variables, port forwarding with the host, volumes etc... (more details on those later)
    

## Docker Cheatsheet

Now that we know (kind of) how Docker works, let's create our first image.

### Installing Docker

on most systems, you can install [Docker Desktop](https://docker.com) to have a nice GUI to help you. If you can't or don't want to use that, you can also only install the command line tool by running

```bash
curl https://get.docker.com | bash -E
```

this should download and install docker on your machine (if this does not work, head on over to the [documentation](https://docs.docker.com/get-started/) for system-specific information).

### Creating an Image

For the sake of an example, we will be using this example

https://codesandbox.io/p/sandbox/trusting-knuth-cd1up7?selection=%5B%7B%22endColumn%22%3A29%2C%22endLineNumber%22%3A5%2C%22startColumn%22%3A29%2C%22startLineNumber%22%3A5%7D%5D

It's a simple application running an HTTP server. **Let's dockerize it!**

To do so, we need to first create a Dockefile; this is a specific file format that enables us to describe how an Image should be created.  
The simplest Dockerfile for this example project would be:

```bash
FROM node:lts
COPY package.json .
COPY index.js .
RUN npm install
CMD ["node", "index.js"]
```

let's look a bit more into this file:

* FROM: this line describes the base of our image. We need to tell Docker what to base our image on. To do so, you can specify the image **name** and a **tag** separated by **:**
    
* COPY: copies a file or folder from our computer's filesystem to the image's.
    
* RUN: executes a command when building the image
    
* CMD: this is the command that gets executed when the image runs.
    

to build this image we can run:

```bash
docker build -t learn-docker .
```

the -t option allows us to specify a tag for the image to find it more easily.

### Running an Image

Once we have an image tagged, we can run it by saying:

```bash
docker run learn-docker
```

### Detached Mode

You'll notice that our terminal window is stuck on the output from our terminal; that's all well and good, but it'd be nice if we wouldn't have to open a new terminal for each container we want to run: enter **detached mode**.

```bash
docker run -d learn-docker
```

Running a container in detached mode means putting the process in the background which in turn means we get our terminal back.

### Stopping a container

To stop a container, we first need to know its id. To get a list of all your running containers, you can run the command:

```bash
docker ps
```

The first element of each line is the container id. Then you can just run:

```bash
docker stop <the_id_of_the_container>
```

and it will stop your container.

### Ports

you may have noticed that, at least for now, we are unable to access our api. This is because, to put it simply, Docker is sandboxed in its own network, so we need to explicitly map the container's ports to those of our system's. Let's take the command we had before and add a little option

```bash
docker run -p 8000:4000 learn-docker
```

this should expose port 3000 of our container on port 8000 of our system. If you visit [localhost:8000](http://127.0.0.1:8000), you should see our hello world message.

### Volumes

now that we have a basic application running, let's see if we can get a bit more out of it. If you take a look at the code, you'll notice that I'm writing my logs into a file inside a **logs** folder; wouldn't it be neat if we could read that data? This is where volumes come in.

But before we get started, let's make our life a bit simpler; in our Dockerfile, let's specify the **working directory.** This means that when Docker executes the instruction `COPY index.js .`, **.** will be replaced by the working directory we specified earlier. Our new Dockerfile should look something like this:

```bash
FROM node:lts
WORKDIR /app
COPY package.json .
COPY index.js .
RUN npm install
CMD ["node", "index.js"]
```

Our logs should be stored in `/app/logs`, right? If so, we could define that folder as a **volume**; a volume is a path that is designated as **persistent**, meaning if the container stops the data inside the volume will not be lost. As an additional bonus, a volume can also mirror files and folders in the container to the host's disk. You could, let's say setup a development environment with hot reloading with Dockefiles and maybe a Docker-Compose (maybe a topic for another article).  
let's revise our execution line a bit:

```bash
docker run -p 8000:4000 -v ./logs:/app/logs learn-docker
```

this new addition will tell Docker to use (or create) the folder logs in our terminal's current directory as the volume for the path **/app/logs** of our container. This means that if we look inside our logs folder, we should see a file called **log.txt.** If now we send a request to [http://localhost:8000](http://127.0.0.1:8000), we should a new line get appended to that file.

This is especially useful for databases because you most likely do not want to lose all your customer's data every time you update/stop/restart a container.

## This is the end...

This has hopefully been a useful introduction to Docker. If you want to learn more about this technology, the first step would be to visit [the official documentation](https://docs.docker.com); it is pretty well written.  
Other useful resources may be:

* Learn Docker in 7 Easy Steps - Full Beginner's Tutorial - Fireship
    

https://www.youtube.com/watch?v=gAkwW2tuIqE

* Docker Tutorial for Beginners - Programming with Mosh
    

https://www.youtube.com/watch?v=pTFZFxd4hOI
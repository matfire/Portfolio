---
title: Dashview
summary: Service visualizer
githubUrl: https://github.com/matfire/Dashview
image: ./images/dashview_img.webp
date: 2023-04-16
stack:
- remix
- html
- css
- javascript

---

## The Idea

I wanted to have a service dashboard that I could configure using a json file (I really don't like yaml) and that could reload the config file without needing to be restarted (the application or the container).

## The implementation

For this application, I wanted to try out [Remix](https://remix.run/), a React framework. It called to me because of its server side login integration (I didn't want to make a separate api to just read from the file system)
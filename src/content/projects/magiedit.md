---
title: Magiedit
githubUrl: https://github.com/magitools/magiedit
productionUrl: https://magiedit.magitools.app
summary: write and publish to multiple platforms at once
image: ./images/magiform_img.webp
date: 2023-09-19
epitech: false
stack:
- typescript
- svelte
---

# Ever wanted to write and publish technical articles from the same spot?

## The Idea

I sometime like to publish technical articles ([blog](/blog) is here) and I usually post them to [dev.to](https://dev.to) and to [hashnode](https://hashnode.com); those platforms have their own editors, but it gets a bit tyring to copy paste each article to each platform and modify each field so that it satistifies each platform's syntax.

This is where [MagiEdit](https://magiedit.magitools.app) comes from: a place to write a simple markdown article, and let the platform handle the rest.

## The implementation

I decided to build this application in my preferred framework of the moment, [sveltekit](https://kit.svelte.dev/), using the [skeleton ui package](https://www.skeleton.dev) and [turso](https://turso.tech) as the database.

All articles are encrypted using a user-defined key; when the users wants to edit an article, they enter their key and the article gets decrypted directly on the user's machine; same goes for encryptions. The article is then converted to a base64 string (to save a bit of space, hopefully) and only then sent to the server. The user key is also hashed and stored on the server.
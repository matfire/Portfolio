---
title: "end-to-end encryption with sveltekit"
series: "magiedit"
cover_image: "https://cdn.blog.matteogassend.com/end-to-end-encryption-cover.webp"
publishDate: 2023-09-25
summary: "what is end-to-end encryption and how to implement it with sveltekit"
tags:
- sveltekit
- typescript
- cryptography
---

## Introduction

Now that Magiedit is kind of done (except for user experience, I guess), I figured I had to tackle the security / sync of notes; at the beginning of this project, I thought I could store everything locally (first versions did not even have authentication), and later on implement a solution to sync back and forth with a remote server using something like couchdb and pouchdb. When I tried implementing things like those, however, I ran into all kinds of problems, namely making it play nice with sveltekit (and vite) and syncing different models (articles and settings for each user). And so I decided, at least for now, to ditch storing articles locally, and simply store them on a remote db (right now [turso](turso.tech), btw). The thing is, I didn't want to store raw article data for reasons like data privacy and privacy in general (I don't want to know what you write using Magiedit). To solve this problem, I started looking into cryptography, specifically the web-cryptography api.

## How this all works

### Genering a master password

When a user creates an account, it is now required to create a master password; this will then be stored (hashed, obviously) on the server and at each new session they will need to enter it again. This master password is the origin for every cryptographic key used to encrypt and decrypt the articles.

**NB: except for the master password creation and unlocking, the clear password is never sent to the server and is instead stored in the browser's session storage**

### How and where things happen

#### How it works (algorithms and stuff)

**DISCLAIMER: I'm not an expert in cryptography, so take everything I say with a grain of salt**

- The key is based on a hash of the master password using SHA-256
- The algorithm used for encryption is AES-CBC, since it is symmetric and does not make me manage private and public keys (they would work better, but let's be honest; they are just articles, after all)

#### Where it works 

Let's first take a look at this schema:
![magiedit's data flow diagram](https://cdn.blog.matteogassend.com/magiedit-encryption-flow.png)

When a user creates, loads (from a file) or saves an article, the same steps happen:

- A cryptographic key is generated using the master password hashed using SHA-256
```js
const keyBytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(keyData));
const key = await crypto.subtle.importKey('raw', keyBytes, 'AES-CBC', false, ['encrypt']);
```
- We generate an iv (initialization vector, kind of like a seed)
```js
function generateIv() {
	const data = new Uint8Array(16);
	crypto.getRandomValues(data);
	return data;
}
```
- The text is then encrypted using the key and the iv
```js
const encodedContent = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, new TextEncoder().encode('write here'));
```
- It is then converted to base64
```js
const base64 = btoa(String.fromCharCode(...new Uint8Array(encodedContent)));
```
- and finally sent to the server (along with its iv) to get it stored securely

As for decrypting, it is the same process, but in reverse:
- get the article from the db
- convert the base64 string to a buffer
- generate a key from the master password
- decrypt the buffer
- convert the buffer back to a string

![Art Drawing GIF by GEICO](https://media4.giphy.com/media/MXM5QQ3jY7WmcmPwTI/giphy.gif?cid=bcfb6944sukc5vegbsl0xkey1dmb6kxar5fen0smog3hhr32&ep=v1_gifs_search&rid=giphy.gif&ct=g)
I really like this gif, you know?

## Why end to end encryption ?

Because I wanted users to know that even if I wanted to (and I don't) read what they wrote before publishing, I couldn't, because I wanted to be in line with current regulations about data privacy and, most of all, because it looked like it could be fun!

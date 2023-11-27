---
title: Sirius
githubUrl: https://github.com/MGTek5/Sirius
summary: your eye in the sky
epitech: true
personal: true
image: ./images/sirius_img.webp
date: 2021-10-14
stack:
- typescript
- react
---

## The Idea

During a school project to learn about PWA (progressive web apps), we decided to build an application that would allow us to track the ISS in real time and receive notification when it came near user-defined points.

## The implementation

The frontend of this application was build using React while the backend was powered by [Appwrite](https://appwrite.io/). A scheduled cloud function would pull the latest position every 5 seconds and insert it into a db table. Every time a new record was inserted in that table, another cloud function would retrieve all the user-defined positions and compute the distance between them and the ISS. If the ISS happened to be in a predefined radius (around 30 km), then it would send out a web push notification to the interested user.

### PWA

We implemented the following PWA patterns:

- installable application
- update notifications
- web push notifications
- background sync (for saved positions)

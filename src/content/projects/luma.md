---
title: Luma
summary: All in One CMS
image: ./images/luma_img.webp
date: 2017-08-01
stack:
- python
- html
- css
- javascript
- postgresql

---

## The Idea

The client needed an enterprise CMS that would handle anything from employee schedules to inventory and sales / receipts. It needed to be modular (i.e. it should be simple to toggle each module on and off) and have very granular RBAC.

## The implementation

This application was developed using the [Django](https://www.djangoproject.com/) framework and initially a MySQL database (later on migrated to PostgreSQL). It's user interface was designed using the [Metronic UI kit](https://keenthemes.com/metronic).
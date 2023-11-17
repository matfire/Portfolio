---
title: Magiconvert
summary: Image converter and resizer
githubUrl: https://github.com/magitools/magiconvert
productionUrl: https://magiconvert.com
image: ./images/magiconvert_img.webp
date: 2023-04-17
stack:
- svelte
- css
- typescript

---

## The Idea

I needed a way to easily convert and resize images to different formats without having a daily limit.

## The implementation

This application was built using (sveltekit)[https://kit.svelte.com] and (skeleton ui)[https://skeleton.dev]. The image processing is being done on [vercel](https://vercel.com)'s serverless infrastructure using (sharp)[https://sharp.pixelplumbing.com/]. Each user gets 50 free image conversions and can then purchase additional credits using [stripe](https://stripe.com).

(MagiConvert)[https://magiconvert.com] also allows users to calculate the (blurhash)[https://blurha.sh/] string from an image.
---
title: "building a basic markdown editor: unified, trees and data"
series: "magiedit"
cover_image: "https://cdn.blog.matteogassend.com/markdown-editor-cover.webp"
publishDate: 2023-10-02
summary: "how to build a simple yet extensible markdown editor"
tags:
- svelte
- sveltekit
- markdown
- unified
---

As you have probably guessed from the previous articles in this series (go read them if you haven't, btw), the main thing when building a markdown publishing webapp, is the markdown editor itself.

![Season 3 Walk GIF by The Simpsons](https://media1.giphy.com/media/3orif1pbMEL5VJnmwM/giphy.gif?cid=bcfb6944ona09wkpkujnf1j7yvcqraf3kve1b8t4wnih6ick&ep=v1_gifs_search&rid=giphy.gif&ct=g)

But not all editors are born equal; there are many ways of building one, with benefits and tradeoffs. In this article I'll try to explain what led me to my current solution (not yet completed, but still I'd say it's about 80% done).

## Markdown

if you don't know what markdown is, think of it as kind of like html; it is a type of text with special characters or combination of characters that get interpreted and displayed according to a determined specification; for instance, an html `<h2>` tag would be translated in markdown with `##` and vice versa. It is especially useful if you want to quickly write a README, some documentation or, turns out, articles for certain platforms. You can find a more complete introduction that I can provide [here](https://www.markdownguide.org/)

## What I needed to build

I needed to build a markdown editor with a live preview. The first part is not that difficult; put down a textarea on a page and you have your editor! The problem was with the live preview; turns out Markdown is not natively supported by browsers...

![Excuse Me Wow GIF by Mashable](https://media0.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif?cid=bcfb6944zbg8lkbkejj0satp1tv1mrykzw8vogwf2sjr4vz7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

But you know what is? HTML! So I just needed to build (or find, in this case) a tool that allowed me to convert Markdown to HTML!

![Tyler Perry Problem Solved GIF by Nickelodeon](https://media2.giphy.com/media/LJbberzGLVChcsdNOv/giphy.gif?cid=bcfb6944h5e0uf8r7n2yyktj224ougmnxeycs0uu8pbdp5qb&ep=v1_gifs_search&rid=giphy.gif&ct=g)

### Unified

To build the Markdown editor (and the preview, mostly), I decided to use [unified](https://unifiedjs.com/), an ecosystem of tools allowing the developer to parse a format into an abstract tree and back into another format (for example, markdown to html) and modify said tree (for example, to add specific classes to certain html elements before they are converted to an actual html string. The basics of how to do so can be found in [this article](https://unifiedjs.com/learn/guide/using-unified/), but they mostly consist of:
- reading the markdown content (from the textarea in this case)
- using `remarkParse` to convert the markdown into a syntax tree
- using `remarkRehype` to convert the markdown syntax tree to an html syntax tree
- using `rehypeStringify` to convert the html syntax tree to an html string

![GIF by South Park ](https://media4.giphy.com/media/3o7ypD3Ho7jMArHDxe/giphy.gif?cid=bcfb6944tegi9dndgxq1mo0tz531rpudh84d657kl2llua1n&ep=v1_gifs_search&rid=giphy.gif&ct=g)

The real magic is what happens once you generate the syntax trees; at that point, you can modify them with the existing plugins (or make you own, if you really want to). For instance, I use a plugin to add specific css classes to certain elements so they integrate better with the visual design of the website another to add code highlighting with [highlight.js](https://highlightjs.org/) and some others for generating a js object from the frontmatter of a Markdown file and to add support for Github flavored Markdown. I could do a lot more with these, like add support for videos, embeds and more, but for now this is enough for a simple preview.

**NB: remark and rehype are also used by [astro](https://astro.build) to render the collection's markdown content, so any plugins you use there can also be used here**

## Putting it all together

Now that we have a basic understanding of how unified works, let's practice! I have already created a stackblitz example you can see just below this paragraph: try writing something in the textarea and it should be parsed and displayed in the preview next to it!

https://stackblitz.com/edit/mg-markdown-parser?embed=1&file=src%2FApp.svelte

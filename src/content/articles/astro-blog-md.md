---
title: "Building an Astro Blog with View Transitions"
description: "a tale of sweat, content collections, pages and storage"
publishDate: 2023-08-24
cover_image: https://cdn.blog.matteogassend.com/astro-blog-transitions-cover.jpg
tags:
- astro
- markdown
---


I've recently decided to recentralize all my articles on my own blog instead of publishing them to [Hashnode](https://hashnode.com) (nothing wrong with Hashnode, just something that I had wanted to do for a while) and since I have a wondeful brand new [personal site](https://matteogassend.com) built with [astro](https://astro.build) I decided to take advantage of their collection system and the new **experimental** (at least at the time of writing this article) view transitions api to build something a bit more tailored to what I like. Here's how it went.


## Astro Collections

### Introduction

Astro content collection are as simple as a folder containing a bunch of Markdown (or Markdoc or MDX) files if that's the only thing you need, but they can also do relationship matching between different collections, frontmatter validation using [zod](https://zod.dev) and you can also customize how the markdown is parsed and translated to html using [rehype](https://github.com/rehypejs/rehype) and [remark](https://github.com/remarkjs/remark) and their plugin ecosystem.


Let's look at an example, shall we? (btw, documentation for what I'm about to talk about is [here](https://docs.astro.build/en/guides/content-collections/))


Taking my blog as an example, we can see that (for now) the "articles" content collection has a bit of frontmatter validation; I am requiring that each article have a **title**, a **cover** image, a **publish date** and a list of tags. (Maybe I'll add something like article series in a future update? who knows?)


With this "schema" defined then, all my articles will need to have a frontmatter section looking kind of like this:

```yaml
---
title: "Some title here"
publishDate: 2023-06-10
cover: https://example.com/image.webp
tags: 
- tag1
- tag2
---
```

Then you can do a bunch of operations, like retrieving all the collection's "entries" (in this case, each article) and they can be handled like any other array in javascript or typescript (map over them, sort them by publication date etc).



### Displaying articles and more


When you nativate to a blog post on my website, I have a route that catches the article's slug (a human readable name that can be used in a url, basically), fetches the corresponding article and displays it along with its frontmatter data.


The code for it would look a bit like this:
```js
const { slug } = Astro.params;
if (slug === undefined) {
    throw new Error("Slug is required");
}
// 2. Query for the entry directly using the request slug
const entry = await getEntry("articles", slug);
// 3. Redirect if the entry does not exist
if (entry === undefined) {
    return Astro.redirect("/404");
}
```
and you would store in a file called `[...slug].astro`.

Then to display the markdown content, you can call the render method and then display the content on the page:
```javascript
---
const { Content, headings } = await entry.render();
---

<Content />
```

That should take care of displaying the content you wrote in your markdown file; you want to get the frontmatter data (like a title, cover image and such), you can do so using `entry.data.title` and so on.

## Adding Functionalities

### Table of Contents

But what if I wanted to add a summary ?

You could obviously write by hand each time, but you could also leverage the data Astro gives us; you may have noticed that I destructured 2 properties from the renderer entry: we have already used content, so let's look at the headings.

The headings variable is an array of all the headings in a file (think `#`, `##` etc) as well as their level (`##` is 2, `###` is 3 etc). With these informations, we can build a structure displaying each section and subsection and display it accordingly (more info on this article from [Kevin Drum](https://kld.dev/building-table-of-contents/) and add it our page.

### Embeds and markdown customization

You may also notice I have some embeds on my articles even though Markdown natively does not support embedding content. This is done by using a Remark plugin. Remark is a tool that can be used to parse and transform Markdown. In this case, I used a plugin called [remark-embedder](https://github.com/remark-embedder/core) to add custom logic to replace links from specific websites (in this case, Youtube and CodeSandbox) with `<iframe>`s containing the actual page; without the plugin, those would simply be text links and would make for a much less pleasing lecture, wouldn't you agree ?
You can obviously do more with remark than just that, so take a look at the plugins they offer. But how do you use with Astro? You simply add the plugins in your `astro.config.mjs` file (documentation on how to do that is [here](https://docs.astro.build/en/reference/configuration-reference/#markdownremarkplugins)).


This post was a bit chaotic, but I hope I was able to share a bit of what I did on my blog section (where you are hopefully reading this right now).





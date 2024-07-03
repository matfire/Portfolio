import rss from "@astrojs/rss"
import { experimental_AstroContainer } from "astro/container";
import { getCollection } from "astro:content"

export async function GET(context) {
	const blog = await getCollection("articles")
	const container = await experimental_AstroContainer.create()
	const items = [];
	for await (const article of blog.sort((a, b) => a.data.publishDate - b.data.publishDate)) {
		const data = await article.render()
		items.push({
			title: article.data.title,
			pubDate: article.data.publishDate,
			description: article.data.summary,
			link: `/blog/${article.slug}`,
			tags: article.data.tags.join(','),
			content: (await container.renderToString(data.Content)).replace(/^<!DOCTYPE html>/, ''),
			...article.data
		})
	}
	return rss({
		title: "Matteo's Blog",
		description: "blog feed of all of this website's articles",
		site: context.site,
		items,
		customData: '<language>en-us</language>'
	})
}

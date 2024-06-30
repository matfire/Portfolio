import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
	const blog = await getCollection("articles")
	return rss({
		title: "Matteo's Blog",
		description: "blog feed of all of this website's articles",
		site: context.site,
		items: blog.sort((a, b) => a.data.publishDate - b.data.publishDate).map(article => ({
			title: article.data.title,
			pubDate: article.data.publishDate,
			description: article.data.summary,
			link: `/blog/${article.slug}`,
			tags: article.data.tags.join(','),
			...article.data
		})),
		customData: '<language>en-us</language>'
	})
}

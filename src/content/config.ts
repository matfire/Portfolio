import { defineCollection, z } from "astro:content"

const projectsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date().transform((v) => new Date(v)),
        stack: z.array(z.string()),
        image: z.string().optional(),
        productionUrl: z.string().optional(),
        githubUrl: z.string().optional()
    })
})

const articlesCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        image: z.string(),
        tags: z.array(z.string())
    })
})

export const collections = {
    'projects': projectsCollection,
    'articles': articlesCollection
}
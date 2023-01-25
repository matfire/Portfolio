import {defineCollection, z} from "astro:content"

const projectsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        summary: z.string(),
        stack: z.array(z.string()),
        image: z.string().optional(),
        productionUrl: z.string().optional(),
        githubUrl: z.string().optional()
    })
})

export const collections = {
    'projects': projectsCollection
}
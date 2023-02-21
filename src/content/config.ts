import { defineCollection, z } from "astro:content"

const projectsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date().transform((v) => new Date(v)),
        stack: z.array(z.string()),
        image: z.string().optional(),
        productionUrl: z.string().optional(),
        epitech: z.boolean().default(false),
        personal: z.boolean().default(false),
        githubUrl: z.string().optional()
    })
})

const educationCollection = defineCollection({
    schema: z.object({
        title:z.string(),
        begin: z.date().transform((v) => new Date(v)),
        graduation: z.date().transform((v) => new Date(v)),
        schoolName: z.string(),
        country: z.string(),
        city: z.string(),
        logo: z.string()
    })
})

const experienceCollection = defineCollection({
    schema: z.object({
        companyName: z.string(),
        begin: z.date().transform((v) => new Date(v)),
        end: z.date().transform((v) => new Date(v)),
        role: z.string(),
        skills: z.array(z.string())
    })
})

const certificationCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        rank: z.string(),
        institution: z.string(),
        obtentionYear: z.number()
    })
})

export const collections = {
    'projects': projectsCollection,
    'education': educationCollection,
    'experience': experienceCollection,
    'certifications': certificationCollection
}
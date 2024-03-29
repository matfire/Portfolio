import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.date().transform((v) => new Date(v)),
      stack: z.array(z.string()),
      productionUrl: z.string().optional(),
      epitech: z.boolean().default(false),
      personal: z.boolean().default(false),
      githubUrl: z.string().optional(),
    }),
});

const articleCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date().transform((v) => new Date(v)),
    tags: z.array(z.string()),
    cover_image: z.string().url(),
    summary: z.string().optional(),
    series: z.string().optional()
  }),
});

const educationCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      begin: z.date().transform((v) => new Date(v)),
      graduation: z.date().transform((v) => new Date(v)),
      schoolName: z.string(),
      country: z.string(),
      city: z.string(),
      logo: image(),
    }),
});

const experienceCollection = defineCollection({
  schema: z.object({
    companyName: z.string(),
    begin: z.date().transform((v) => new Date(v)),
    end: z.date().transform((v) => new Date(v)),
    role: z.string(),
    skills: z.array(z.string()),
    des: z.array(z.string()),
    type: z.enum(["internship", "fixed-term contract", "permanent contract"]),
  }),
});

export const collections = {
  projects: projectsCollection,
  education: educationCollection,
  experience: experienceCollection,
  articles: articleCollection,
};

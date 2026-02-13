import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.union([z.string(), z.date()]).optional(),
    pubDate: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    cover: z.string().optional(),
    ogImage: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
  })
});

export const collections = {
  posts,
};

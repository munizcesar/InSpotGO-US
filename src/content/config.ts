import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().optional(),
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

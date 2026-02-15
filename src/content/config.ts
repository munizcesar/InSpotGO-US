import { defineCollection, z } from 'astro:content';

const productSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  price: z.string().optional(),
  link: z.string().url().optional(),
  badge: z.string().optional(),
});

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),

    // Dates (support both YAML date objects and strings)
    date: z.union([z.string(), z.date()]).optional(),
    updated: z.union([z.string(), z.date()]).optional(),
    pubDate: z.union([z.string(), z.date()]).optional(),

    // Media
    image: z.string().optional(),
    cover: z.string().optional(),
    ogImage: z.string().optional(),

    // Taxonomy & flags
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),

    // Meta
    author: z.string().optional(),
    readTime: z.string().optional(),

    // SEO helper (used by CMS/editorial templates)
    seo: z
      .object({
        keywords: z.string().optional(),
      })
      .optional(),

    // Optional product blocks (used by CMS)
    products: z.array(productSchema).optional(),
  }),
});

export const collections = {
  posts,
};

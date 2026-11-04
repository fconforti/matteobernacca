import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articoli = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articoli' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articoli };

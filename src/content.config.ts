import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articoli = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articoli' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Categoria mostrata sopra il titolo dell'articolo (eyebrow).
    category: z.enum(['Le basi', 'Schiena', 'Collo e testa', 'Spalle e articolazioni', 'Sport e lavoro', 'Donna e età', 'In vacanza in Versilia']),
    tags: z.array(z.string()).default([]),
    // Slug di quattro articoli da mostrare in fondo (se mancano, si usano i tag).
    related: z.array(z.string()).default([]),
    // Se true, le sezioni ## diventano domande e risposte nei dati strutturati (FAQPage).
    faq: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Immagine di copertina (da Unsplash), salvata in src/content/articoli/covers/.
    cover: z
      .object({
        image: image(),
        alt: z.string(),
        author: z.string(),
        authorUrl: z.string().url(),
        url: z.string().url(), // pagina della foto su Unsplash
      })
      .optional(),
  }),
});

export const collections = { articoli };

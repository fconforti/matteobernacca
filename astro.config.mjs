// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Data di ultima modifica di ogni articolo (updatedDate, altrimenti pubDate), per la sitemap.
const articleDates = Object.fromEntries(
  readdirSync('./src/content/articoli')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = readFileSync(`./src/content/articoli/${f}`, 'utf8');
      const date = fm.match(/^updatedDate:\s*(\S+)/m)?.[1] ?? fm.match(/^pubDate:\s*(\S+)/m)?.[1];
      return [f.replace(/\.md$/, ''), date];
    }),
);
const latest = Object.values(articleDates).sort().at(-1);

// GitHub Pages: https://fconforti.github.io/matteobernacca/
// Con un dominio personalizzato (es. https://matteobernacca.it): cambia `site`,
// rimuovi `base` e aggiungi public/CNAME.
const SITE = 'https://fconforti.github.io';
const BASE = '/matteobernacca';
// Home e indice articoli prendono la data dell'articolo più recente.
const listing = new Set([`${SITE}${BASE}/`, `${SITE}${BASE}/articoli/`]);

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const slug = item.url.match(/\/articoli\/([^/]+)\/$/)?.[1];
        const date = slug ? articleDates[slug] : listing.has(item.url) ? latest : undefined;
        return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
      },
    }),
  ],
});

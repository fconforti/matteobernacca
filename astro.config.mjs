// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: https://fconforti.github.io/matteobernacca/
// Con un dominio personalizzato (es. https://matteobernacca.it): cambia `site`,
// rimuovi `base` e aggiungi public/CNAME.
export default defineConfig({
  site: 'https://fconforti.github.io',
  base: '/matteobernacca',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

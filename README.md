# matteobernacca

Sito personale di Matteo Bernacca, osteopata in Versilia. Astro, pubblicato su GitHub Pages.

- Sito: https://fconforti.github.io/matteobernacca/
- Deploy: ogni push su `main` esegue `.github/workflows/deploy.yml`.

## Sviluppo

```sh
npm install
npm run dev      # http://localhost:4321/matteobernacca/
npm run build    # output in dist/
```

## Dove cambiare le cose

- **Contatti, orari, indirizzo, città servite**: `src/site.ts` (i contatti attuali sono segnaposto).
- **Foto**: metti `public/matteo.jpg` e segui il commento in `src/components/Photo.astro`.
- **Testo "Chi sono"**: `src/pages/chi-sono.astro`.
- **Articoli**: un file Markdown in `src/content/articoli/`, con frontmatter `title`, `description`, `pubDate`, `tags`; `related` (due slug di articoli correlati, opzionale); `draft: true` lo nasconde. Il nome del file è lo slug dell'URL.
- **Dominio personalizzato**: in `astro.config.mjs` imposta `site` al dominio, togli `base`, aggiungi `public/CNAME` e aggiorna `public/robots.txt`.

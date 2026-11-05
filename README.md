# matteobernacca

Sito personale di Matteo Bertacca, osteopata in Versilia. Astro, pubblicato su GitHub Pages.

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
- **Foto**: sostituisci `src/assets/matteo.jpg` (verticale o quadrata; nella home viene ritagliata quadrata). Astro genera le versioni WebP per la pagina e un JPEG per anteprime social e dati strutturati.
- **Home (chi sono, prima visita, contatti)**: `src/pages/index.astro`. Il pulsante "Contattami" (WhatsApp) è `src/components/ContactButton.astro`.
- **Articoli**: un file Markdown in `src/content/articoli/`, con frontmatter `title`, `description`, `pubDate`, `tags`; `related` (quattro slug di articoli correlati, mostrati in fondo; se mancano si usano i tag); `faq: true` per gli articoli di domande e risposte; `draft: true` lo nasconde. Il nome del file è lo slug dell'URL.
- **Dominio personalizzato**: in `astro.config.mjs` imposta `SITE` al dominio, metti `BASE = ''`, aggiungi `public/CNAME` e aggiorna `public/robots.txt`.

## Agent e LLM

- `/llms.txt` (alias `/llm.txt`): indice del sito per agent, secondo https://llmstxt.org. Generato da `src/pages/llms.txt.ts`.
- `/llms-full.txt`: tutti gli articoli in un unico file Markdown.
- `/articoli/<slug>.md`: ogni articolo in Markdown, con i link resi assoluti. Le pagine HTML lo indicano con `<link rel="alternate" type="text/markdown">`.
- JSON-LD (`src/schema.ts`): WebSite, Person e LocalBusiness su ogni pagina, più BlogPosting, CollectionPage, ProfilePage e BreadcrumbList dove servono.
- `public/robots.txt` consente esplicitamente i crawler AI; la sitemap ha `lastmod` presa dalle date degli articoli.
- I campi in `site.placeholders` (`src/site.ts`) non finiscono né nel JSON-LD né in llms.txt: quando email, indirizzo e orari sono veri, toglili da lì.

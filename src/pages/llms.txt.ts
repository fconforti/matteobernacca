// llms.txt (https://llmstxt.org): indice del sito pensato per agent e LLM.
import type { APIContext } from 'astro';
import { site } from '../site';
import { abs, aboutMarkdown, getPosts } from '../agents';

export async function GET({ site: siteUrl }: APIContext) {
  const posts = await getPosts();
  const u = siteUrl!;
  const body = [
    `# ${site.name} · ${site.profession} in ${site.area}`,
    '',
    `> ${site.description}`,
    '',
    `Sito personale di ${site.name}, osteopata a ${site.contact.city} (${site.contact.province}). Contiene articoli divulgativi in italiano che spiegano l'osteopatia con parole semplici ed esempi, e le informazioni per prenotare una prima visita in Versilia (anche per chi è in vacanza). Ogni articolo è disponibile anche in Markdown: basta aggiungere \`.md\` al percorso, senza la barra finale.`,
    '',
    aboutMarkdown(u),
    '',
    '## Articoli',
    '',
    ...posts.map((p) => `- [${p.data.title}](${abs(u, `/articoli/${p.id}.md`)}): ${p.data.description}`),
    '',
    '## Pagine',
    '',
    `- [Prenota una prima visita](${abs(u, '/prima-visita/')}): contatti, studio e come si svolge la prima visita`,
    `- [Chi sono](${abs(u, '/chi-sono/')}): chi è ${site.name} e come lavora`,
    `- [Tutti gli articoli](${abs(u, '/articoli/')})`,
    '',
    '## Optional',
    '',
    `- [Testo completo di tutti gli articoli](${abs(u, '/llms-full.txt')})`,
    `- [Sitemap](${abs(u, '/sitemap-index.xml')})`,
    `- [Feed RSS](${abs(u, '/rss.xml')})`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

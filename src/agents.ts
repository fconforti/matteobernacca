// Contenuti per agent e LLM: llms.txt, llms-full.txt e versioni Markdown degli articoli.
import { getCollection, type CollectionEntry } from 'astro:content';
import { site, href, whatsappUrl, isReal } from './site';

type Post = CollectionEntry<'articoli'>;

export const abs = (siteUrl: URL, path: string) => new URL(href(path), siteUrl).toString();

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('articoli', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

const day = (d: Date) => d.toISOString().slice(0, 10);

// I link negli articoli sono relativi alla pagina HTML (es. ../mal-di-schiena/):
// nelle versioni Markdown li rendiamo assoluti, così restano validi ovunque.
export function absoluteLinks(markdown: string, pageUrl: string): string {
  return markdown.replace(/\]\((?!https?:|mailto:|tel:|#)([^)\s]+)\)/g, (_, link) => `](${new URL(link, pageUrl).toString()})`);
}

export function postMarkdown(post: Post, siteUrl: URL): string {
  const url = abs(siteUrl, `/articoli/${post.id}/`);
  const { title, description, pubDate, updatedDate } = post.data;
  return [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    `- Autore: ${site.name}, ${site.profession.toLowerCase()} a ${site.contact.city} (${site.area})`,
    `- Pubblicato: ${day(pubDate)}${updatedDate ? ` · aggiornato: ${day(updatedDate)}` : ''}`,
    `- Pagina: ${url}`,
    '',
    absoluteLinks((post.body ?? '').trim(), url),
    '',
    '---',
    '',
    `Questo articolo ha uno scopo informativo e non sostituisce una visita medica.`,
    `Per una prima visita gratuita con ${site.name}: ${abs(siteUrl, '/#contatti')} · WhatsApp ${site.contact.phone}.`,
    '',
  ].join('\n');
}

export function aboutMarkdown(siteUrl: URL): string {
  const c = site.contact;
  return [
    `## Chi è ${site.name}`,
    '',
    `${site.name} è un ${site.profession.toLowerCase()} che riceve a ${c.city} (${c.province}), in ${site.area}, ${site.region}.`,
    `Lavora con un approccio manuale e valuta il corpo nel suo insieme. Si occupa soprattutto di mal di schiena, collo e cervicale, mal di testa di origine muscolare, tensioni da postura e lavoro al computer, fastidi ricorrenti nello sport.`,
    `Segue persone di ${site.towns.join(', ')} e di tutta la Versilia. Per chi è in vacanza in Versilia organizza percorsi brevi: due o tre sedute ravvicinate e un piano da seguire a casa.`,
    '',
    '## Prima visita e contatti',
    '',
    `- Prenotazione: messaggio WhatsApp (${whatsappUrl.split('?')[0]})`,
    `- Telefono: ${c.phone}`,
    ...(isReal('email') ? [`- Email: ${c.email}`] : []),
    isReal('address') ? `- Studio: ${c.address}, ${c.postalCode} ${c.city} (${c.province})` : `- Studio: ${c.city} (${c.province})`,
    ...(isReal('hours') ? [`- Orari: ${site.hours}`] : []),
    `- La prima visita è gratuita e dura circa un'ora: colloquio, valutazione, trattamento manuale, piano con il numero indicativo di sedute.`,
    `- Pagina: ${abs(siteUrl, '/#contatti')}`,
  ].join('\n');
}

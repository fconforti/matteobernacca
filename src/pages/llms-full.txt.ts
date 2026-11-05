// llms-full.txt: tutto il contenuto del sito in un unico file Markdown.
import type { APIContext } from 'astro';
import { site } from '../site';
import { aboutMarkdown, getPosts, postMarkdown } from '../agents';

export async function GET({ site: siteUrl }: APIContext) {
  const posts = await getPosts();
  const body = [
    `# ${site.name} · ${site.profession} in ${site.area}`,
    '',
    `> ${site.description}`,
    '',
    aboutMarkdown(siteUrl!),
    '',
    ...posts.map((p) => postMarkdown(p, siteUrl!).replace(/^# /, '# Articolo: ')),
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

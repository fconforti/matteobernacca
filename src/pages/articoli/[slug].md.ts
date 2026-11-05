// Versione Markdown di ogni articolo: /articoli/<slug>.md
import type { APIContext } from 'astro';
import { getPosts, postMarkdown } from '../../agents';

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props, site }: APIContext) {
  return new Response(postMarkdown(props.post, site!), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

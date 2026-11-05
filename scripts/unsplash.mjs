// Copertine degli articoli da Unsplash (API ufficiale).
// Serve UNSPLASH_ACCESS_KEY (in ~/.secrets/matteobernacca.env, caricato da .envrc).
//
//   node scripts/unsplash.mjs search <slug> [query]   → scarica 9 anteprime e un provino numerato
//   node scripts/unsplash.mjs pick <slug> <n|photoId> "<alt>"  → salva la copertina e aggiorna il frontmatter
//
// La query di default per ogni articolo è in scripts/covers.json. Provini e risultati vanno in
// $COVER_DIR/<slug>/ (default /tmp/unsplash): pick li riusa e così fa una sola chiamata API.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) throw new Error('UNSPLASH_ACCESS_KEY mancante');
const api = async (path) => {
  const res = await fetch(`https://api.unsplash.com${path}`, {
    headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
};
const bytes = async (url) => Buffer.from(await (await fetch(url)).arrayBuffer());

const [cmd, slug, ...rest] = process.argv.slice(2);

if (cmd === 'search') {
  const query = rest[0] || JSON.parse(readFileSync('scripts/covers.json', 'utf8'))[slug];
  const dir = `${process.env.COVER_DIR || '/tmp/unsplash'}/${slug}`;
  mkdirSync(dir, { recursive: true });
  const { results } = await api(
    `/search/photos?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape&content_filter=high`,
  );
  const W = 400, H = 225;
  const tiles = await Promise.all(results.map(async (p, i) => {
    const img = await sharp(await bytes(`${p.urls.raw}&w=${W}&h=${H}&fit=crop`)).resize(W, H).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="${H}"><rect width="44" height="34" fill="black" opacity="0.7"/><text x="10" y="25" font-size="22" font-family="sans-serif" fill="white">${i + 1}</text></svg>`);
    return { input: await sharp(img).composite([{ input: label }]).toBuffer(), left: (i % 3) * W, top: Math.floor(i / 3) * H };
  }));
  await sharp({ create: { width: W * 3, height: H * 3, channels: 3, background: '#fff' } })
    .composite(tiles).jpeg({ quality: 80 }).toFile(`${dir}/sheet.jpg`);
  writeFileSync(`${dir}/results.json`, JSON.stringify(results.map((p, i) => ({
    n: i + 1, id: p.id, alt: p.alt_description, size: `${p.width}x${p.height}`,
    user: { name: p.user.name, links: { html: p.user.links.html } },
    links: { html: p.links.html, download_location: p.links.download_location },
    urls: { raw: p.urls.raw },
  })), null, 2));
  console.log(`query: ${query}\nprovino: ${dir}/sheet.jpg`);
  results.forEach((p, i) => console.log(`${i + 1}. ${p.id} · ${p.user.name} · ${p.alt_description ?? ''}`));
}

if (cmd === 'pick') {
  const [ref, alt] = rest;
  let cached = [];
  try { cached = JSON.parse(readFileSync(`${process.env.COVER_DIR || '/tmp/unsplash'}/${slug}/results.json`, 'utf8')); } catch {}
  const p = cached.find((c) => String(c.n) === ref || c.id === ref) ?? (await api(`/photos/${ref}`));
  await api(new URL(p.links.download_location).pathname + new URL(p.links.download_location).search); // richiesto dalle linee guida
  const file = `src/content/articoli/covers/${slug}.jpg`;
  mkdirSync('src/content/articoli/covers', { recursive: true });
  writeFileSync(file, await bytes(`${p.urls.raw}&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=80`));
  const md = `src/content/articoli/${slug}.md`;
  const cover = [
    'cover:',
    `  image: ./covers/${slug}.jpg`,
    `  alt: ${JSON.stringify(alt)}`,
    `  author: ${JSON.stringify(p.user.name)}`,
    `  authorUrl: ${p.user.links.html}`,
    `  url: ${p.links.html}`,
  ].join('\n');
  const src = readFileSync(md, 'utf8').replace(/\ncover:\n(?:  .*\n)+/, '\n');
  writeFileSync(md, src.replace(/^---\n([\s\S]*?)\n---/, (_, fm) => `---\n${fm}\n${cover}\n---`));
  console.log(`${slug}: ${p.user.name} · ${p.links.html}`);
}

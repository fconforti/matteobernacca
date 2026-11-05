// Dati strutturati schema.org (JSON-LD), letti da motori di ricerca e agent.
import { site, href, isReal } from './site';

export const ids = (siteUrl: URL) => {
  const root = new URL(href('/'), siteUrl).toString();
  return { root, website: `${root}#website`, business: `${root}#studio`, person: `${root}#matteo` };
};

export function baseGraph(siteUrl: URL) {
  const id = ids(siteUrl);
  const c = site.contact;
  const address = {
    '@type': 'PostalAddress',
    ...(isReal('address') ? { streetAddress: c.address, postalCode: c.postalCode } : {}),
    addressLocality: c.city,
    addressRegion: c.province,
    addressCountry: 'IT',
  };
  return [
    {
      '@type': 'WebSite',
      '@id': id.website,
      url: id.root,
      name: site.title,
      description: site.description,
      inLanguage: site.lang,
      publisher: { '@id': id.person },
    },
    {
      '@type': 'Person',
      '@id': id.person,
      name: site.name,
      jobTitle: site.profession,
      knowsAbout: ['Osteopatia', 'Mal di schiena', 'Cervicalgia', 'Postura', 'Trattamento manuale'],
      worksFor: { '@id': id.business },
      url: new URL(href('/#chi-sono'), siteUrl).toString(),
    },
    {
      '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
      '@id': id.business,
      name: `${site.name} · ${site.profession}`,
      description: site.description,
      url: id.root,
      telephone: c.phone,
      ...(isReal('email') ? { email: c.email } : {}),
      ...(isReal('hours') ? { openingHours: 'Mo-Fr 09:00-19:00' } : {}),
      address,
      areaServed: site.towns.map((name) => ({ '@type': 'City', name })),
      founder: { '@id': id.person },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: c.phone,
        contactType: 'prenotazioni',
        availableLanguage: ['it'],
      },
    },
  ];
}

export function breadcrumbs(siteUrl: URL, items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(href(item.path), siteUrl).toString(),
    })),
  };
}

// FAQPage dai titoli ## (domande) e dal testo che li segue (risposte), senza la formattazione Markdown.
export function faqFromMarkdown(markdown: string) {
  const plain = (t: string) =>
    t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
  const sections = markdown.split(/^## /m).slice(1);
  return {
    '@type': 'FAQPage',
    mainEntity: sections.map((section) => {
      const [question, ...rest] = section.split('\n');
      return {
        '@type': 'Question',
        name: plain(question),
        acceptedAnswer: { '@type': 'Answer', text: plain(rest.join('\n')) },
      };
    }),
  };
}

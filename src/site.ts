// Dati del sito e del professionista: un solo posto da aggiornare.
export const site = {
  name: 'Matteo Bernacca',
  title: 'Matteo Bernacca · Osteopata in Versilia',
  description:
    'Osteopata in Versilia: trattamenti osteopatici a Pietrasanta, Camaiore, Forte dei Marmi, Viareggio e dintorni. Articoli semplici per capire l’osteopatia e come può aiutarti.',
  locale: 'it_IT',
  lang: 'it',
  author: 'Matteo Bernacca',
  profession: 'Osteopata',
  // Zona servita: usata nei testi e nei dati strutturati per la ricerca locale.
  area: 'Versilia',
  towns: ['Pietrasanta', 'Camaiore', 'Forte dei Marmi', 'Viareggio', 'Lido di Camaiore', 'Marina di Pietrasanta', 'Seravezza', 'Massarosa'],
  region: 'Toscana',
  // Contatti. Telefono e WhatsApp reali; email e indirizzo ancora segnaposto.
  contact: {
    phone: '+39 340 797 0063',
    phoneDisplay: '340 797 0063',
    email: 'info@example.com',
    whatsapp: '393407970063',
    address: 'Via Esempio 1',
    city: 'Pietrasanta',
    province: 'LU',
    postalCode: '55045',
  },
  // Campi ancora segnaposto: non finiscono nei dati strutturati né nei file per agent (llms.txt).
  // Toglili da qui quando inserisci i dati veri.
  placeholders: ['email', 'address', 'hours'] as string[],
  // Orari indicativi (placeholder)
  hours: 'Lunedì – Venerdì, 9:00 – 19:00. Sabato su appuntamento.',
};

export const isReal = (field: 'email' | 'address' | 'hours') => !site.placeholders.includes(field);

// Link WhatsApp con un messaggio già scritto.
export const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  'Ciao Matteo, vorrei qualche informazione per una visita osteopatica.',
)}`;

// Prefisso dei link interni (dipende da `base` in astro.config.mjs).
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;

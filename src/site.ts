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
  // Contatti: PLACEHOLDER, da sostituire con quelli reali.
  contact: {
    phone: '+39 000 000 0000',
    phoneDisplay: '000 000 0000',
    email: 'info@example.com',
    whatsapp: '39000000000',
    address: 'Via Esempio 1',
    city: 'Pietrasanta',
    province: 'LU',
    postalCode: '55045',
  },
  // Orari indicativi (placeholder)
  hours: 'Lunedì – Venerdì, 9:00 – 19:00. Sabato su appuntamento.',
};

// Prefisso dei link interni (dipende da `base` in astro.config.mjs).
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;

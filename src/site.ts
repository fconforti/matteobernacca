// Dati del sito e del professionista: un solo posto da aggiornare.
export const site = {
  name: 'Matteo Bertacca',
  title: 'Matteo Bertacca · Osteopata in Versilia',
  description:
    'Osteopata in Versilia: trattamenti osteopatici a Camaiore, Pietrasanta, Viareggio, Forte dei Marmi e dintorni. Articoli semplici per capire l’osteopatia e come può aiutarti.',
  locale: 'it_IT',
  lang: 'it',
  author: 'Matteo Bertacca',
  profession: 'Osteopata',
  // Zona servita: usata nei testi e nei dati strutturati per la ricerca locale.
  area: 'Versilia',
  towns: ['Camaiore', 'Lido di Camaiore', 'Pietrasanta', 'Forte dei Marmi', 'Viareggio', 'Marina di Pietrasanta', 'Seravezza', 'Massarosa'],
  region: 'Toscana',
  // Contatti. Telefono e WhatsApp reali; email e indirizzo ancora segnaposto.
  contact: {
    phone: '+39 340 797 0063',
    phoneDisplay: '340 797 0063',
    // Email: Matteo preferisce non pubblicarla (solo WhatsApp e telefono).
    email: '',
    whatsapp: '393407970063',
    address: 'Via Esempio 1',
    city: 'Camaiore',
    province: 'LU',
    postalCode: '55041',
  },
  // Campi ancora segnaposto: non finiscono nei dati strutturati né nei file per agent (llms.txt).
  // Toglili da qui quando inserisci i dati veri.
  placeholders: ['email', 'address', 'hours'] as string[],
  // Formazione (dal curriculum di Matteo).
  education: [
    { title: 'Diploma in Osteopatia (D.O.)', school: 'SOFI Tirrenica, Pisa', years: '2020–2025' },
    { title: "Laurea magistrale in Scienze e tecniche dell'attività motoria preventiva e adattata", school: 'Università di Pisa', years: '2018–2020' },
    { title: 'Laurea triennale in Scienze motorie', school: 'Università di Pisa', years: '2015–2018' },
    { title: 'Corsi di massaggio sportivo (CSEN) e di taping elastico (ATS)', school: 'Pisa', years: '2016–2017' },
    { title: 'Certified Personal Fitness Trainer', school: 'ISSA', years: '2015' },
  ],
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

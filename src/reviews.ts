// Recensioni per la sezione "Dicono di me" della home.
// Solo recensioni vere, con il consenso della persona (per esempio copiate da Google o ricevute per messaggio).
// Finché la lista è vuota la sezione non compare. Per l'ordine: la prima è la più in vista.
//
// Esempio:
//   { text: 'Avevo mal di schiena da mesi...', name: 'Giulia', detail: 'Camaiore' },
export interface Review {
  text: string;
  name: string; // nome o nome e iniziale del cognome
  detail?: string; // paese, oppure "in vacanza da Milano", ecc.
}

export const reviews: Review[] = [
  {
    text: 'Mi sono trovato molto bene con Matteo. Ascolta con attenzione, spiega con parole semplici cosa sta facendo e perché, e alla fine lascia indicazioni chiare su cosa fare a casa. Lo consiglio.',
    name: 'Filippo',
  },
  {
    text: 'Matteo è gentile e professionale. Fin dalla prima visita si è preso il tempo per capire il problema, senza fretta. Mi sono trovata benissimo.',
    name: 'Erika',
  },
];

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

// Le recensioni di Filippo ed Erika sono state tolte il 2026-11-07 (restano nella storia git).
export const reviews: Review[] = [];

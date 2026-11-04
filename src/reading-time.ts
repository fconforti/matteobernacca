// Tempo di lettura stimato: ~200 parole al minuto (lettura in italiano, testo divulgativo).
export function readingTime(body = ''): string {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|\-\[\]()!]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min di lettura`;
}

export function readingTime(body: string | undefined, wordsPerMinute = 220): number {
  if (!body) return 5;
  const words = body
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / wordsPerMinute));
}

export function formatDate(date: Date, style: 'short' | 'long' = 'short'): string {
  const options: Intl.DateTimeFormatOptions =
    style === 'long'
      ? { day: 'numeric', month: 'long', year: 'numeric' }
      : { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function sortByDate<T extends { data: { publishedAt: Date } }>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 9973;
  }
  return hash;
}

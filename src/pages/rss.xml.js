import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

export async function GET(context) {
  const articulos = await getCollection('articulos');
  const rutas = await getCollection('rutas');

  const items = [
    ...articulos.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/diario/${entry.id}/`,
      categories: [entry.data.category],
    })),
    ...rutas.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/rutas/${entry.id}/`,
      categories: ['rutas'],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Ruta y Ritmo — Diario de running',
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
    customData: '<language>es-es</language>',
  });
}

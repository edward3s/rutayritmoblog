import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORIAS } from '../data/categorias';

export const GET: APIRoute = async () => {
  const articulos = await getCollection('articulos');
  const rutas = await getCollection('rutas');

  const index = [
    ...articulos.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      category: CATEGORIAS[entry.data.category].name,
      type: 'Artículo',
      url: `/diario/${entry.id}/`,
      date: entry.data.publishedAt.toISOString(),
    })),
    ...rutas.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      category: 'Rutas',
      type: 'Ruta',
      url: `/rutas/${entry.id}/`,
      date: entry.data.publishedAt.toISOString(),
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

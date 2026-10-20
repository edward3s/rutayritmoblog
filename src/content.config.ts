import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categorias = [
  'entrenamiento',
  'material',
  'nutricion',
  'salud',
  'carreras',
] as const;

const sources = z.array(
  z.object({
    title: z.string(),
    url: z.url(),
  }),
);

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string().min(10).max(100),
    description: z.string().min(50).max(180),
    category: z.enum(categorias),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    medical: z.boolean().default(false),
    sources: sources.default([]),
  }),
});

const rutas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rutas' }),
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(50).max(180),
    distanceKm: z.number().positive(),
    elevationGain: z.number().nonnegative(),
    duration: z.string(),
    terrain: z.string(),
    start: z.string(),
    difficulty: z.enum(['Fácil', 'Moderada', 'Exigente']),
    water: z.string(),
    profile: z.array(z.number()).min(2),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    sources: sources.default([]),
  }),
});

export const collections = { articulos, rutas };

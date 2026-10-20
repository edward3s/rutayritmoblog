import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const body = `User-agent: *\nAllow: /\nDisallow: /gracias/\nDisallow: /buscar/\n\nSitemap: ${new URL('/sitemap-index.xml', base)}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

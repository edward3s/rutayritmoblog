import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cambia esta URL por tu dominio real antes de desplegar.
// También puedes definirla con la variable de entorno SITE_URL.
const SITE_URL = process.env.SITE_URL || 'https://rutayritmo.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    // CSS dentro del HTML: menos peticiones y preview local sin servidor.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/gracias/') &&
        !page.includes('/buscar/') &&
        !page.includes('/404'),
    }),
  ],
});

# Ruta y Ritmo

Diario de running estático construido con Astro 7. Sin base de datos, sin CMS y sin framework de UI: Markdown, colecciones de contenido y HTML estático.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
npm run covers   # regenera las portadas vectoriales por artículo
```

## Antes de publicar: lista de sustitución

**Estado editorial:** los artículos son borradores de arranque, no reportajes ya verificados. Comprueba las fuentes, fechas y afirmaciones antes de publicarlos. Las fichas de ruta y sus perfiles/distancias son preliminares; no afirman que el autor haya recorrido esos tracks. Completa también el perfil y las credenciales de autoría.

1. **Dominio**: cambia `SITE_URL` en `astro.config.mjs` o define la variable de entorno `SITE_URL` en el hosting. Ahora mismo es `https://rutayritmo.com`.
2. **Correo**: confirma que `hola@rutayritmo.com` existe y se monitoriza; actualiza `src/data/site.ts` si usarás otra dirección.
3. **Autor**: edita `src/data/autor.ts` (nombre, bio, enlaces). No publiques credenciales que no sean reales.
4. **Datos legales**: revisa `src/pages/aviso-legal.astro`, `privacidad.astro` y `cookies.astro` con tus datos fiscales y de contacto.
5. **Rutas**: las cuatro fichas son contenido de muestra. Verifica distancias, desniveles, accesos y puntos de agua antes de publicarlas.
6. **Cifras del hero**: el número de salidas y desnivel se calcula con el contenido; no hay estadísticas inventadas.
7. **Boletín**: usa Netlify Forms por defecto. En otro hosting, cambia el `action` de `src/components/Newsletter.astro` por tu proveedor (Buttondown, Mailchimp, ConvertKit…).
8. **Imagen social**: `public/og-default.png` se puede regenerar desde `public/og-default.svg`.

## AdSense: qué está listo y qué falta

El sitio incluye:

- Huecos publicitarios reservados y etiquetados (`AdSlot.astro`) solo en home, archivo, artículos y rutas.
- Banner de consentimiento (`CookieBanner.astro`) que guarda la elección y no carga anuncios si se rechazan.
- `ads.txt` de ejemplo (comentado).
- Privacidad, cookies, aviso legal, política editorial y divulgación de afiliados.
- Navegación, búsqueda, RSS, sitemap y redirecciones.

Para activar AdSense:

1. Solicita la cuenta con el dominio final y espera la aprobación. No publiques huecos vacíos como si fueran anuncios reales.
2. Define `PUBLIC_ADSENSE_CLIENT` (formato `ca-pub-XXXXXXXXXXXXXXXX`) y `PUBLIC_ADSENSE_SLOT` en el hosting. Sin ellas, los huecos quedan como reservas visuales.
3. Sustituye el contenido de `public/ads.txt` por la línea que te dé Google.
4. Para tráfico del EEE/Reino Unido, configura una **CMP certificada por Google** (Funding Choices u otra homologada). El banner propio no sustituye a esa CMP.
5. Revisa las políticas de contenido de AdSense y no publiques artículos médicos sin revisión profesional.
6. Comprueba el consentimiento antes de cargar el script: el componente solo lo inyecta tras aceptar.

## Contenido

- Artículos: `src/content/articulos/*.md` (frontmatter validado en `src/content.config.ts`).
- Rutas: `src/content/rutas/*.md`.
- Portadas SVG: `public/images/articles/*.svg` (generadas con `npm run covers`).
- Categorías: `src/data/categorias.ts`.
- Cada artículo declara `sources` y, si aplica, `medical: true`.

### Añadir un artículo

Crea un `.md` en `src/content/articulos/` con:

```yaml
---
title: "Título"
description: "Resumen de 140-160 caracteres."
category: "entrenamiento" # entrenamiento | material | nutricion | salud | carreras
publishedAt: 2026-10-20
updatedAt: 2026-10-20
featured: false
sources:
  - title: "Fuente"
    url: "https://..."
---
```

El slug es el nombre del archivo. Los enlaces internos deben terminar en `/` (por ejemplo, `/diario/zona-2-correr-despacio/`).

## Redirecciones

- Netlify: `public/_redirects`.
- Vercel: `vercel.json`.
- Ambas cubren `/blog/*`, `/posts/*`, `/articulos/*`, `/entrenamiento/*`, `/rss` y `/feed`.

Si cambias un slug, añade una redirección 301 en los dos archivos. No dejes URLs antiguas devolviendo 404.

## Despliegue

### Netlify

`netlify.toml` ya define build y publish. Conecta el repositorio y listo. Netlify Forms recogerá el boletín y el contacto.

### Vercel

Importa el proyecto. Vercel detecta Astro. `vercel.json` aplica redirecciones y cabeceras. Netlify Forms no funciona aquí: cambia el formulario por un proveedor externo.

### Cloudflare Pages

Build: `npm run build`. Output: `dist`. Revisa que las redirecciones se configuren en el panel o en `_redirects` (Cloudflare soporta un subconjunto).

## Notas de diseño

- Tipografía: Anton (titulares) e Instrument Sans (texto).
- Paleta: papel frío `#E8EDF0`, tinta `#0E1A20`, petróleo `#123F52`, naranja de señalización `#F05A28`.
- Sin fotos de stock: la ilustración es SVG generado por categoría y por perfil de ruta.
- El movimiento se limita a la carga del hero y los estados de interacción; respeta `prefers-reduced-motion`.

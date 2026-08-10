# Changelog — Sitio web RestHub-IA

> Formato adaptado del Método AInnovate para un sitio estático (sin build, sin DB, sin TypeScript):
> fecha, tipo de cambio, archivos afectados, descripción.

---

## [2026-08-10 14:30] - Pasar el sitio de resthub.cloud a agente.resthub.cloud

### Tipo de cambio
- **CHANGED**: el dominio raíz `resthub.cloud` lo va a usar otra página, así que este sitio pasa a vivir en el subdominio `agente.resthub.cloud`.

### Archivos afectados
- `index.html` — `canonical`, `og:url`, `og:image` y el JSON-LD
- `sitemap.xml` — `<loc>`
- `robots.txt` — línea `Sitemap:`
- `LEEME.md` — instrucciones de Vercel/Hostinger actualizadas a un único registro CNAME (`agente`) en vez de A (`@`) + CNAME (`www`)

### Descripción detallada
Al ser subdominio alcanza con un solo registro CNAME en Hostinger — no toca los registros del dominio raíz ni de `www`, que quedan libres para la otra página.

---

## [2026-08-10 13:22] - Corregir el link "Cómo funciona" del nav

### Tipo de cambio
- **FIXED**: el link "Cómo funciona" de la barra de navegación era fijo y siempre mandaba a la sección del Agente de Voz, sin importar qué plan estuviera activo en el carrusel de la portada.

### Archivos afectados
- `index.html` — el link del nav ahora tiene `id="nav-como-funciona"` sin destino fijo; se sacó el `id="como-funciona"` huérfano del eyebrow.
- `guion.js` — `pintar(i)` ahora reescribe el `href` del link según el plan activo (`#agente` / `#menutag` / `#combinado`).

### Descripción detallada
Reportado por Juan probando el sitio antes de conectar el dominio. Verificado con Playwright: clickeando las 3 pastillas y el link del nav en cada plan, confirmando que el scroll cae en la sección correcta en los tres casos.

### Request original
> "Cuando estoy en el agente de voz, y presiono 'como funciona', me dirige a la parte de como funciona el agente. Pero cuando estoy en menutag, y presiono 'como funciona' me dirige a la parte de como funciona el agente, no me dirige a como funciona el menutag [...] Solucionalo"

---

## [2026-08-10 07:31] - Los celulares cobran vida

### Tipo de cambio
- **FIXED**: las pantallas de los celulares (transcripción de llamada, registro de llamadas, chat de WhatsApp, menú) no mostraban ninguna animación de scroll ni cambio de vista.

### Archivos afectados
- `estilos.css` — `.vista` apiladas con turnos de entrada/salida, `min-height:0` en las ventanas con overflow, `@keyframes` de scroll con `calc(var(--recorrido))`.
- `guion.js` — medición en el navegador de `scrollHeight - clientHeight` por cada lista desplazable, guardada en la custom property `--recorrido`.

### Descripción detallada
Ver detalle completo de las dos trampas encontradas (flexbox `min-height:auto` y el recorrido que no se puede escribir a mano) en el documento del proyecto `sitio-web.md`.

### Request original
> "No aparece la animación de que se scrollea la conversación, ni que se ve otra, ni el registro de las llamadas"

---

## [2026-08-10 06:53] - Confirmar el dominio resthub.cloud

### Tipo de cambio
- **CHANGED**: se reemplazaron los placeholders de dominio por `resthub.cloud` en los 6 lugares que hacía falta.

### Archivos afectados
- `index.html` (canonical, og:url, og:image, JSON-LD), `sitemap.xml`, `robots.txt`

---

## [2026-08-10 06:29] - Setup inicial del sitio

### Tipo de cambio
- **ADDED**: primera versión completa del sitio — portada con carrusel de 3 planes, cómo funciona (Agente de Voz / MenuTag / Combinado), precios, contacto.

### Archivos afectados
- `index.html`, `estilos.css`, `guion.js`, `img/` (13 imágenes WebP), `favicon.svg`, `robots.txt`, `sitemap.xml`, `vercel.json`, `LEEME.md`

### Descripción detallada
Ver `sitio-web.md` en el proyecto de Claude para el detalle completo de decisiones de estructura, SEO y verificación.

---

_Este changelog vive junto al código (`sitio/CHANGELOG.md`). El detalle narrativo más largo de cada decisión sigue viviendo en los documentos del proyecto de Claude (`claude/sitio-web.md`, `claude/publicar-el-sitio.md`, etc.), que son más fáciles de leer que un changelog técnico._

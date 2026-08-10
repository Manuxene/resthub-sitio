# Sitio web RestHub-IA

Sitio estático: sin base de datos, sin servidor, sin build. Son archivos sueltos que cualquier hosting sirve tal cual.

```
index.html      la página entera
estilos.css     todo el diseño
guion.js        el carrusel y las apariciones al scrollear
img/            las fotos, ya optimizadas (484 KB en total)
favicon.svg     el iconito de la pestaña
robots.txt      permiso para que Google la indexe
sitemap.xml     el mapa del sitio
vercel.json     cachés y cabeceras de seguridad (solo lo usa Vercel)
```

Para verlo en tu compu: doble clic en `index.html`.

Cuando lo quieras subir a GitHub, primero convertilo en repositorio (tres líneas, parado en esta carpeta):

```bash
git init
git add -A
git commit -m "Sitio RestHub-IA"
```

⚠️ **Esta carpeta está dentro de OneDrive.** Git y OneDrive se llevan mal: OneDrive sincroniza los archivos internos de `.git` mientras git los está escribiendo y a veces rompe el repositorio. Antes de hacer lo de arriba, conviene **copiar esta carpeta a un lugar fuera de OneDrive** (por ejemplo `C:\Users\diego\proyectos\resthub-sitio`) y trabajar ahí.

---

## Publicarlo con GitHub + Vercel (lo recomendado)

Una vez conectado, **cada cambio que subas a GitHub se publica solo**. No volvés a tocar nada de infraestructura.

### 1. Subirlo a GitHub
Creá un repositorio vacío en GitHub (sin README, sin .gitignore — este proyecto ya los trae) y después, parado en esta carpeta:

```bash
git remote add origin https://github.com/TU-USUARIO/resthub-sitio.git
git branch -M main
git push -u origin main
```

### 2. Conectarlo a Vercel
1. En Vercel: **Add New → Project → Import Git Repository** y elegí el repo.
2. Framework Preset: **Other**. Build Command: **vacío**. Output Directory: **vacío**.
   (Es HTML plano, no hay nada que compilar. Si Vercel propone algo, borralo.)
3. **Deploy**. En menos de un minuto queda online en `algo.vercel.app`.

### 3. Enganchar `resthub.cloud`
1. En Vercel: **Settings → Domains → Add**, escribí `resthub.cloud`.
2. Vercel te muestra los registros que hay que cargar. Van a ser parecidos a esto —
   **usá los valores que te dé Vercel, no estos**:

   | Tipo | Nombre | Valor |
   |---|---|---|
   | A | `@` | la IP que te muestre Vercel |
   | CNAME | `www` | `cname.vercel-dns.com` |

3. En Hostinger: **hPanel → Dominios → `resthub.cloud` → Administrar → DNS / Nameservers**, y cargá esos registros.
4. Esperá. Suele tomar minutos, a veces algunas horas. El HTTPS lo emite Vercel solo.

⚠️ **Un dominio recién comprado ya viene con registros puestos** apuntando a la página de "en construcción" de Hostinger. Los `A` y `CNAME` que estén ahí hay que **reemplazarlos**, no agregar los de Vercel al lado. Si quedan los dos, el sitio anda a veces sí y a veces no, según a cuál le pegue cada visitante.

---

## Alternativa: hostearlo en Hostinger
Si preferís no mover el DNS y tenés hosting activo ahí: entrá al **Administrador de archivos** de hPanel, abrí `public_html` y subí el contenido de esta carpeta (los archivos sueltos, no la carpeta adentro de otra carpeta). Listo.

Es más simple de arrancar, pero cada cambio lo subís a mano. Con Vercel es `git push` y se publica solo. Por eso recomiendo Vercel.

---

## Sobre Supabase
**Para este sitio no hace falta**: es una página estática, no guarda ni consulta nada.

Donde sí te va a servir es en **el producto**: la base de datos de las cartas, los platos y precios de cada restaurante, el panel donde el dueño los edita, las reservas que toma el agente, el registro de las llamadas. Todo eso es exactamente para lo que sirve Supabase. Cuando llegue el momento de construir MenuTag de verdad, ahí entra.

Si más adelante querés un formulario de contacto en el sitio en vez de mandar todo a WhatsApp, también se resuelve con Supabase sin dejar de ser un sitio estático.

---

## Cambios que vas a querer hacer solo

**El WhatsApp.** El número está en 6 lugares de `index.html`. Buscá `5492984904013` y reemplazá. El texto después de `?text=` es el mensaje que le queda escrito al que te escribe — está pensado para que sepas de qué plan te hablan antes de contestar.

**Los precios.** Están en `index.html`, en la portada y en la sección de planes. Si cambia alguno, revisá también el ahorro del Combinado: hoy dice USD 30 porque 250 + 60 = 310 contra 280. Si movés un precio, ese número deja de cerrar.

**El dominio.** Está confirmado: **`resthub.cloud`**, activo en Hostinger, vence el **2027-08-03** con renovación automática encendida. Ya viene escrito así en los seis lugares donde hace falta (`canonical`, `og:url`, `og:image` y el JSON-LD en `index.html`, más `sitemap.xml` y `robots.txt`). **No hay que tocar nada.**

⚠️ Antes de agosto de 2027, fijate cuánto sale la renovación. Los `.cloud` suelen contratarse barato el primer año y renovar a varias veces ese precio, y como tenés la renovación automática encendida se cobra sola. La renovación automática conviene dejarla prendida —perder el dominio es mucho peor— pero mirá el precio con tiempo.

---

## Lo que quedó pendiente
- **Google Search Console**: cuando el dominio esté andando, dala de alta y mandá el `sitemap.xml`. Sin eso Google puede tardar semanas en encontrarte.
- **Analítica** no está puesta. Si la querés, es pegar un script antes de `</head>`.
- **La foto para compartir** (`img/og.jpg`) es una captura de la propia página. Es la que se ve cuando pasás el link por WhatsApp. Si querés algo más pensado, es una imagen de 1200×630.

# Frivas Interior & Steel Framing — Website

Sitio institucional construido en Next.js 16 (App Router) + TypeScript +
Tailwind CSS, migrado desde WordPress por motivos de seguridad.

## Estructura del contenido

Todo el texto y los datos editables viven en un solo archivo:

```
src/lib/content.ts
```

Ahí están: servicios, proyectos de la galería, textos de "About Us",
razones "Why Choose Us", teléfono, dirección y horario. Edita ese
archivo para actualizar el sitio sin tocar los componentes visuales.

## Imágenes de proyectos

La carpeta `public/images/proyectos/` contiene **imágenes placeholder
temporales** generadas automáticamente (con el nombre del proyecto
superpuesto) para que el sitio no se vea roto mientras no tengas las
fotos reales.

Para reemplazarlas: sube las fotos reales con el **mismo nombre de
archivo exacto** (ver `public/images/proyectos/README.md` para la
lista completa) y listo — no hay que tocar código.

## Formulario de contacto (SMTP)

El formulario envía correos vía SMTP usando `nodemailer`, con soporte
de adjuntos (PDF, JPG, PNG, WEBP, HEIC — hasta 5 archivos, 10MB cada
uno, 25MB en total).

### Configuración

1. Copia `.env.example` a `.env.local` (desarrollo) o `.env`
   (producción en la VM):
   ```bash
   cp .env.example .env.local
   ```
2. Completa las variables con los datos SMTP reales del dueño:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
   - `SMTP_USER`, `SMTP_PASSWORD` (usualmente una "app password", no
     la contraseña normal del correo — esto aplica a Gmail, Outlook,
     Zoho, etc.)
   - `CONTACT_TO_EMAIL` → la bandeja del dueño que recibirá los
     mensajes
   - `CONTACT_FROM_EMAIL` → opcional, dirección que aparece como
     remitente

Mientras estas variables no estén configuradas, el formulario
responde con un error controlado ("contact form is not fully
configured yet") en vez de fallar silenciosamente.

### Seguridad del formulario ya incluida

- Validación de campos con `zod` (servidor) + validación nativa HTML
  (cliente)
- Honeypot anti-bots (campo oculto `company_website`)
- Rate limiting básico en memoria (5 envíos / 10 min por IP) — para
  múltiples instancias del servidor, reemplazar por un store
  compartido (Redis, etc.)
- Whitelist de tipos MIME permitidos en adjuntos
- Límites de tamaño por archivo y total

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Build de producción

```bash
npm install
npm run build
npm run start
```

> **Nota sobre fuentes:** el proyecto usa `next/font/google` (Archivo,
> Inter, JetBrains Mono), que se descargan en build time. Esto
> requiere que el servidor donde corres `npm run build` tenga salida
> a internet hacia `fonts.googleapis.com` / `fonts.gstatic.com`. En
> tu VM de GCP esto debería funcionar sin problema si el tráfico
> saliente no está restringido.

## Deploy en tu VM de GCP (Sotterlabs)

Sugerencia de flujo, ajustable a tu setup real:

1. Clona o copia el proyecto a la VM.
2. `npm install && npm run build`
3. Configura `.env` con los datos SMTP reales (no lo subas a git).
4. Corre con un process manager persistente, por ejemplo PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "frivas-steel" -- start
   pm2 save
   ```
5. Pon Nginx (o Caddy) como reverse proxy hacia `localhost:3000`,
   con HTTPS vía Let's Encrypt/Certbot.
6. Apunta el DNS de `frivassteel.ca` a la IP de la VM.

Como el sitio es 100% estático en su contenido (sin base de datos,
sin panel de administración expuesto, sin plugins de terceros), la
superficie de ataque se reduce drásticamente comparado con WordPress
— no hay login de admin, ni plugins vulnerables, ni base de datos que
inyectar.

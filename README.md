# 🎨 NAMCRAFT Graphic Studio

A **free-to-use online graphic design tool**. Browse millions of studio-crafted
templates, remix them in a live editor, and export as PNG or SVG — no download, no signup.
Built with a playful, hand-crafted "postage stamp" design system.

> Palette extracted from the NAMCRAFT logo: **stamp blue**, **blossom pink**,
> **lemon yellow**, on a **warm cream** background (deep berry in dark mode).

## ✨ Features

- **Home** — hero with routing search bar, category chips, template spark grid, features,
  three-tier pricing, testimonials carousel, FAQ accordion, journal, CTA, and a scrolling
  capabilities marquee.
- **Templates library** (`/templates`) — 40+ templates across 1:1, 3:4, 4:5 and 16:9 ratios,
  with category / ratio / sort filters and a URL-synced search bar. Favorite + Use on each card.
- **Live editor** (`/templates/$id`) — edit headline & tagline, switch palettes, toggle
  light/dark text, pick from **multilingual fonts** (Latin, Devanagari, Arabic, CJK, Cyrillic,
  Thai, Hebrew, Tamil, Bengali…), resize the headline, add **shapes & emoji stickers** you can
  drag/resize/rotate/recolor on the canvas, upload a background image, and export to
  **PNG / SVG** via `html-to-image`. Print + native share. Save to the cloud (signed in) or
  `localStorage` (guests).
- **Auth & profile** — email/password + Google OAuth, header user menu, `/auth` and
  `/favorites` routes.
- **Dark mode** — `ThemeToggle` in every header with a no-flash init script.
- **SEO & social** — per-route title/description/OpenGraph/Twitter tags, JSON-LD Organization
  schema, `public/sitemap.xml`, `robots.txt`, and self-referencing canonicals.

## 🛠️ Tech Stack

TanStack Start v1 · React 19 · Vite 7 · Tailwind CSS v4 · Supabase (auth + database) ·
`html-to-image`.

## 🚀 Getting started

```bash
npm install
cp .env.example .env   # optional — the app works for guests without it
npm run dev            # http://localhost:3000
```

> The first `npm run dev` generates `src/routeTree.gen.ts` via the TanStack Router plugin.

### Build

```bash
npm run build
npm run start
```

## ☁️ Cloud (Supabase / "Lovable Cloud")

The auth + database layer uses the Supabase client — the same technology that powers
Lovable Cloud. Without env vars, the app degrades gracefully: guests get full editing with
`localStorage` persistence.

To enable cloud sync:

1. Create a Supabase project.
2. Run [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql) in the SQL editor.
   It creates `profiles`, `favorites` and `template_designs` tables, all protected by
   Row Level Security.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.
4. (Optional) Enable the Google provider in Supabase Auth settings for OAuth sign-in.

## 📁 Structure

```
src/
  routes/         # file-based routes (__root, index, templates, editor, contact, auth, favorites, sitemap)
  components/     # header, footer, home sections, editor panels, UI primitives
  lib/            # supabase client, seo helpers, template data, palettes, fonts, design store
  hooks/          # theme, auth, favorites contexts
  styles.css      # design system tokens (OKLCH), dark mode, gradients, utilities
```


## 🗺️ Sitemap

The sitemap ships as a static [`public/sitemap.xml`](./public/sitemap.xml) so it works on any
TanStack Start version and never affects app boot. Update the host if you deploy to a custom
domain, and add a `<url>` entry when you add a template in `src/lib/templates.ts`.

Prefer a **dynamic** server route that always stays in sync with the catalog? Create
`src/routes/sitemap[.]xml.ts` (delete the static file first to avoid a path clash):

```ts
import { createServerFileRoute } from "@tanstack/react-start/server";
import { SITE_URL } from "~/lib/seo";
import { TEMPLATES } from "~/lib/templates";

export const ServerRoute = createServerFileRoute().methods({
  GET: () => {
    const paths = ["/", "/templates", "/contact", "/favorites",
      ...TEMPLATES.map((t) => `/templates/${t.id}`)];
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
      .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "" : p}</loc></url>`)
      .join("\n")}\n</urlset>`;
    return new Response(body, { headers: { "Content-Type": "application/xml" } });
  },
});
```

> The exact server-route API (`createServerFileRoute`) can vary between TanStack Start
> versions — check the docs for the version pinned in `package.json` if you adopt this.


## 🪄 Brand logo

The company logo lives at [`public/logo-namcraft.svg`](./public/logo-namcraft.svg) — a scalable
SVG recreation of the NAMCRAFT scalloped-stamp mark (blue stamp, pink `NAM CRAFT` wordmark,
daisy accent, `GRAPHIC STUDIO` tagline). It's used in the header (`LogoMark` in
`src/components/StampLogo.tsx`) and footer, with a matching `public/favicon.svg`.

Prefer a pixel-exact raster? Drop your file at `public/logo-namcraft.png` and point `LogoMark`
at `/logo-namcraft.png` instead.

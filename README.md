# 🎨 NAMCRAFT Graphic Studio

A Canva-inspired design platform for **NAMCRAFT Graphic Studio** — browse studio-crafted
templates, remix them in a live editor, and export as PNG or SVG. Built with a playful,
hand-crafted "postage stamp" design system.

> Palette extracted from the NAMCRAFT logo: **stamp blue**, **blossom pink**,
> **lemon yellow**, on a **warm cream** background (deep berry in dark mode).

## ✨ Features

- **Home** — hero with routing search bar, category chips, template spark grid, features,
  three-tier pricing, testimonials carousel, FAQ accordion, journal, CTA, and a scrolling
  capabilities marquee.
- **Templates library** (`/templates`) — 40+ templates across 1:1, 3:4, 4:5 and 16:9 ratios,
  with category / ratio / sort filters and a URL-synced search bar. Favorite + Use on each card.
- **Live editor** (`/templates/$id`) — edit headline & tagline, switch palettes, toggle
  light/dark text, pick fonts, resize the headline, upload a background image, and export to
  **PNG / SVG** via `html-to-image`. Print + native share. Save to the cloud (signed in) or
  `localStorage` (guests).
- **Auth & profile** — email/password + Google OAuth, header user menu, `/auth` and
  `/favorites` routes.
- **Dark mode** — `ThemeToggle` in every header with a no-flash init script.
- **SEO & social** — per-route title/description/OpenGraph/Twitter tags, JSON-LD Organization
  schema, `sitemap.xml` server route, `robots.txt`, and self-referencing canonicals.

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

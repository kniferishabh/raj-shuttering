# Raj Shuttering & Scaffolding

A full-stack marketing site + admin dashboard for **Raj Shuttering & Scaffolding**, a Varanasi-based shuttering and scaffolding rental and wholesale business established in 2008.

Built with Next.js 14 App Router, TypeScript, CSS Modules, NextAuth.js v5, and a JSON flat-file data store.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | CSS Modules (no Tailwind, no styled-components) |
| Icons | lucide-react |
| Animations | Framer Motion + CSS keyframes |
| Auth | NextAuth.js v5 (Credentials provider) |
| Forms | React Hook Form + Zod |
| Storage | JSON files in `/data` |
| Fonts | Bebas Neue, DM Sans, Instrument Serif (via `next/font`) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rajshuttering@2024
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Admin Panel

Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and log in with the credentials in your `.env.local`.

## Project Structure

```
app/                       # Next.js App Router pages
├── (public pages)         # /, /about, /services, /gallery, /contact
├── admin/                 # Admin dashboard (protected)
└── api/                   # JSON API routes

components/
├── layout/                # Navbar, Footer, AdminSidebar
├── sections/              # Hero, Stats, Services, Gallery, etc.
└── ui/                    # Button, Card, Input, Modal, etc.

data/                      # JSON flat-file store (seed data included)
lib/                       # types, db helpers, auth config, settings reader
public/                    # static assets (logo, og-image)
middleware.ts              # Admin route protection
```

## Data Persistence

The site uses local JSON files in `/data` as the storage layer. Each request reads/writes these directly.

**For Vercel / serverless deployment**, JSON writes are ephemeral and will be lost on every cold start. For production, swap `lib/db.ts` to use Vercel KV, Vercel Postgres / Neon, Supabase, or any other persistent store.

## Build & Deploy

```bash
npm run build
npm run start
```

For Vercel deployment, set the environment variables above in the Vercel dashboard. Migrate to a managed database before going live.

## Hero Construction Video

The home page banner plays a looping construction video (scaffolding/build site footage) behind the hero content. To use your own **3D construction animation**:

1. Place your `.mp4` file in `public/videos/construction-hero.mp4`
2. Update URLs in `lib/media.ts` to point to `/videos/construction-hero.mp4`

The video auto-plays muted, uses a lighter mobile file on small screens, and falls back to a poster image when reduced-motion is enabled.

## Customising the Site

Almost every piece of public content is editable through the admin panel:

- **Services** - add, edit, reorder, toggle visibility
- **Gallery** - upload via URL, mark featured
- **Testimonials** - add, approve, edit
- **Enquiries** - view inbox, mark read, delete
- **Settings** - business info, contact, SEO, hero copy

## License

Private / proprietary. All rights reserved.

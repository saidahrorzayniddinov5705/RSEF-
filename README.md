# RSEF — Research, Science & Engineering Fair

The website for RSEF ([rsef.uz](https://www.rsef.uz)), Central Asia's first large-scale
research, science and engineering fair, held in Tashkent, Uzbekistan.

Trilingual (UZ / RU / EN) with locale-prefixed routes, applications and registration
backed by Firebase, and an admin panel for publishing news and results.

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 (`@theme` tokens in `src/index.css`) |
| Routing | React Router 7 |
| i18n | i18next / react-i18next |
| Backend | Firebase (Auth + Firestore) |
| Animation | Motion |
| Icons | lucide-react |
| Hosting | Vercel |

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Typecheck (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` |

Firebase config lives in `firebase-applet-config.json` (gitignored) and is read by
`src/lib/firebase.ts`.

## Project structure

```
public/              Static assets — logos, hero, winner and event photos
src/
  components/
    blocks/          Page sections (ImpactBento, JudgingCriteria, …)
    ui/              Primitives (shadcn-style Card)
    Navbar, Footer, LocaleLayout, AuthProvider, IntroVideo
  data/
    rsef2026.ts      Featured content — stats, judging rubric, winners, articles
    *Translations.ts Long-form translated copy
  i18n/config.ts     i18next setup
  lib/firebase.ts    Firebase init
  pages/             One file per route
  index.css          Tailwind entry + design tokens
```

## Routes

All pages live under a locale prefix — `/en`, `/uz`, `/ru`. `/` redirects to `/en`.

```
/:locale                     Home
/:locale/about               About
/:locale/news                News index
/:locale/news/:slug          Article
/:locale/results             Competition results
/:locale/apply               Application
/:locale/registration        Registration info & guidelines
/:locale/register            Registration form
/:locale/sponsors            Partners
/:locale/contact             Contact
/:locale/search              Search
/:locale/login               Sign in
/:locale/profile             Participant profile
/:locale/admin               Admin panel
```

## Design tokens

Defined once in `src/index.css` under `@theme` and used as normal Tailwind classes
(`bg-brand-900`, `text-mist-300`, `bg-paper-50`):

| Group | Values |
|---|---|
| `brand-400 / 500 / 600 / 900` | `#347aea` `#1c47c6` `#1e4ba3` `#041162` |
| `mist-100 / 200 / 300 / 400` | `#cedae7` `#b5cee5` `#9eb8d2` `#6d8cbe` |
| `paper-50 / 100 / 200 / 300` | `#faf9f7` `#f6f6f6` `#f5f4f2` `#f2f1ef` |

Use `paper-*` for page and card surfaces rather than pure `#ffffff`, and `brand-*`
for interactive and heading colors. Emerald remains only in form success states.

## Content

Two sources, rendered together:

- **In-repo** — `src/data/rsef2026.ts` holds the RSEF 2026 stats, the judging rubric,
  the winners, and featured articles. Edit the file and redeploy.
- **Firestore** — the `news` and `results` collections, managed from `/:locale/admin`.
  These render below the featured content.

## Deployment

Pushes to `main` deploy automatically via Vercel. `vercel.json` rewrites all paths to
`index.html` so client-side routes resolve on refresh.

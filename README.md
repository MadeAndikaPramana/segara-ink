# Segara Ink Tattoo — Sanur, Bali

Website for Segara Ink Tattoo (2 studios in Sanur, Bali). Same stack and
architecture as the sibling [swordsman-tattoo](https://github.com/swordsmanbali/swordsman-tattoo)
project, retinted with an ocean/teal theme instead of ink/blood — React 19 +
Vite + Tailwind v4 + react-router-dom + `motion`, with a small GitHub-API-backed
admin panel at `/admin` for managing portfolio photos without a database.

## Quick start

```bash
npm install
npm run dev
```

## What's real vs. placeholder

This project was scaffolded from public web research (Google/Facebook/
Instagram search results, September 2026) — not from the studio owner
directly. Before launch, get these confirmed/filled in:

| Item | Status | Where |
|---|---|---|
| Addresses, phone, hours, email | From public listings, unverified | `src/data/branches.js`, `src/constants.js` |
| Artist names & bios | **Not found** — none listed anywhere online | `src/data/branches.js` (`team: []` per branch) |
| Client review quotes | **Not found** — only an aggregate "100% recommend, 23 reviews" figure on Facebook | `src/data/testimonials.js` (empty array) |
| Portfolio photos | **None** — no real photos were available to include | `src/data/portfolio.json` (empty; upload via `/admin` or `scripts/import-portfolio.js`) |
| Studio logo | **None** — Navbar/Footer use a text wordmark instead of an image | `src/components/Navbar.jsx`, `Footer.jsx` |
| OG share image | **Missing** — `public/images/og-image.jpg` doesn't exist yet | `index.html` |
| Live domain | Unconfirmed — `segarainktattoobali.com` appeared in search but didn't resolve at scaffold time | `index.html`, `src/hooks/useDocumentHead.js`, `public/sitemap.xml`, `public/robots.txt` |
| Sanur 2 branch phone | Unconfirmed — currently shares the main studio's WhatsApp number | `src/data/branches.js` |

None of the above is fabricated — empty/placeholder sections render an
honest "coming soon" message instead of invented names or quotes. Search
`TODO` across the repo to find every flagged spot.

## Admin panel (`/admin`)

Requires these environment variables on the deploy target (Vercel/etc.):

- `ADMIN_PASSWORD` — shared password for the panel
- `GITHUB_TOKEN` — a token with `contents:write` on this repo
- `GITHUB_USERNAME` / `REPO_NAME` — this repo's owner/name
- `GITHUB_BRANCH` — optional, defaults to `main`

Each save creates one commit (via the GitHub Trees API) with all added/
deleted photos and the rewritten `src/data/portfolio.json`.

## Deploy

Configured for both Vercel (`vercel.json`, `/api` functions) and Cloudflare
Workers/Pages (`wrangler.json`, static `dist/` with SPA fallback) — pick one.

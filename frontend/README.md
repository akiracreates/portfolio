# akira portfolio

next.js app router website for akira's digital art portfolio and commission flow.

## stack

- next.js 16 (app router, turbopack, react compiler)
- react 19
- tailwind css 4
- framer-motion 11
- inter (ui) + fraunces (display) via `next/font`

## local development

```bash
npm install
npm run dev
```

open `http://localhost:3000`.

## routes

- `/` long-scroll homepage (hero, featured, about, portfolio, commissions, terms, contact)
- `/about`
- `/portfolio`
- `/commissions`
- `/contact`
- `/terms`
- `/privacy`

## environment variables

copy `.env.example` to `.env` and update values as needed:

- `NEXT_PUBLIC_APP_URL`

## deployment checklist (vercel)

1. set project root to `frontend`.
2. set `NEXT_PUBLIC_APP_URL` for production domain.
3. run `npm run build` locally before first deploy.
4. verify sitemap and robots resolve:
   - `/sitemap.xml`
   - `/robots.txt`
5. verify form endpoint:
   - `POST /api/contact`
6. run lighthouse and confirm no severe accessibility/performance regressions.

## design system

color, typography, spacing, and elevation tokens live in `src/app/globals.css`. ui primitives in `src/components/ui/` (`button`, `card`, `container`, `divider`, `eyebrow`, `heading`, `image-frame`, `section`, `badge`).

layout shell in `src/components/layout/` (`app-shell`, `sidebar`, `top-bar`, `mobile-drawer`, `footer`, `page-header`, `nav-icons`).

palette foundation: `#2B2730` / `#6554AF` / `#9575DE` / `#E966A0` — used with strict hierarchy (neutrals dominate, primary purple for default actions, secondary purple for focus rings/decoration, pink highlight reserved for one CTA per section + the hero accent word).

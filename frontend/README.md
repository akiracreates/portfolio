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

## recommended startup workflow (repo root)

from the repository root, use the startup script to sync branch state, verify merge status, clear stale next cache, and start a clean dev server:

```bash
./startup.sh
```

useful options:

```bash
./startup.sh --verify-only
./startup.sh --no-pull
./startup.sh --branch dev --expect "Fix/aboutme (#6)"
```

## post-merge troubleshooting (stale ui after pull)

if merged code appears missing locally, run:

```bash
git checkout dev
git pull origin dev
./scripts/verify-merge-state.sh --branch dev
rm -rf .next
npm run dev
```

always open the exact local url/port printed by next (3000/3001/etc).

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
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ADMIN_SPIN_EMAIL`

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

## spin wheel deployment runbook

The hidden spin flow now uses a server-authoritative begin/commit API:
- `POST /api/spin/begin` (lookup or create pending server draw)
- `POST /api/spin/commit` (finalize pending server draw + send emails)

### Required envs (Production and Preview if you test there)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`
- `EMAIL_FROM` (must be a verified Resend sender/domain)
- `ADMIN_SPIN_EMAIL`
- `NEXT_PUBLIC_APP_URL` (canonical deployed base URL)

### Quick health checks after deploy
1. `GET /api/spin` should return diagnostics with `storageConfigured: true`.
2. Submit email on hidden spin page:
   - first attempt should move to wheel
   - commit should return result and save it
3. Submit same email again:
   - should return already-spun saved reward
4. Verify delivery:
   - user email received (or explicit UI note if provider skipped)
   - admin email received at `ADMIN_SPIN_EMAIL`

### If it fails
- `503 storage_unavailable`: Upstash envs missing/invalid in active Vercel environment.
- Claim saved but no emails: verify `RESEND_API_KEY` + `EMAIL_FROM` sender verification.
- `rate_limited`: wait for limiter window or tune limits in `src/lib/server/spin-service.js`.

## design system

color, typography, spacing, and elevation tokens live in `src/app/globals.css`. ui primitives in `src/components/ui/` (`button`, `card`, `container`, `divider`, `eyebrow`, `heading`, `image-frame`, `section`, `badge`).

layout shell in `src/components/layout/` (`app-shell`, `sidebar`, `top-bar`, `mobile-drawer`, `footer`, `page-header`, `nav-icons`).

palette foundation: `#2B2730` / `#6554AF` / `#9575DE` / `#E966A0` — used with strict hierarchy (neutrals dominate, primary purple for default actions, secondary purple for focus rings/decoration, pink highlight reserved for one CTA per section + the hero accent word).

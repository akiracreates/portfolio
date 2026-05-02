# akira portfolio

production-oriented next.js app router website for akira's art portfolio and commission flow.

## local development

```bash
npm install
npm run dev
```

open `http://localhost:3000`.

## routes

- `/` long-scroll homepage
- `/about`
- `/portfolio`
- `/commissions`
- `/contact`
- `/reward`
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
6. verify one-time reward behavior:
   - first spin works
   - refresh shows already-spun state
7. run lighthouse and confirm no severe accessibility/performance regressions.

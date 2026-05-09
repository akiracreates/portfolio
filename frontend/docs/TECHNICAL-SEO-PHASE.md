# Technical SEO phase — implementation summary

Production-oriented technical SEO and App Router hardening for the portfolio frontend. Run validations against a deployment where **`NEXT_PUBLIC_APP_URL`** is the canonical HTTPS origin (not `localhost`), **`NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`** is set for ImageKit-backed OG images, and **`NEXT_PUBLIC_APP_URL`** matches the URL you paste into testing tools.

## What changed (engineering)

### Crawl and document signals

- **`proxy.js`**: For locale-prefixed paths, forwards **`x-akira-locale`** and **`x-akira-pathname`** on the incoming request (via `NextResponse.next({ request: { headers } })`) so Server Components see the URL accurately on the first byte.
- **Root [`layout.js`](../src/app/layout.js)**: `<html lang>` prefers **`x-akira-locale`**, then cookie, then default locale — fixes mismatch when `/ru/...` was rendered with `lang="en"` on cold requests.
- **`localeAlternates`** ([`page-metadata.js`](../src/lib/seo/page-metadata.js)): Adds **`x-default`** → default-locale URL (aligned with `defaultLocale` in [`config.js`](../src/lib/i18n/config.js)).
- **[`sitemap.js`](../src/app/sitemap.js)**: Adds **`x-default`** on each URL entry’s `alternates.languages` map.

### Metadata and social previews

- **OG image**: ImageKit transforms use **`ar-1.91-1`** + **`w-1200`** for a landscape OG crop; metadata dimensions **`1200×630`** match that intent. If ImageKit is unset, falls back to **`/icons/icon-512.png`** with **`512×512`** (honest dimensions).
- **Open Graph locale**: **`locale`** / **`alternateLocale`** use locale tags (**`en_US`** / **`ru_RU`**) via mapping in [`page-metadata.js`](../src/lib/seo/page-metadata.js).

### Semantic HTML

- **Commission request** ([`commissions/request/page.js`](../src/app/[locale]/commissions/request/page.js)): Section heading promoted to **`h1`** via **`headingLevel="h1"`** — one primary heading per page.

### Structured data ([`json-ld-graph.jsx`](../src/components/seo/json-ld-graph.jsx))

- **`Person`**: Stable **`@id`** `${origin}/#person`; **`url`** pinned to **`/${defaultLocale}`** to avoid entity fragmentation across locales.
- **`WebSite`**: **`publisher`** → Person; **`inLanguage`** lists both locales.
- **`WebPage`**: Per-request **`url`**, **`name`** from dictionary route titles, **`primaryImageOfPage`** aligned with OG image dimensions.
- **`BreadcrumbList`**: On **`/{locale}/commissions/request`** only (locale-aware labels).
- **`FAQPage`**: On **`/{locale}/commissions`** only; **`mainEntity`** mirrors **[`commissionFaq`](../src/lib/content/commissions.js)** with **`pickLocale`** — same copy as the visible accordion.

### Other

- **`not-found.jsx`**: Exported **`metadata.robots`** → **`noindex, nofollow`** for soft-404 edge cases.
- **`viewport`**: **`themeColor`** `#6554af` aligned with [`manifest.js`](../src/app/manifest.js).

### Heading hierarchy audit (no code edits required)

[`about-page.jsx`](../src/components/pages/about-page.jsx): **`h1`** in hero, chapter titles **`h2`** throughout — no skipped levels observed.

### Next.js 16 proxy note

This project uses **`src/proxy.js`** as the edge handler (**Proxy / Middleware** in build output). Do **not** add a separate **`src/middleware.js`** — Next.js rejects both files together.

---

## Validation checklist (staging / production URL)

Use the same canonical origin as **`NEXT_PUBLIC_APP_URL`**.

### Structured data

- [Google Rich Results Test](https://search.google.com/test/rich-results): homepage and **`/en/commissions`** — expect **WebSite**, **Person**, **WebPage**; on commissions also **FAQPage**; on **`/en/commissions/request`** also **BreadcrumbList**.
- Optional: [Schema Markup Validator](https://validator.schema.org/) with “View Page Source” JSON-LD snippet.

### hreflang and canonical

- View HTML source on **`/en/portfolio`** and **`/ru/portfolio`**: `<link rel="canonical">`, **`alternate` hreflang** including **`x-default`**.

### Social previews

Re-scrape after deploy (platforms cache aggressively):

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- X/Twitter card preview tools (where still available)
- Spot-check Discord / Telegram / WhatsApp with the live URL

### Robots and sitemap

- **`/robots.txt`**: allows indexable routes; **`/spin`** disallowed.
- **`/sitemap.xml`**: entries include **`en`**, **`ru`**, **`x-default`** alternates; spin omitted.

### HTML language

- Request **`/ru/...`** without prior **`NEXT_LOCALE`** cookie: `<html lang="ru">` on first response.

### Lighthouse

- Run **SEO** category on home, portfolio, commissions (mobile + desktop); confirm no regressions vs prior baseline ([`LIGHTHOUSE-COMPARISON.md`](./LIGHTHOUSE-COMPARISON.md)).

---

## Known limitations and backlog

- **Portfolio `ItemList` / `VisualArtwork`**: Not added — avoids large graphs and URL policies per artwork until stable public URLs are decided.
- **Per-route OG art**: All indexable pages still share the default portrait OG image (high quality, consistent branding); category-specific OG is optional polish.
- **`NEXT_PUBLIC_APP_URL`**: If mis-set to `localhost` in production, canonicals, JSON-LD, and fallbacks degrade — enforce in deployment checks.
- **OG fallback (`icon-512`)**: Square asset is valid but less ideal than a dedicated **`1200×630`** raster under `public/` if ImageKit is ever unavailable.
- **Analytics**: Third-party scripts may continue to affect Lighthouse “Best practices”; unrelated to this SEO pass.

---

## Architecture quality (Next.js App Router)

- **Static locale params**: [`generateStaticParams`](../src/app/[locale]/layout.js) for **`en`** / **`ru`**.
- **Metadata API**: Per-route **`generateMetadata`** + shared **`buildPageMetadata`**.
- **`robots` / `sitemap` / `manifest`**: Metadata routes + root metadata **`metadataBase`**.
- **Edge proxy**: Locale redirect + cookie + SEO request headers in one module ([`proxy.js`](../src/proxy.js)).

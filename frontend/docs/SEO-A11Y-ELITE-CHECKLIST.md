# Elite SEO & accessibility verification checklist

Run against **production or preview URL** with canonical `NEXT_PUBLIC_APP_URL` set.

## SEO / sharing

- [ ] **Rich Results Test**: paste homepage URL — validate `Person` / `WebSite` graph from [`JsonLdGraph`](frontend/src/components/seo/json-ld-graph.jsx).
- [ ] **Google Search Console** URL Inspection (if configured): canonical `https://…/en/…` vs `…/ru/…`.
- [ ] **Facebook Sharing Debugger** (Meta): OG title/description/image from [`buildPageMetadata`](frontend/src/lib/seo/page-metadata.js).
- [ ] **Twitter/X Card preview**: summary_large_image fields resolve (many tools deprecated — use social debugger where available).
- [ ] Spot-check **`/sitemap.xml`**: entries include `alternates.languages` per locale; spin excluded from indexing via robots rules + metadata where applicable.
- [ ] **`/robots.txt`**: `Allow` / spin disallow unchanged intent.

## Accessibility (beyond Lighthouse)

- [ ] **Keyboard**: Tab through mobile drawer ([`mobile-drawer.jsx`](frontend/src/components/layout/mobile-drawer.jsx)) — focus trap and Escape.
- [ ] **FAQ**: expand/collapse — verify `aria-expanded`, `aria-controls`, panel `id` linkage ([`faq-accordion.jsx`](frontend/src/components/commissions/faq-accordion.jsx)).
- [ ] **Carousel**: keyboard arrows when region focused ([`commission-preview-carousel.jsx`](frontend/src/components/commissions/commission-preview-carousel.jsx)).
- [ ] **Touch**: FAB + drawer panel scroll — `overscroll-contain` / `touch-pan-y` on drawer panel.
- [ ] **Reduced motion**: OS setting → route fades / carousel intro animations collapse via global [`globals.css`](frontend/src/app/globals.css) rules + [`useNativeReducedMotion`](frontend/src/lib/motion/use-native-reduced-motion.js).

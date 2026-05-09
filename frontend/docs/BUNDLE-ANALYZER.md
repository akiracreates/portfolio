# Bundle analyzer (`@next/bundle-analyzer`)

Run from `frontend/`:

```bash
npm run analyze   # ANALYZE=true next build --webpack
```

Reports are written to [`.next/analyze/`](../.next/analyze/) (`client.html`, `nodejs.html`, `edge.html`). Open `client.html` in a browser for the treemap.

## Initial observations (post-refactor build)

- The largest **client** artifact is the shared framework/polyfill chunk (`static/chunks/*826*` order-of-magnitude ~220 KB parsed / ~60 KB gzip in one sampled build). That slice includes Next client runtime and shared dependencies — expected for App Router + React 19.
- **`framer-motion`** remains in bundles pulled by interactive islands ([`AppShell`](../src/components/layout/app-shell.jsx), accordions, spin UI, carousels). After this pass it is **no longer** pulled by [`Section`](../src/components/ui/section.jsx), removed `PageTransition`, or [`ArtworkCard`](../src/components/gallery/artwork-card.jsx) / [`ArtworkRow`](../src/components/gallery/artwork-card.jsx) — shrinking hydration scope on portfolio/home shells.
- **`next/dynamic`** was not applied to primary content routes (SEO-sensitive); further reductions should target **shell motion** (sidebar width) or low-index routes (e.g. spin) if analyzer shows outsized motion chunks.

Webpack mode is required for `@next/bundle-analyzer`; default `next build` uses Turbopack and skips these HTML reports.

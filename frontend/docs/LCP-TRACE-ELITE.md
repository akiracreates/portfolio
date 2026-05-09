# LCP trace — elite pass

## Lab snapshots (Lighthouse 11, mobile emulation, simulated throttling)

Recorded against `next start` on localhost during implementation:

| Route | LCP (ms) | Notes |
|-------|-----------|--------|
| `/en` | ~3945 | Lighthouse audit **“largest-contentful-paint-element”** errored in headless CLI on Node 22 builds — element selector unavailable in JSON export. |
| `/en/portfolio` | ~3204 | Same limitation for automated DOM node capture. |
| `/en/commissions` | ~4559 | Same limitation. |

## Manual verification protocol (Chrome)

Use DevTools **Performance**, enable **Web Vitals** markers (or **Lighthouse → View Trace**):

1. Device toolbar: mobile handset preset (e.g. Pixel / iPhone width).
2. CPU throttle **4×–6×**.
3. Record reload → identify **LCP marker** and bottom-panel **LCP node**.
4. **Network**: inspect winning ImageKit URL (`tr=w-*`) vs [`sizes`](frontend/src/components/sections/hero-section.jsx) / [`imageKitLoader`](frontend/src/lib/images/imagekit-loader.js).

## Code-aligned hypotheses & mitigations applied

| Route | Likely LCP candidate | Mitigation this pass |
|-------|---------------------|----------------------|
| Home | Hero portrait **or** hero typography when portrait below fold | **CSS order** `max-lg:order-first` on portrait column so art paints earlier on narrow screens while SR DOM order keeps copy first; **server `HeroPortraitImage`** removes client skeleton hydration on hero; **tighter `sizes`** string for viewport breakpoints; **`quality={85}`** via loader. |
| Portfolio | Page header vs first artwork grid | Framer removed from category swap (**CSS** `.motion-crossfade-enter`) → less main-thread work before paint. |
| Commissions | Intro typography vs offer carousels | **`dynamic()`** carousel chunk split + **`randomizeInitial={false}`** + carousel slide **CSS fade** + **`showSkeleton={false}`** on carousel tiles → fewer competing requests/decodes at `#offers`. |

Re-run traces after deploy on **staging/production URL** for realistic CDN latency.

# Remaining bottlenecks after elite pass

What is **fundamentally bounded** now vs average portfolios:

1. **Network RTT + TLS** to ImageKit for above-the-fold hero — partially mitigated via [`preconnect`](frontend/src/app/layout.js), responsive `w-*`, tuned `sizes`.
2. **Desktop sidebar width animation** — implemented as **CSS `transition` on `width`** ([`app-shell.jsx`](frontend/src/components/layout/app-shell.jsx)); still **layout-affecting** (not GPU-only). A fully overlay-only sidebar would trade overlay clipping complexity for zero layout thrash.
3. **`Sidebar` internals** — still use Framer Motion for nav polish ([`sidebar.jsx`](frontend/src/components/layout/sidebar.jsx)); removing it requires a dedicated visual redesign pass.
4. **Mobile drawer** — still Framer translate + backdrop ([`mobile-drawer.jsx`](frontend/src/components/layout/mobile-drawer.jsx)); motion is transform-based (reasonable cost).
5. **Forms / spin UX** — [`contact-form.jsx`](frontend/src/components/forms/contact-form.jsx) and spin flows retain Framer where interaction density is highest.
6. **Analytics scripts** — third-party execution on main thread (bounded by vendor).

## What separates this site from “average” portfolios

- Server-first hero image path (**no client skeleton** on primary artwork).
- ImageKit integration with **explicit responsive widths** via Next `loader`.
- **CSS-first** decorative transitions on portfolio tabs + commission carousel slides + FAQ expansion.
- **Code-split** commission carousel bundle (`dynamic`) + deterministic carousel ordering for predictable network profiles.
- Structured metadata + JSON-LD + manifest/icons already in place from prior phase.

# Delivery & telemetry — elite notes

## ImageKit

- Transform URLs are centralized in [`imagekit-loader.js`](frontend/src/lib/images/imagekit-loader.js); cache keys vary by full query string — avoid redundant `tr` permutations in content.
- Confirm **cache TTL** / **browser caching** behavior in the ImageKit dashboard for production traffic.

## Vercel static assets

[`vercel.json`](frontend/vercel.json) sets **long-cache immutable** for `/icons/*`. Next.js emits hashed `_next/static` assets automatically.

## Resource hints

[`layout.js`](frontend/src/app/layout.js) issues **preconnect** + **dns-prefetch** to ImageKit (when env present) and Vercel analytics hosts. Revisit if CDN hostname or telemetry endpoints change.

## Vercel Analytics / Speed Insights

`@vercel/analytics` and `@vercel/speed-insights` **do not expose a documented “defer until idle” prop** on the React components in current typings. They remain mounted in the root layout for production telemetry; expect minor Lighthouse **Best Practices** tradeoffs vs third-party scripts — acceptable for ops visibility.

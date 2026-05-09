# Lighthouse comparison (mobile emulation)

Runs: Lighthouse 11, mobile preset, **before** = initial codebase session / **after** = post-optimization build served via `next start`.

## Home /en

| Metric | Before | After | Δ |
| --- | --- | --- | --- |
| Performance | 84 | 90 | +6 |
| SEO | 100 | 100 | 0 |
| Accessibility | 95 | 95 | 0 |
| Best practices | 100 | 96 | -4 |
| LCP (ms) | 4593 | 3649 | -944 |
| FCP (ms) | 912 | 1224 | +312 |
| CLS | 0 | 0 | 0 |
| TBT (ms) | 34 | 49 | +15 |
| Speed Index (ms) | 1707 | 2010 | +303 |

## Portfolio

| Metric | Before | After | Δ |
| --- | --- | --- | --- |
| Performance | 95 | 93 | -2 |
| SEO | 100 | 100 | 0 |
| Accessibility | 93 | 93 | 0 |
| Best practices | 100 | 96 | -4 |
| LCP (ms) | 2890 | 3173 | +283 |
| FCP (ms) | 909 | 1058 | +149 |
| CLS | 0 | 0 | 0 |
| TBT (ms) | 32 | 34 | +2 |
| Speed Index (ms) | 1466 | 1342 | -124 |

## Commissions

| Metric | Before | After | Δ |
| --- | --- | --- | --- |
| Performance | 75 | 88 | +13 |
| SEO | 100 | 100 | 0 |
| Accessibility | 96 | 96 | 0 |
| Best practices | 100 | 96 | -4 |
| LCP (ms) | 15673 | 3979 | -11694 |
| FCP (ms) | 1057 | 1060 | +3 |
| CLS | 0 | 0 | 0 |
| TBT (ms) | 47 | 30 | -17 |
| Speed Index (ms) | 1929 | 1060 | -869 |

## Interpretation

- **ImageKit loader + responsive `w-*`** tends to reduce **LCP** on cellular by shrinking decoded pixels on narrow viewports (home **LCP −944 ms**, commissions **LCP −11694 ms** in this lab run — commissions improved sharply once hero/grid images respect viewport width).
- Removing Framer from **Section**, **route transitions**, and **featured/portfolio cards** reduces hydration work on content-heavy routes (commissions **TBT −17 ms**, performance score **+13** here).
- **Best practices −4** is consistent with adding **Vercel Analytics / Speed Insights** (third-party scripts / cookies under strict Lighthouse rules). Accept for production telemetry or gate scripts behind environment if you need a “clean” lab score.
- **Real-world mobile** gains depend on device tier and RTT to ImageKit/Vercel; lab deltas are directional, not guarantees.

---

## Elite refinement snapshot (perf-only, May 2026)

Second-wave changes (CSS motion swaps, server hero image, dynamic commission carousel, sidebar CSS transition). Lighthouse 11 **performance category only**, mobile emulation, simulated throttle, **single run each** — treat as directional; repeat medians for decisions.

| Route | Performance | LCP (ms) | TBT (ms) |
| --- | --- | --- | --- |
| `/en` | 88 | 3107 | 279 |
| `/en/portfolio` | 93 | 3187 | 23 |
| `/en/commissions` | 86 | 4254 | 23 |

Home **TBT** can spike in isolated lab runs (CPU scheduling, cache warmth). Prefer **three-run median** on staging/production URLs before drawing conclusions.

For **bundle deltas** after motion refactors, run `npm run analyze` (webpack + `@next/bundle-analyzer`) and compare `.next/analyze/client.html` against prior snapshots.

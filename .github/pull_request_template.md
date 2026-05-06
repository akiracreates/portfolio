## Summary

- What changed and why:
- Any user-visible impact:

## Risk Profile

- [ ] Low risk (isolated files/components)
- [ ] Medium risk (shared components/styles touched)
- [ ] High risk (global styles/layout/runtime behavior touched)

## Changed Files by Area

- `frontend/src/app/globals.css`:
- Shared UI primitives (`frontend/src/components/ui/*`):
- Page-level components (`frontend/src/components/pages/*`):
- Route files (`frontend/src/app/[locale]/**`):
- Data/config files (`frontend/src/lib/**`):

## Global CSS Selectors Touched

List all modified selectors from `frontend/src/app/globals.css`:

- 

## Verification Checklist

- [ ] I ran `npm run lint` in `frontend`.
- [ ] I ran `npm run build` in `frontend`.
- [ ] Desktop screenshots attached for changed views.
- [ ] Mobile screenshots attached for changed views.
- [ ] Category tabs/navigation behavior verified if touched.
- [ ] Divider/frame/hover behavior verified if touched.
- [ ] Hash/deep-link behavior verified if touched.

## Merge Hygiene

- [ ] I reviewed the final PR diff as the source of truth.
- [ ] I did not leave known conflicting style rewrites in this PR.
- [ ] If `globals.css` changed significantly, I confirmed expected side effects.
- [ ] I acknowledge post-merge local sync steps:
  - `git checkout dev`
  - `git pull origin dev`
  - `rm -rf frontend/.next`
  - `cd frontend && npm run dev`
  - open the exact URL/port printed by Next.

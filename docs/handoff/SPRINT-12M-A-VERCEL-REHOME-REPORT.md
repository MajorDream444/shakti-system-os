# Sprint 12M-A - remote deployment acceptance

Date: 2026-09-19  |  Disposition: **HOLD / NOT CLOSED**

## What was verified

The GitHub `main` ref is `de2a9f7d4b083cbe8a9b8851a0c410ee21686041`. GitHub records a successful September 18 Vercel deployment status under `hamal-agi/shakti-system-os` with deployment ID `9FX5YH5aogC4Xb9QQQgp47H7dWhd`. Root `vercel.json` defines the intended `./`-root build, `apps/web/dist` output, and SPA rewrites; root `/api` functions are present. The separate authority record is `docs/infrastructure/VERCEL-DEPLOYMENT-AUTHORITY-2026-09-19.md`.

## Acceptance blocker

This deployed `main` commit is **not** the locally verified Sprint 12L application. On `origin/main`, current runtime source still contains `Shri Shakti Shala` across Home, Begin, Offerings, Shala, and DWD. The founder red prayer-hands derivative is absent from the `main` tree, and Home's `PortalImageSlots.tsx` still uses the earlier founder portrait. The 12L report records its corrected `Sri` spelling and selected image as **uncommitted** work atop the 12J/12K visual branch. A successful deploy of `de2a9f7` therefore cannot pass 12L identity or visual-regression acceptance. This is a source comparison, not a claim to have seen the protected remote rendering.

The new deployment dashboard redirected to login. A candidate `hamal-agi` alias responded HTTP 302 to Vercel SSO for `/`, `/begin`, `/dancing-with-durga`, `/shala`, `/offerings`, `/about-sheetal`, `/testimonials`, `/api/begin/complete`, and `/api/request-signal`. That is an access gate, **not** proof of an application HTTP failure or successful rewrite. It prevented browser/asset/mobile/console/visual/API acceptance and a remote Playwright run. No POST, seeker record, or production write was attempted. The exact alias-to-deployment binding, new project/team IDs, and dashboard overrides remain unverified.

## Acceptance matrix

| Gate | Result | Evidence / limit |
| --- | --- | --- |
| New Vercel authority | PARTIAL | GitHub success status names `hamal-agi`; dashboard login blocks project/account ID confirmation. |
| GitHub source | VERIFIED | `origin/main` is `de2a9f7`; status is attached to that commit. |
| Deployed commit | PARTIAL | GitHub status ties deployment ID to `de2a9f7`; Vercel source view inaccessible. |
| Remote routes | NOT VERIFIED | All tested candidate-alias paths redirect to Vercel SSO. |
| Remote assets | NOT VERIFIED | JS, CSS, images, and fonts could not be loaded unauthenticated. |
| Remote visual regression | FAIL | Deployed source omits accepted 12L changes; rendered comparison blocked. |
| API safe-fail behavior | NOT VERIFIED | GET is intercepted by SSO; no unsafe POST or credential entry. Source functions allow POST only, but remote behavior is untested. |
| Remote test suite | NOT RUN | Protected target and unconfirmed exact deployment URL. Local 70/70 baseline is prior evidence, not a remote result. |
| Sri identity | FAIL | `origin/main` still contains current public `Shri Shakti Shala` strings. |
| Old Vercel dependency | LIST | Stale root and `apps/web` local CLI links point to legacy project/org; current CLI cannot inspect `hamal-agi`. |
| Domain cutover | NOT PERFORMED | No DNS changes. |
| Stripe activation | NOT PERFORMED | No commerce changes. |

## Next gate

Keep Sprint 12M-A open. First reconcile and review the 12K/12L work onto an exact clean source SHA, preserving the dirty local worktree and historical wording. Separately, obtain authorized new-account dashboard/CLI access or an explicitly shareable deployment URL so the project IDs, overrides, deployed SHA, routes, assets, responsive browser behavior, and credential-free API failure mode can be tested. Do not disable deployment protection just to pass acceptance. Repeat remote acceptance against the exact reviewed SHA before any 12M-B enrollment or commerce work. No new deployment, DNS change, Stripe action, commit, or cleanup was performed in this audit.

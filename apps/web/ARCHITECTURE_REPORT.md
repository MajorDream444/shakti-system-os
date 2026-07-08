# Shakti Portal Architecture Report

Date: 2026-07-08

## Scope

Converted the current Shakti Portal web prototype into a production-ready application foundation without changing the visual design, sanctuary language, section order, or current interactions.

## Files Changed

- `src/components/*`: kept the existing UI components and moved side effects, state mutations, constants, and copy lookups out of component bodies.
- `src/constants/animation.ts`: centralizes animation thresholds, counts, and reveal timing values.
- `src/constants/navigation.ts`: centralizes section anchors, nav items, nav targets, and contact href.
- `src/constants/storage.ts`: reserves typed localStorage keys for future persistence.
- `src/data/goddesses.ts`: holds Shakti/goddess-adjacent method, ritual, and transition copy.
- `src/data/practices.ts`: holds practice pillars, readiness map, pathway steps, and final CTA copy.
- `src/data/retreats.ts`: holds retreat vision content and imagery.
- `src/data/portalCopy.ts`: remains as a compatibility composition layer for the UI.
- `src/hooks/*`: isolates scroll state, body scroll lock, hero parallax, readiness plane progress, and ember generation.
- `src/services/PersistenceService.ts`: owns all localStorage reads, writes, and removals.
- `src/services/RitualService.ts`: owns sanctuary menu state transitions and ember generation.
- `src/services/AccessService.ts`: establishes a future Initiation Key access boundary.
- `src/types/*`: adds content, ritual, and access contracts.
- `eslint.config.js`, `package.json`, `package-lock.json`: adds and verifies the lint contract.
- `graphify-out/*`: refreshed with `graphify update .`.

## Architecture Improvements

- Components are now mostly presentational and no longer own reusable browser effects or data collections.
- Local persistence has a single service boundary, ready for future environmental memory without scattering `localStorage` calls.
- Sanctuary state mutations are routed through `RitualService`, giving future room/state logic a stable home.
- Initiation Key access has a service boundary without adding a gate or changing user flow.
- Hardcoded practice, goddess/method, and retreat content now lives in typed data modules.
- Navigation anchors, contact href, animation timings, and storage keys are typed constants instead of repeated strings/numbers.
- Lint, TypeScript, build, and Graphify refresh are now part of the app foundation.

## Verification

- `npx tsc -b`: passed.
- `npm run build`: passed.
- `npm run lint`: passed.
- `graphify update .`: passed.

## Technical Debt Remaining

- There are no automated visual regression tests yet, so no-UX-change verification is based on structural preservation and build/lint/type checks.
- The app still uses remote Unsplash URLs directly in data; production should decide whether to pin, proxy, or self-host imagery.
- `AccessService` is intentionally non-invasive; it does not enforce Initiation Keys until that feature is explicitly approved.
- `PersistenceService` is ready, but no current UI flow calls it because the prototype had no existing localStorage behavior.
- There is no component test suite yet.

## Risks

- `npm audit` reports 3 dependency advisories: `@babel/core` low, `esbuild` low, and `vite` high. Fixes are available with `npm audit fix`, but that should be reviewed before changing dependency versions.
- Graphify now indexes more of the broad Shakti workspace, including transcripts and docs, so future codebase queries should still verify app-specific claims against `apps/web/src`.

## Recommended Next Sprint

1. Add a visual smoke test for desktop and mobile to protect the sanctuary design during future architecture work.
2. Decide the Initiation Key contract before wiring access enforcement.
3. Add focused unit tests for `PersistenceService`, `RitualService`, and `AccessService`.
4. Review and apply dependency security updates in a controlled package-maintenance pass.
5. Consider moving production imagery into a managed asset strategy if this app is heading toward live deployment.

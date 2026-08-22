# Sprint 12C — Living Front Door Implementation Report

Date: 2026-08-22
Branch: `codex/sprint-12c-living-front-door-implementation`
Base: `origin/main` at `018151d`
Status: Implementation complete on branch; VERCEL PREVIEW deployed and awaiting protected-access visual review.

## Scope

Sprint 12C implemented the closed living-front-door decisions from:

- `/Users/majordreamwilliams/Downloads/Sprint 12C - Wireframes & Codex Contract.html`
- `/Users/majordreamwilliams/Downloads/Sprint 12C - Codex Implementation Contract (1).html`
- `/Users/majordreamwilliams/.codex/attachments/0bb6442e-b60d-4e54-912f-c6d4d97345cb/pasted-text.txt`

This was a visual/UX implementation sprint only. It did not modify the First Living Seeker backend architecture, Airtable write boundary, production write state, or release governance.

## Skills Activated

- `ui-ux-pro-max`: responsive navigation, modal interaction, keyboard/focus recovery, mobile ergonomics.
- `design-taste-frontend`: composition, hierarchy, restraint, typography, motion cadence, avoiding templated visual noise.

These skills advised implementation quality only. They did not supersede the frozen Shakti experience contract, canonical vocabulary, founder review gates, or backend security boundaries.

## Implemented Closed Decisions

### D-1 Typography

- Set public app sans stack to `Manrope`.
- Preserved `Cormorant Garamond` as the display/editorial/sacred face.
- Removed the old Inter Google Font load from the Vite app shell.
- Updated `docs/design/motion-study.html` so the review prototype no longer reintroduces Inter where the frozen contract superseded it.

### D-2 Vault 7 Token Reconciliation

- Preserved `--rajas-red: #9d171d`.
- Updated ember to `#C35A2E`.
- Updated luminous pink to `#E5849B`.
- Updated muted gold to `#E9C77E`.
- Updated leaf green to `#8FB27A`.
- Retained devotional red as punctuation, not the continuous dominant field.
- Updated `docs/doctrine/SHAKTI-COLOR-DOCTRINE.md` for the active token corrections.

### D-3 Motion Cadence

- Added `--breath-paced: 5500ms`.
- Added `--breath-ambient: 9000ms`.
- Removed decorative particles/sparks from the Begin ambient canvas, Threshold screen, Shala environmental canopy, and motion-study prototype.
- Retained slow breath, water, and candlelight fields.
- Shortened the knowledge chamber fade to `260ms` after Playwright evidence showed slower opacity caused temporary mobile text competition.

### Public Front Door

- Added the two explicit public journeys near the top of `/`:
  - `Explore This Work`
  - `Start Your Shakti Path`
- Added `Explore` to public navigation and routed it to the knowledge doorway section.
- Kept `Start Your Shakti Path` as the primary Begin doorway.
- Preserved the existing founder section and real approved Sheetal photograph.
- Removed unverified founder credential/training claims from the public founder biography while preserving the safe founder bridge language already approved for this cycle.

### Knowledge Chamber Model

Created reusable public knowledge doorway data and a full-screen modal chamber component for:

- Neuroscience
- Somatics
- Shadow Work
- Classical Shakti Tantra
- Diaspora Identity
- Retreat Practice

Each chamber includes:

- Summary
- Deeper explanation
- Why it matters
- Example
- From Sheetal
- Connected to
- Continue / next doorway action
- Return / close action

The chamber does not render internal contract rows, unresolved-question badges, designer annotations, or approval-status labels.

### Method Activation

- Converted the Method visual doorway into an interactive chamber trigger.
- Avoided painted-door literalism.
- Preserved the existing public method section while adding an explicit deeper state.

### Pathway Activation

Converted the public pathway cards into interactive doorways for:

- Self-Audit
- Community
- Container
- Retreat

The implementation explains the doors without granting access, creating payments, writing Access Grants, or implying retreat readiness.

### Public Readiness Map

- Reframed the visible `Readiness Map` as `Public Readiness Map`.
- Changed the visible state label to `Illustrative only`.
- Added public copy: `This is an illustration, not you. It does not score, rank, or diagnose a seeker.`
- Removed dashboard-like class naming from the visible implementation surface.
- Did not create any scoring/ranking/personal readiness claim on `/`.

### Symbols

- Preserved the yoni triangle as threshold/Shakti language where already used.
- Corrected source comment language so it is not treated as a Shri Yantra.
- Did not implement a production Shri Yantra because full geometry and founder approval remain required before release use.
- Kept Shri Yantra as a knowledge-chamber symbolic reference only, with public copy noting that full geometry and founder review are required before release.

## Files Changed

- `apps/web/index.html`
- `apps/web/e2e/sprint12c-living-front-door.spec.ts`
- `apps/web/src/begin/begin.css`
- `apps/web/src/begin/components/AmberSanctuaryCanvas.tsx`
- `apps/web/src/begin/components/KaliSigil.tsx`
- `apps/web/src/begin/components/Screens/Threshold.tsx`
- `apps/web/src/components/AuthorityStrip.tsx`
- `apps/web/src/components/Hero.tsx`
- `apps/web/src/components/KnowledgeChamber.tsx`
- `apps/web/src/components/Pathway.tsx`
- `apps/web/src/components/Philosophy.tsx`
- `apps/web/src/components/ReadinessMap.tsx`
- `apps/web/src/components/TransitionQuote.tsx`
- `apps/web/src/constants/navigation.ts`
- `apps/web/src/data/livingDoorways.ts`
- `apps/web/src/data/portalCopy.ts`
- `apps/web/src/data/practices.ts`
- `apps/web/src/shala/components/EnvironmentalCanopy.tsx`
- `apps/web/src/shala/shala.css`
- `apps/web/src/styles/globals.css`
- `apps/web/src/types/content.ts`
- `docs/design/motion-study.html`
- `docs/doctrine/SHAKTI-COLOR-DOCTRINE.md`
- `docs/handoff/SPRINT-12C-LIVING-FRONT-DOOR-IMPLEMENTATION-REPORT.md`

Excluded:

- `.codex/environments/environment.toml` is an autogenerated local Codex environment file and is not part of the release candidate.

## Backend Behaviors Preserved

Sprint 12C did not modify:

- `/api/begin/complete`
- `/api/request-signal`
- server-derived pathway assignment
- consent boundary
- anonymous/no-contact local-only journey
- idempotency strategy
- Airtable server-write adapter
- Access Grant creation rules
- Initiation Key boundaries
- Environmental Memory boundaries
- Retreat Application boundaries
- private Reflection boundaries
- payment/deposit boundaries

Production Begin writes remain disabled and governed separately.

## Responsive QA Evidence

Playwright captured evidence from the rebuilt local preview at `http://127.0.0.1:4173`.

After screenshots:

- `/` dual front door desktop:
  - `apps/web/test-results/e2e-sprint12c-living-front-73770--without-public-annotations/desktop-01-dual-front-door.png`
- `/` knowledge doorways desktop:
  - `apps/web/test-results/e2e-sprint12c-living-front-73770--without-public-annotations/desktop-02-knowledge-doorways.png`
- Method chamber desktop:
  - `apps/web/test-results/e2e-sprint12c-living-front-73770--without-public-annotations/desktop-03-method-chamber.png`
- Pathway doorways desktop:
  - `apps/web/test-results/e2e-sprint12c-living-front-73770--without-public-annotations/desktop-04-pathway-doorways.png`
- Public Readiness Map desktop:
  - `apps/web/test-results/e2e-sprint12c-living-front-73770--without-public-annotations/desktop-05-readiness-map.png`
- `/` mobile front door:
  - `apps/web/test-results/e2e-sprint12c-living-front-eddf0--usable-and-annotation-free/mobile-01-front-door.png`
- Knowledge chamber mobile:
  - `apps/web/test-results/e2e-sprint12c-living-front-eddf0--usable-and-annotation-free/mobile-02-knowledge-chamber.png`
- Public Readiness Map mobile:
  - `apps/web/test-results/e2e-sprint12c-living-front-eddf0--usable-and-annotation-free/mobile-03-readiness-map.png`

Before-state reference:

- Sprint 12B evidence remains the comparative baseline: `docs/handoff/SPRINT-12B-EXPERIENCE-EVIDENCE-PASS.md`.
- This sprint did not create a separate committed before-image package; the before/after comparison should use Sprint 12B report evidence plus the 12C Playwright screenshots above.

## Verification Results

Passed:

- `npm run lint`
- `npm run build`
- `npm run check:backend`
- `npm run check:begin-write`
- `npm run check:vault`
- `npm audit --audit-level=moderate`
- `npx playwright test e2e/begin-qa.spec.ts --reporter=line`
- `npx playwright test e2e/sprint12a-visual-review.spec.ts --reporter=line`
- `npx playwright test e2e/sprint12c-living-front-door.spec.ts --reporter=line`
- Built asset secret scan for Airtable PAT/env names returned no matches in `apps/web/dist`.

Boundary scan note:

- `rg` still finds `access rules` in `apps/web/src/constants/airtableSchema.ts`, which is internal schema documentation, not seeker-facing UI. The 12C Playwright spec separately verifies that visible public page text does not expose internal contract/review language.

Graphify:

- `graphify update .` was attempted with a 45-second bound.
- Result: `GRAPHIFY_TIMEOUT_AFTER_SECONDS=45`.
- Classification: existing maintenance blocker, not a runtime dependency and not a release blocker for this visual implementation PR.

## Not Implemented Yet

- Production Shri Yantra rendering: requires full geometry and founder approval.
- Founder-dependent direct quotes for chambers: preserved safe existing language rather than inventing.
- Deeper Diaspora chamber source material: implemented safe shell only; needs founder/source expansion later.
- S-00/S-01/S-02/S-03 final photography placements: image slots remain swappable; only currently approved/committed assets were used.
- Final human art-direction judgment: Playwright verifies intent/evidence, but the taste gate remains human visual review.

## Vercel Preview

VERCEL PREVIEW:

- URL: `https://shakti-system-f37i46lzi-major-hanzoais-projects.vercel.app`
- Deployment ID: `dpl_yL5b96KnfVXeKzmGyB5bX8qutQwY`
- Source branch: `codex/sprint-12c-living-front-door-implementation`
- Source commit: `21f6efd`
- Target: `preview`
- Status: `READY`
- API functions included:
  - `api/begin/complete`
  - `api/request-signal`

Preview access note:

- The deployment is behind Vercel Deployment Protection.
- Unauthenticated browser/API smoke checks returned the protected access surface (`401` for API routes).
- The Vercel share-link tool could not mint a temporary bypass URL for this deployment.
- Local rebuilt-preview Playwright QA is therefore the complete browser evidence for this branch until a human opens the protected VERCEL PREVIEW or provides a temporary bypass.

VERCEL PRODUCTION:

- Not changed.
- Production Begin writes remain disabled.
- No production promotion was performed.

## Release Recommendation

Recommend human visual review on VERCEL PREVIEW before merge.

Do not merge automatically.
Do not promote to VERCEL PRODUCTION from this sprint without explicit human approval.

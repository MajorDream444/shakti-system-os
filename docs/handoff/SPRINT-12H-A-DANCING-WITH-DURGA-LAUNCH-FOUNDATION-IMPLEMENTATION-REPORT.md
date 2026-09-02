# Sprint 12H-A - Dancing with Durga Launch Foundation Implementation Report

Date: 2026-09-03

Branch: `codex/sprint-12g-founder-method-stranger-clarity`

Base implementation SHA before this pass: `0a463683f11cb32941d49071e3437b90fac6a924`

Origin main during verification: `3b2401f39d079c32d0888b9e9ff91c87b37ae7a4`

Status: IMPLEMENTED FOR HUMAN REVIEW

## Scope

Sprint 12H-A created the launch-foundation layer for the founder-confirmed Navratri offer:

`Dancing with Durga: Devotion with a Spine`

This pass implements campaign truth, launch copy, visual direction, key-art framework, carousel copy, Story copy, launch-page surface, social-team handoff, and the Dancing with Durga Campaign Source Pack.

This pass does not implement commerce, registration, participant operations, Shala membership automation, Access Grants, Airtable writes, Stripe, checkout, production writes, or Sprint 12H-B/C/D.

## Founder Source Applied

Primary current authority:

- `docs/founder-source/FOUNDER-SOURCE-DANCING-WITH-DURGA-2026-09-03.md`
- `docs/founder-source/FOUNDER-SOURCE-COMMERCE-ACCESS-REFINEMENT-2026-09-03.md`

The campaign title is treated as:

`FOUNDER CONFIRMED - Sept. 3`

Campaign language:

`Durga. Devotion. Dharma.`

The generated visual example supplied by Major is treated as reference atmosphere only, not approved production sacred imagery.

## Implementation Summary

Created the public preview route:

- `/dancing-with-durga`

The route presents:

- founder-confirmed title and subtitle
- emotional campaign spine
- nine-night / five-live-gathering structure
- live gate schedule
- investment and accessibility notes
- Shakti Shala doorway framing
- visual direction and asset boundary
- safe CTA to request details through the existing Begin path

The public CTA remains interest / request-details oriented. No fake registration, checkout, payment, or automated Shala access is exposed.

## Campaign Source Pack

Created:

- `docs/campaigns/dancing-with-durga/source-pack/README.md`
- `docs/campaigns/dancing-with-durga/source-pack/OFFER-CONTRACT.md`
- `docs/campaigns/dancing-with-durga/source-pack/MESSAGE-PILLARS.md`
- `docs/campaigns/dancing-with-durga/source-pack/VISUAL-DIRECTION.md`
- `docs/campaigns/dancing-with-durga/source-pack/CAROUSEL-COPY.md`
- `docs/campaigns/dancing-with-durga/source-pack/STORY-COPY.md`
- `docs/campaigns/dancing-with-durga/source-pack/CAPTION-DRAFT.md`
- `docs/campaigns/dancing-with-durga/source-pack/LAUNCH-PAGE-COPY.md`
- `docs/campaigns/dancing-with-durga/source-pack/ASSET-REQUIREMENTS.md`
- `docs/campaigns/dancing-with-durga/source-pack/SOCIAL-TEAM-HANDOFF.md`
- `docs/campaigns/dancing-with-durga/source-pack/PROVENANCE.md`

Purpose:

`Founder Source -> Canonical Campaign Truth -> Campaign Source Pack -> Design/Social Production -> Sheetal Review -> Publish`

## Files Changed

Application:

- `apps/web/src/App.tsx`
- `apps/web/src/components/DancingWithDurgaPage.tsx`
- `apps/web/src/constants/navigation.ts`
- `apps/web/src/data/dancingWithDurga.ts`
- `apps/web/src/styles/globals.css`

Tests:

- `apps/web/e2e/sprint12f-founder-acceptance.spec.ts`
- `apps/web/e2e/sprint12g-stranger-clarity.spec.ts`
- `apps/web/e2e/sprint12h-a-dancing-with-durga.spec.ts`

Doctrine, reconciliation, sprint, campaign, and roadmap docs:

- `docs/founder-source/`
- `docs/campaigns/dancing-with-durga/source-pack/`
- `docs/handoff/FOUNDER-CORRECTION-PRIVATE-WORK-CONTAINERS-2026-09-01.md`
- `docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md`
- `docs/sprints/SPRINT-12G-FOUNDER-METHOD-STRANGER-CLARITY-PLAN.md`
- `docs/sprints/SPRINT-12H-A-DANCING-WITH-DURGA-LAUNCH-FOUNDATION-PLAN.md`
- `docs/sprints/SPRINT-12H-DANCING-WITH-DURGA-SHAKTI-SHALA-ACTIVATION-PLAN.md`
- `docs/sprints/SPRINT-12H-DANCING-WITH-DURGA-SHAKTI-SHALA-ACTIVATION-ARCHITECTURE-PLAN.md`
- `docs/roadmap/SHAKTI-ACTIVATION-CALENDAR-2026-2027.md`
- `docs/calendar/`

## Verification

Passed:

- `git diff --check`
- `npm run lint`
- `npm run build`
- `npm run check:backend`
- `npm run check:begin-write`
- `npm run check:vault`
- `npx playwright test e2e/sprint12f-founder-acceptance.spec.ts e2e/sprint12g-stranger-clarity.spec.ts e2e/sprint12h-a-dancing-with-durga.spec.ts --workers=1 --reporter=line`

Playwright result:

- 6 passed

Calendar sanity check:

- 2026-10-11: Sunday
- 2026-10-13: Tuesday
- 2026-10-15: Thursday
- 2026-10-17: Saturday
- 2026-10-19: Monday

## Preserved Boundaries

Confirmed:

- no production write activation
- no Airtable mutation
- no Access Grant writes
- no checkout or payment route
- no Stripe integration
- no participant operations
- no Shala membership automation
- no scholarship automation
- no sacred asset substitution
- no unapproved production Durga image
- no backend behavior change

## Graphify

Graphify refresh was attempted once with a bounded 60-second timeout.

Outcome:

`GRAPHIFY_TIMEOUT_AFTER_60_SECONDS`

Observed behavior:

- AST extraction reached 350/350 files.
- Process timed out after AST extraction, matching the documented maintenance-debt pattern.

Status:

Non-blocking maintenance debt. Graphify remains context infrastructure, not a runtime dependency.

## Known Watch Items

- Final Durga depiction must come from Sheetal-approved sacred imagery or approved production art.
- Social team should not publish the generated reference image as approved campaign art.
- The CTA is intentionally request-details oriented until registration/commerce is approved and built.
- Founding Shala membership mechanics remain 12H-D, not 12H-A.
- Payment, regional pricing execution, scholarships, and supported-price operations remain 12H-B.

## Recommendation

Sprint 12H-A is ready for human review as a launch-foundation package.

Recommended next human checks:

1. Sheetal reviews campaign source pack for spiritual and offer accuracy.
2. Social team reviews carousel, Story, caption, and asset requirements.
3. Founder-approved Durga imagery is placed in Drive with provenance.
4. Decide whether to prepare a Vercel Preview for `/dancing-with-durga`.
5. Keep 12G closure and 12H campaign work as separate gates.

## Sprint 12H-A.1 Human Visual Acceptance Corrections

Date: 2026-09-03

Status: IMPLEMENTED FOR PREVIEW

Human review accepted the 12H-A direction with three narrow corrections before showing Sheetal:

- Remove the competing `Enter Shakti Shala` action from the hero CTA area.
- Treat the registration/payment notice as launch-state language, not engineering copy.
- Tighten the mobile headline scale so the subtitle and opening promise arrive sooner.

Implemented corrections:

- Hero now has one dominant action: `Request details`.
- Shakti Shala remains explained later as a doorway/continuation relationship, not as a hero bypass.
- Boundary copy now reads: `Details are being held for founder review. Registration and payment are not open yet.`
- Mobile Durga headline scale and line-height were reduced through a route-specific CSS override.
- Playwright now asserts that `Enter Shakti Shala` is not present as a public hero link.
- Vercel SPA rewrite coverage now includes `/dancing-with-durga` so the review URL can be opened directly.

Verification after correction:

- `git diff --check`: passed
- `npm run lint`: passed
- `npm run build`: passed
- `npm run check:backend`: passed
- `npm run check:begin-write`: passed
- `npm run check:vault`: passed
- `npx playwright test e2e/sprint12f-founder-acceptance.spec.ts e2e/sprint12g-stranger-clarity.spec.ts e2e/sprint12h-a-dancing-with-durga.spec.ts --workers=1 --reporter=line`: 6 passed

Preview requirement:

Create a Vercel Preview from the committed branch state only. Do not deploy Production.

Preview deployment note:

An initial CLI deployment from `apps/web` auto-created a separate Vercel project named `web` and treated its first deployment as that project's production. That deployment did not target the established `shakti-system-os` project. Corrective action: relink deployment work to `major-hanzoais-projects/shakti-system-os` and deploy from the repository root so the canonical `vercel.json` routing config is applied.

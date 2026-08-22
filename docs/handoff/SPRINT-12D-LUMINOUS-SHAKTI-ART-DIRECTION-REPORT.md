# Sprint 12D - Luminous Shakti Art Direction Report

Status: HUMAN VISUAL REVIEW REQUIRED

## Scope

Sprint 12D was a visual/art-direction implementation pass on top of the current Sprint 12C front-door interaction work.

The sprint did not change backend architecture, Airtable write behavior, pathway authority, consent logic, access grants, payments, initiation, retreat approval, or private reflection persistence.

## Design Artifacts Implemented

- Frozen Claude Design direction: dark sanctuary grounds the work; luminous Shakti opens the journey.
- Sprint 12D visual brief: materially visible pink, gold, green, water, flora, photography, and full Shri Yantra preview geometry.
- Current canonical vocabulary constraints: no generic SaaS/wellness language, no internal seeker-facing system terms, no "somatic breathwork."
- Existing Sprint 11 First Living Seeker secure-write boundary remains intact.

## Before / After Evidence

Before evidence from Sprint 12B:

- `docs/handoff/sprint-12b-evidence/desktop-portal-above-fold.png`
- `docs/handoff/sprint-12b-evidence/mobile-portal-above-fold.png`
- `docs/handoff/sprint-12b-evidence/desktop-begin-arrival.png`
- `docs/handoff/sprint-12b-evidence/desktop-begin-reveal.png`
- `docs/handoff/sprint-12b-evidence/desktop-shala-map-open.png`

After evidence from Sprint 12D:

- `docs/handoff/sprint-12d-evidence/desktop-home-luminous-front-door.png`
- `docs/handoff/sprint-12d-evidence/mobile-home-luminous-front-door.png`
- `docs/handoff/sprint-12d-evidence/desktop-classical-shakti-tantra-yantra.png`
- `docs/handoff/sprint-12d-evidence/mobile-classical-shakti-tantra-yantra.png`
- `docs/handoff/sprint-12d-evidence/desktop-begin-arrival.png`
- `docs/handoff/sprint-12d-evidence/desktop-begin-reveal.png`
- `docs/handoff/sprint-12d-evidence/mobile-begin-arrival.png`
- `docs/handoff/sprint-12d-evidence/mobile-begin-reveal.png`
- `docs/handoff/sprint-12d-evidence/desktop-shala-threshold.png`
- `docs/handoff/sprint-12d-evidence/mobile-shala-map-threshold.png`

Visual delta assessment:

- PASS: the homepage no longer reads as only dark field plus red/orange cards.
- PASS: the primary Start Your Shakti Path doorway is visible on desktop and mobile first viewport.
- PASS: real approved photography now carries the front door and founder world.
- PASS: the Classical Shakti Tantra chamber has distinct sacred-geometry art direction instead of matching the other chamber surfaces.
- PASS: Begin now has an image-backed ascent field and becomes warmer/lighter toward reveal.
- WATCH: Shala remains intentionally very dark; human visual review should decide whether the threshold should lift slightly brighter before showing Sheetal.

## Palette Usage

Grounding tones preserved:

- Obsidian/dark sanctuary backgrounds.
- Clay/burgundy chamber and threshold surfaces.
- Ash ivory typography.
- Guna red retained as punctuation, not the continuous dominant field.

Luminous tones added materially:

- Shakti pink and pink soft in hero veil, founder atmosphere, Classical Shakti Tantra chamber, Shala threshold geometry, and Begin late-stage glow.
- Muted gold/gold-lit in CTAs, Shri Yantra strokes, labels, and threshold emphasis.
- Leaf green in body/background fields, secondary doorway atmospheres, and readiness/pathway accents.
- Himalayan air/water blue through the front-door image field and atmospheric overlays.

## Photography Placements

- Front Door: `reflection_pool_1783418551833.jpg` now carries water, lotus, moon, and sanctuary atmosphere.
- Founder: `sheetal_founder_presence_2026-08.jpg` remains the real approved Sheetal portrait and is structurally visible in the hero gallery/founder world.
- Begin: `stillness_valley_1783418518708.jpg` is used as the snow-range/ascent environment.
- Shala: `temple_gates_1783418503682.jpg` continues to carry the threshold architecture, with a deeper luminous overlay and Shri Yantra threshold marker.

## Symbolic Placements

- Lotus / water: front-door image and luminous portal atmosphere.
- Mountain / ascent: Begin ascent image and gallery mountain crop.
- Fire: retained as gathering/transformation language in existing Shala affordances.
- Moon: visible through the front-door image field and existing Shala rhythm language.
- Shri Yantra: implemented visibly in Classical Shakti Tantra and Shala threshold.
- Temple threshold: retained as Shala entry architecture and route language.

## Shri Yantra Preview Implementation

Implemented as `apps/web/src/components/ShriYantraPreview.tsx`.

Geometry includes:

- nine interlocking triangles
- bindu
- inner lotus ring
- outer lotus ring
- bhupura with four gates

Primary placements:

- Classical Shakti Tantra knowledge chamber
- Shala temple threshold

Important boundary:

This is a preview implementation for human/founder visual review. The public UI does not label it as a review artifact, and the report preserves the approval caveat here.

## Files Changed

- `apps/web/src/components/ShriYantraPreview.tsx`
- `apps/web/src/components/PortalImageSlots.tsx`
- `apps/web/src/components/KnowledgeChamber.tsx`
- `apps/web/src/components/Hero.tsx`
- `apps/web/src/data/livingDoorways.ts`
- `apps/web/src/begin/BeginApp.tsx`
- `apps/web/src/begin/begin.css`
- `apps/web/src/shala/components/GatesRoom.tsx`
- `apps/web/src/shala/shala.css`
- `apps/web/src/styles/globals.css`
- `apps/web/e2e/sprint12d-luminous-art-direction.spec.ts`
- `docs/handoff/sprint-12d-evidence/*`

## Backend Behaviors Preserved

- Server-derived pathway authority remains unchanged.
- Consent boundary remains unchanged.
- Anonymous/no-contact journeys remain local-only.
- Idempotency behavior remains covered by existing Begin checks.
- `/api/begin/complete` remains the secure server write boundary.
- `/api/request-signal` remains the explicit request path.
- No Access Grant creation was added.
- No Initiation Key writes were added.
- No Environmental Memory writes were added.
- No automatic Retreat Application write was added.
- No private Reflection write was added.
- No payment/deposit behavior was added.

## Verification Results

Local verification:

- `npm run lint` - passed
- `npm run build` - passed
- `npm run check:backend` - passed
- `npm run check:begin-write` - passed
- `npm run check:vault` - passed
- `npm audit --audit-level=moderate` - passed, 0 vulnerabilities
- `npm run test:visual-review` - passed, 2 tests
- `npm run test:begin-browser` - passed, 2 tests
- `npx playwright test e2e/sprint12c-living-front-door.spec.ts --reporter=line` - passed, 2 tests
- `npx playwright test e2e/sprint12d-luminous-art-direction.spec.ts --reporter=line` - passed, 2 tests

## Mobile Evidence

Captured mobile surfaces:

- home first viewport with primary Start Your Shakti Path doorway visible
- Classical Shakti Tantra chamber with full Shri Yantra preview geometry
- Begin arrival and reveal
- Shala Sanctuary Map with recoverable room navigation

## Unresolved Founder / Asset Approvals

- The Shri Yantra geometry is implemented for preview review and should receive founder/human visual approval before production confidence language is strengthened.
- The brief requested a Waterfall / Lotus image. The repo currently has a strong water/lotus/moon image but no exact waterfall asset; the implementation uses the approved committed reflection pool image.
- The brief requested Temple at night for Shala. The current committed temple asset is the temple gates image; Shala uses that architecture with a darker threshold treatment.
- Further real-asset pass may still be needed for fuller gallery depth if Sheetal provides additional photography.

## Graphify

Attempted one bounded refresh:

```text
graphify update .
```

Result:

```text
GRAPHIFY_TIMEOUT_AFTER_60_SECONDS
```

No stdout was emitted before timeout. Status remains maintenance debt, not a runtime dependency and not a preview-release blocker. See `docs/handoff/GRAPHIFY-REFRESH-BLOCKER.md`.

## Preview

Preview label:

Sprint 12D - Luminous Shakti Art Direction
Status: HUMAN VISUAL REVIEW REQUIRED

Preview URL: pending deployment.

Exact commit: pending commit.

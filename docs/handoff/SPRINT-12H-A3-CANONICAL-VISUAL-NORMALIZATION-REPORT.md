# Sprint 12H-A.3 - Canonical Visual Normalization Report

Date: 2026-09-05

Branch: `codex/sprint-12g-founder-method-stranger-clarity`

## Purpose

Human review of Sprint 12H-A.2 identified that Dancing with Durga should not swing into either a wall-to-wall dark Durga treatment or a bright pink/ivory fantasy direction.

This pass returns the page to the established Shakti visual lineage:

`Himalayan stone + living green + pink dawn + muted gold + flowers + water + real human photography`

while allowing Dancing with Durga to emphasize burgundy, ember, rajas red, antique gold, hibiscus, earth, and controlled devotional intensity.

## Scope

Changed:

- `apps/web/src/styles/globals.css`
- `docs/handoff/sprint-12h-a3-evidence/durga-a3-desktop-fullpage.png`
- `docs/handoff/sprint-12h-a3-evidence/durga-a3-mobile-fullpage.png`

Unchanged:

- Campaign copy and offer facts
- Dancing with Durga route structure
- CTA behavior
- Begin logic
- Shala logic
- Airtable/server write boundary
- Commerce/payment state
- Production write state
- Sacred asset governance

## Normalization Decisions

1. Kept the Durga hero burgundy, gold, and devotional, but reduced the continuous black/red heaviness with warmer clay, stone, dawn, and green atmospheric undertones.

2. Preserved the non-deity sacred placeholder instead of introducing unapproved generated Durga art.

3. Made the founder section greener and more human so Sheetal remains present as practitioner/facilitator without implying she is Maa Durga.

4. Kept the central message deep and devotional, but added subtle water/green tonal relief.

5. Varied the five live gate cards by elemental tone so the rhythm is not five identical dark cards.

6. Converted the investment/access section into an ash-ivory and warm-stone breathing space. This creates the clearest visual break from the prior wall-to-wall dark treatment.

7. Kept the Shala doorway as a deeper threshold while adding water/green undertones so it remains part of the wider Shakti sanctuary.

## Visual Evidence

Desktop full-page:

`docs/handoff/sprint-12h-a3-evidence/durga-a3-desktop-fullpage.jpg`

Mobile full-page:

`docs/handoff/sprint-12h-a3-evidence/durga-a3-mobile-fullpage.jpg`

Observed result:

- The visual delta is visible without reading the copy.
- The page now moves through a tonal rhythm: devotional burgundy hero, living founder field, deep central message, elemental gate cards, warm stone investment section, deep Shala threshold, quiet visual governance.
- The page remains recognizably Shakti Portal rather than a separate Durga brand.

## Verification

Passed:

- `npm run lint`
- `npm run build`
- `npm run check:backend`
- `npm run check:begin-write`
- `npm run check:vault`
- `npm audit --audit-level=high`
- `npm run test:begin-browser`
- `npx playwright test e2e/sprint12h-a-dancing-with-durga.spec.ts e2e/sprint12h-a2-living-rhythm.spec.ts --reporter=line`
- `git diff --check`

## Graphify

Graphify report was read before implementation. The report is stale against current `HEAD`, so direct file inspection remained authoritative.

A bounded Graphify refresh completed successfully after implementation:

- `graphify update .`
- AST extraction: `356/356 files (100%)`
- Rebuilt: `5092 nodes`, `5815 edges`, `335 communities`
- `graphify-out/graph.json` and `graphify-out/GRAPH_REPORT.md` updated
- `graph.html` visualization was skipped because the graph exceeded the default HTML visualization node limit

## Human Review Question

Does Dancing with Durga now feel like a fiercer seasonal expression of the same Shakti sanctuary?

## Release Boundary

This pass does not approve public launch, production deployment, commerce, registration, payment, Airtable writes, membership automation, or final sacred imagery.

Founder/human visual review remains required.

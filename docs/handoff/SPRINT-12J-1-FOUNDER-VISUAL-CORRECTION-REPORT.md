# Sprint 12J.1 Founder Visual Correction

## Source-First Amendment: Current Review State

September 13 later human correction supersedes the decorative marks described below. The rejected Home four-oval seal, Begin/Shala CSS seals, Begin hand-drawn sigil and unused Yantra generator have been removed. Newly assigned decorative portal marks are also removed; neutral interaction controls remain. See `docs/design/SPRINT-12J-1-SOURCE-FIRST-SYMBOL-AUDIT.md` for classifications and unresolved legacy/provenance items.

Sovereignty and all pillar titles stay on a single line. Its internal title safe area is widened without reducing title size; responsive columns yield earlier. Historical claims of provisional icon placement below are not current approval. No production-eligible exact Yantra was identified in the v2 manifest/source inventory: **SHRI YANTRA PRODUCTION ASSET REQUIRED**.

Amendment verification: lint/build/backend/Begin-write/Vault PASS; 33/33 browser tests PASS (2.5 minutes); `git diff --check` PASS. Bounded Graphify exit 0: 382 AST files, 5,428 nodes, 6,158 edges; HTML skipped above its node limit. Screenshots remain fallback-font evidence. No commit, deployment, external publication or production state change.

## Latest: Living Grammar Correction

Major's subsequent September 13 acceptance direction extends the correction beyond Home/Begin portals. See `docs/design/SPRINT-12J-1-LIVING-GRAMMAR-AUDIT.md` for the A/B/C/D rectangle audit, provisional symbols, scope and remaining visual gaps.

Additional files: `Philosophy.tsx`, `AuthorityStrip.tsx`, `FounderPresence.tsx`, `OfferPathGateway.tsx`, `OfferingsPage.tsx`, `main.tsx`, `living-grammar.css`, and the existing portal helper/test. Desktop navigation is 17px; pillar/entry descriptions are 18px. Five-pillar definitions occupy the full section width in a staggered family. Knowledge doorways lose false ordinal labels. Founder topics become an open symbolic list. No public wording, route destination, backend or sacred asset changes in this amendment.

Latest verification: lint, TypeScript/build, backend, Begin-write, Vault and `git diff --check` PASS. Full Playwright: **30/30 PASS (2.6 minutes)**. Added checks cover 390/768/1440px, 18px description minimum, no horizontal text/document overflow, no pillar ordinals, no inherited card backgrounds, 17px desktop navigation, mobile menu and keyboard chamber entry. Existing tests remain unchanged apart from additions to the new correction spec. Network-blocked Google Fonts is disabled only by the external QA launch configuration, not application code.

Human visual acceptance remains OPEN; photographic/sacred architectural fidelity is still a WATCH, not PASS. Latest captures are `grammar-1440-home.png`, `grammar-390-home.png`, and the corresponding pillar/entry/founder/chamber viewport images. The comparison HTML now adds the latest pillar environment beside the founder reference.

Latest bounded Graphify refresh: exit 0, 383 AST files, 5,421 nodes, 6,152 edges, 363 communities. HTML visualization skipped at its 5,000-node limit. This verifies the code-map refresh only, not semantic extraction of these documentation amendments.

## Replacement Following Human Rejection

The first submission below was rejected by Major for visual translation drift. It is preserved as history, not acceptance. Current replacement is still local/uncommitted on the same branch and base SHA.

Replacement files: `LivingPortal.tsx`, `living-portals.css`, `Pathway.tsx`, `ChoiceScreen.tsx`, `data/practices.ts`, and the portal regression spec. Home's ordinal labels are removed; the heading now uses the supplied reference's "What is calling you?" and existing Begin support line "The most powerful path is not always the most intense one." These are local review copy changes directed by the correction, not new founder doctrine. Existing four Home chamber destinations and Begin choices remain unchanged.

The surface has six layers: existing environment; variant material/rim; translucent interior and refracted edge; provisional mark; unclipped HTML language; hover/focus/selection response. SVG turbulence is static and only displaces decorative edges, while CSS transforms move the material and ribbons on 11-19 second loops. Text and hit targets do not animate continuously. Pause/Resume controls and reduced-motion support are provided. No new dependencies or WebGL.

Symbols: Lucide React `Flower2`, `Waves`, `Flame`, `Leaf` (installed version 0.468.0) are **PROVISIONAL NON-SACRED REVIEW MARKS**, not exact founder-approved assets, lotus geometry, Shri Yantra, or a theological mapping. Categories follow the supplied botanical/water/warm-light/nature direction. Founder-approved equivalents are still required before treating these as a final symbolic system. The only photographic source remains the existing v2 `IMG_5327` derivative. No new sacred asset is introduced.

Shri Yantra: **SHRI YANTRA PRODUCTION ASSET REQUIRED**. Future integration position is the environmental focal area above/between the portals, preserving text and founder imagery; no placeholder geometry or public internal note is rendered there.

Side-by-side comparison: `apps/web/qa-artifacts/sprint12j1/reference-comparison.html`. Reference on the left, actual Home render on the right; Begin and mobile captures also linked. Remaining differences are explicit: no sacred temple/figure scene, less photographic botanical/flame detail, provisional marks, and less cinematic lighting. Fallback-font screenshots remain a limitation. Do not equate layers implemented with feeling accepted.

Replacement verification: lint/build/backend/Begin-write/Vault checks passed; full browser suite **27/27 PASS (2.5 minutes)**, including keyboard/reduced-motion, zero-write-before-consent, no ordinal labels and pause/resume checks. Desktop/mobile replacement captures show no document horizontal overflow. `git diff --check` passed. Google Fonts remains blocked during evidence capture; the same documented external test configuration verifies fallback-font rendering. Initial submission results below do not stand in for replacement results.

Comparison exists as both HTML and `reference-vs-render.png`; both use actual browser screenshots. **Visual disposition: REVISE / HUMAN DECISION REQUIRED** for full reference fidelity. The replacement is technically reviewable but does not yet reproduce the approved scene's full material richness, sacred focal point or cinematic depth. Do not self-approve equivalence. No commit, push, merge, production deployment, API/data/offer/DWD change or external publication.

Replacement Graphify refresh: exit 0 within 60 seconds; 382/382 AST files, 5,413 nodes, 6,131 edges, 360 communities. HTML skipped above the 5,000-node limit. AST refresh is not a claim of semantic founder-source extraction.

## Historical First Submission (Rejected)

Date: 2026-09-13.
Branch: `codex/sprint-12j-1-visual-correction`.
Base / current committed SHA: `bd44e4c17fea900757caa7b8b2822eb6db40fec5`.
Corrections are local and uncommitted; this SHA identifies the base, not the modified rendered build. No commit, push, merge or external deployment performed.

## Implementation

Runtime routes changed: Home `/` pathway section and `/begin` choices. Pace receives organic portals; other Begin response labels receive legibility improvements. Copy, choice IDs, scoring inputs, persistence and callbacks are unchanged.

- `components/LivingPortal.tsx`: four non-sacred environmental SVG contours; existing waterfall image clipped within each; text remains regular HTML outside clipping. Unique React IDs prevent mask collisions.
- `styles/living-portals.css`: scoped Home waterfall field, organic surfaces, typography, responsive tracks, focus outlines and brief waterline settling motion.
- `components/Pathway.tsx`: reuses the surface behind existing four chamber buttons and adds Lucide arrow affordances. Existing chamber behavior stays intact.
- `begin/components/Screens/ChoiceScreen.tsx`: applies the surface at Pace only; larger response/support type; reduced-motion-aware visual transitions. Choice and secure-write logic unchanged.
- `data/visualAssets.ts`: adds the Home/pace placement to existing waterfall metadata.
- `e2e/sprint12j1-living-portals.spec.ts`: keyboard, bounds, type size, reduced motion and zero-write-before-consent checks.

Home pathway labels are 32px and descriptions 18px. Begin pace labels are 28px; response/support descriptions 18px. Wider question measure avoids a narrow stack of words. Global type tokens and public wording are unchanged.

Motion uses one 4.8-second SVG contour transform/opacity sequence. It ends automatically, preserves text stability, and is disabled for reduced motion. No WebGL, new dependency, sacred geometry, continuous particles or new pointer effects. Existing application cursor/environment effects outside this correction remain historical behavior.

## Asset and Authority

Reused derivative: `waterfall-nature-v2-img-5327.jpg`.
Source: `IMG_5327.HEIC / IMG_5327.jpg`, Founder Visual Source v2.
Manifest classification: APPROVED CANDIDATE; reused under the accepted 12J source boundary without upgrading rights/status.
Source manifest SHA-256: `67d748ef73bec0a3e019a787190337029188e467e7d56d7bde524d1df15be888` (source JPEG, not derivative checksum).
Role: Home pathway environment; Home/Begin pace texture. Cover crop preserves water and nature; not a new founder portrait. Decorative repeated images are hidden from accessibility APIs; existing semantic photography remains unchanged. Replacement requires an approved waterfall image and updated metadata.

No new binary asset or raw ZIP copied into runtime. Original archives untouched. The generated reference is not shipped.

Shri Yantra: **SHRI YANTRA PRODUCTION ASSET REQUIRED**. The supplied 38-row manifest identifies no exact production-approved Shri Yantra. Sacred-image rows remain reference-only or NEEDS PROVENANCE. Existing constructed motion studies cannot substitute. This portion stopped without substitution.

Primary founder response, as relayed by Major, is captured in `docs/founder-source/SHEETAL-VISUAL-ACCEPTANCE-2026-09-13.md`. It refines prior direction; no doctrine supersession or conflict is invented. Existing founder visual record, 12J acceptance, and report cross-reference this amendment. Visual implementation rules are in `docs/design/SPRINT-12J-1-PORTAL-VISUAL-BOUNDARY.md`.

## Verification

- Lint: PASS.
- TypeScript / production build: PASS.
- Backend read checks: PASS.
- Begin secure-write checks: PASS.
- Vault checks: PASS.
- Existing full Playwright suite: 22/22 PASS on the initial correction build.
- New portal checks: 4/4 PASS on the final correction build.
- Final combined suite: 26/26 PASS (2.6 minutes, two workers), on final runtime build.
- Desktop 1440px and mobile 390px route capture: Home, About, Offerings, Shala, Testimonials, DWD showed no document horizontal overflow; Begin Pace captured separately. New focused checks also include 768px.
- `git diff --check`: PASS.
- Graphify: PASS within the 60-second bound, exit 0; 382/382 AST files extracted; 5,404 nodes, 6,118 edges, 362 communities. HTML visualization skipped because the graph exceeds the 5,000-node limit. Code graph/report refreshed; this AST operation does not claim semantic re-extraction of the new founder documents.

Google Fonts timed out in this environment, including an independent curl probe. The first normal browser run was interrupted. Tests subsequently used a temporary external Playwright config that made only the two Google Fonts hosts fail immediately; test assertions, app code and local services were unchanged. This verifies fallback typography, not successful delivery of the intended web fonts. The temporary config set only test/output paths and Chromium host-resolver rules for `fonts.googleapis.com` and `fonts.gstatic.com` and was not part of the release manifest.

## Evidence and Review

Local evidence directory: `apps/web/qa-artifacts/sprint12j1/`, ignored and not published. Before captures come from an isolated detached checkout of the base SHA. See [acceptance record](../acceptance/SPRINT-12J-1-FOUNDER-VISUAL-ACCEPTANCE.md) for linked desktop/mobile comparisons and capture limitations.

Local dev review: `http://localhost:5173/#pathway` and `/begin`. Built review: `http://localhost:4173/`.

WATCH: organic shapes, water intensity, and mobile pacing require human taste review. Existing navigation microcopy and non-target route styling have not been globally enlarged or redesigned. Web-font appearance needs a follow-up when font delivery is available. Shri Yantra integration is held.

No backend/API/schema, offers, DWD facts, payment, credentials, Airtable writes, sacred art or Production changes. Unrelated `.codex/environments/`, older 12G local artifacts and `docs/stb/` remain untouched.

Recommendation: **ACCEPT FOR HUMAN REVIEW** for the bounded portal/waterfall/legibility correction. This is not final founder acceptance or production approval.

Rollback: the base SHA preserves the prior review build. Discard only the enumerated correction changes after review, or use a separate base checkout; do not reset unrelated local work. No data or environment rollback is needed.

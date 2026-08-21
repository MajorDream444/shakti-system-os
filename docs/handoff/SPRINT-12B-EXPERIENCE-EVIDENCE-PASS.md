# Sprint 12B - Experience Evidence Pass

Prepared: 2026-08-21  
Base: `origin/main` at `84dd880`  
Branch: `codex/sprint-12b-experience-evidence-pass`

## Scope

This pass reviewed the current post-PR #13/#14 implementation of:

- `/`
- `/begin`
- `/shala`

The work was evidence-only. No backend architecture, production write settings, or application behavior were changed.

## Evidence Set

Captured from the production Vite preview at `http://127.0.0.1:4173`.

| Surface | Desktop Evidence | Mobile Evidence |
|---|---|---|
| Portal above fold | [desktop-portal-above-fold.png](sprint-12b-evidence/desktop-portal-above-fold.png) | [mobile-portal-above-fold.png](sprint-12b-evidence/mobile-portal-above-fold.png) |
| Founder presence | [desktop-founder-presence.png](sprint-12b-evidence/desktop-founder-presence.png) | [mobile-founder-presence.png](sprint-12b-evidence/mobile-founder-presence.png) |
| Begin arrival | [desktop-begin-arrival.png](sprint-12b-evidence/desktop-begin-arrival.png) | [mobile-begin-arrival.png](sprint-12b-evidence/mobile-begin-arrival.png) |
| Begin reveal | [desktop-begin-reveal.png](sprint-12b-evidence/desktop-begin-reveal.png) | Covered by Begin path probe |
| Begin completion | [desktop-begin-completion.png](sprint-12b-evidence/desktop-begin-completion.png) | [mobile-begin-completion.png](sprint-12b-evidence/mobile-begin-completion.png) |
| Shala map | [desktop-shala-map-open.png](sprint-12b-evidence/desktop-shala-map-open.png) | [mobile-shala-map-open.png](sprint-12b-evidence/mobile-shala-map-open.png) |

## Rubric Results

| Rubric Item | Desktop | Mobile | DOM / UI Evidence | Failure Type |
|---|---:|---:|---|---|
| Can I tell who Sheetal is? | YES | YES | `#founder` exposes `Sheetal Kandola`, founder headline, biography, and `img` alt text `Sheetal Kandola in devotional presence`. | No objective failure. |
| Can I tell what this place is? | YES | YES | Portal and Shala expose `Shakti Shala`, `Shakti Shadow & Somatics`, sanctuary language, and room names. | No objective failure. |
| Can I tell where to begin? | YES | YES | First viewport exposes primary link text `Start Your Shakti Path`; nav also includes `Begin` / `Start`. | No objective failure. |
| Can I see the next step? | YES | YES | `/begin` exposes `Arrival`, response controls, reveal copy, and completion actions. `/shala` exposes `Sanctuary Map`. | No objective failure. |
| Can I recover if I get lost? | YES | YES | `/shala` map button opens `#threshold-drawer`; room controls include `Temple Gates`, `Courtyard`, `Practice`, `Temple Library`, `Goddess Pathways`, `Reflection Pool`, `Personal Journey`, `Retreat Threshold`, and `Fire Circle`. | No objective failure. |
| Does mobile preserve the hierarchy? | YES | YES | Mobile screenshots preserve portal CTA, founder section, Begin arrival, Begin completion, and Shala map in reachable order. | No objective failure. |
| Does this look authored rather than templated? | WATCH | WATCH | Browser evidence carries Sheetal-specific language and Shakti room architecture. Final authored-vs-templated judgment remains human visual review. | Aesthetic judgment, not objective failure. |
| Does the founder feel human and present? | YES | YES | Real founder photograph, name, biography, and relationship to Shakti Shala are visible in the founder section. | No objective failure. |
| Does the sanctuary feel inhabited? | YES | YES | Shala renders as a room system with stateful map navigation, current-room context, and open/request/preparation/invitation distinctions. | No objective failure. |

## Specific Confirmations

- Founder presence reads clearly: YES. Evidence: founder portrait, `Sheetal Kandola`, biography, and founder-to-sanctuary framing are visible on desktop and mobile.
- Primary `Start Your Shakti Path` doorway is obvious: YES. Evidence: first viewport includes the primary CTA, and it is visually stronger than secondary actions.
- `/begin` communicates progression/ascent: YES. Evidence: eight stations are visible as `Arrival`, `Listening`, `Current State`, `Pace`, `Support`, `Longing`, `Discernment / Reveal`, `Enter`; desktop uses the ascent rail and mobile keeps the arrival hierarchy.
- Completion clearly exposes `Enter Shakti Shala`: YES. Corrected completion probe confirmed `Your path is held.`, private/local copy, `Enter Shakti Shala`, and `Delete local journey` on desktop and mobile.
- Sanctuary map / return navigation is recoverable: YES. Evidence: `Sanctuary Map` opens `#threshold-drawer` and shows room routes with seeker-facing access language.
- Real photography improves rather than competes with hierarchy: WATCH. The founder photograph improves specificity and human presence. The portal hero/gallery stack is visually strong but may compete with the large headline in the first viewport; this is a P2 human taste review item.
- Mobile preserves the same narrative order: YES. Mobile order remains portal doorway -> founder -> Begin arrival/completion -> Shala map.

## Prioritized Findings

### P0 - Broken Or Inaccessible

None found.

### P1 - Pathway / Wayfinding Failure

None found.

One false-positive risk was investigated: the first custom probe did not reach the submitted Begin completion state because it clicked a reveal CTA path incorrectly. The corrected probe confirmed that Begin completion exposes the Shala doorway on both desktop and mobile.

### P2 - Founder / Visual Hierarchy Weakness

1. `WATCH`: The portal is substantially more authored after the founder and photography pass, but the first viewport still asks the real Sheetal image, the large headline, three gallery images, and three CTAs to share attention. The primary doorway remains objectively clear; the remaining question is taste and hierarchy, requiring human visual review before further styling changes.

2. `WATCH`: The authored-vs-templated judgment cannot be fully settled by browser automation. DOM evidence proves Shakti-specific copy and architecture, but whether the surface feels unmistakably Sheetal's world remains a human taste gate.

### P3 - Polish

1. `WATCH`: Begin arrival is intentionally sparse and atmospheric. It communicates ascent, but a human reviewer should decide whether the opening feels too empty/dark before the journey becomes luminous. No automatic change recommended.

## Verification

Commands run from `apps/web`:

```text
npm run lint
npm run build
npm run test:visual-review
npm run check:backend
npm run check:begin-write
npm run check:vault
```

Results:

- `lint`: passed with one existing warning in `src/shala/components/EnvironmentalCanopy.tsx` for an inline `Particle` class inside a component.
- `build`: passed.
- `test:visual-review`: passed, 2 tests.
- `check:backend`: passed.
- `check:begin-write`: passed.
- `check:vault`: passed.

## Backend Boundary

No backend files were modified. Production writes were not enabled. The secure Begin write checks passed, preserving the Sprint 11 server-owned pathway and write-boundary protections.

## Recommendation

No P0/P1 code changes are required before human visual review.

Hold P2/P3 items for human review. If the reviewer feels the portal still competes visually or the Begin arrival feels too dark/sparse, schedule a bounded visual polish pass rather than treating this evidence pass as authorization to redesign.

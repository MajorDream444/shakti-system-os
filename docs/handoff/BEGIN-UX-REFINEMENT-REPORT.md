# Begin UX Refinement Report

Date: 2026-08-15  
Branch: `codex/begin-ux-refinement`  
Sprint classification: Shakti-specific implementation using existing MAIM OS boundaries

## Outcome

The public portal, Start Your Shakti Path, and Shakti Shala now read as one legible journey:

```text
Meet Sheetal
-> Start Your Shakti Path
-> Reflect / Discern
-> Receive a Pathway
-> Enter Shakti Shala
-> Open the sanctuary map or enter a practice
```

This sprint refines the existing experience. It does not replace the visual identity, room architecture, pathway logic, persistence boundary, backend repository, Vault checks, access model, or current data-capture fallback.

## Files Changed

- `apps/web/src/begin/BeginApp.tsx`
- `apps/web/src/begin/begin.css`
- `apps/web/src/begin/components/Screens/ChoiceScreen.tsx`
- `apps/web/src/begin/components/Screens/Handoff.tsx`
- `apps/web/src/begin/components/Screens/PathReveal.tsx`
- `apps/web/src/begin/components/Screens/Threshold.tsx`
- `apps/web/src/constants/storage.ts`
- `apps/web/src/shala/ShalaApp.tsx`
- `apps/web/src/shala/shala.css`
- `docs/handoff/BEGIN-UX-REFINEMENT-REPORT.md`

## Behavior Changed

### `/`

- Confirmed the first viewport already presents `Start Your Shakti Path` as the primary action.
- Preserved the current public-page structure and visual language.

### `/begin`

- Added a non-numeric ascent marker with the canonical station labels: Threshold, Listening, Pace, Support, Longing, Discernment, Doorway, and Shala Ahead.
- Added controlled environmental color progression across the eight stations while retaining dark stone, ember, and sanctuary continuity.
- Added a visible Back control and a home return.
- Persisted the current journey through `PersistenceService`, so a seeker can return home and resume the same station.
- Preserved the existing questions, scoring, pathway results, and result-before-contact order.
- Preserved `Continue Without Sharing` and made its destination explicit: `Enter Shakti Shala`.
- Made the selected choice state more visible and retained it when reviewing a previous station.
- Reduced mobile threshold density so the primary CTA is visible in the first 360px-wide viewport.
- Prevented tall mobile stations from being vertically centered above the visible viewport.
- Reset scroll position at each station transition.

### `/shala`

- Added a quiet persistent Home / Sanctuary Map control across Shala rooms.
- Kept the control compact on phone widths.
- Hid the sanctuary utility control inside the full-screen Practice Room, preserving progressive simplification and the existing exit-only deep-practice model.
- Preserved `RitualService`, `PersistenceService`, `BackendRepository`, access boundaries, current rooms, environmental controls, and fallback data behavior.

## Accessibility And Responsive QA

Browser: Codex in-app Chromium browser  
Local URL: `http://127.0.0.1:5173`

| Width | `/` | `/begin` | `/shala` | Horizontal overflow |
| --- | --- | --- | --- | --- |
| 360 x 800 | Pass | Pass | Pass | None |
| 390 x 844 | Pass | Pass | Pass | None |
| 430 x 932 | Pass | Pass | Pass | None |
| 768 x 1024 | Pass | Pass | Pass | None |
| 1440 x 1000 | Pass | Pass | Pass | None |

Confirmed:

- mobile answer doorways are large, single-column targets;
- the Begin home control and Shala utility controls are 44px touch targets on phone widths;
- selected choices use `aria-pressed` and a clear visual state;
- station progress uses `aria-current="step"`;
- the sanctuary map trigger exposes expanded state and controls the existing drawer;
- Begin headings and CTAs are no longer clipped by tall mobile content;
- the pathway reveal and Continue Without Sharing CTA are visible at 390px without an initial scroll;
- returning from `/begin` to `/` and choosing Start Your Shakti Path resumes the current station;
- deep Practice Room mode hides the new sanctuary utility chrome;
- no framework error overlay or browser console error appeared.

Expected local warning:

- `VITE_AIRTABLE_TOKEN` is absent, so `BackendRepository` reports its documented mock-backend fallback. No browser secret or direct Airtable write was added.

## Browser Journey Verified

```text
/
-> Start Your Shakti Path
-> Threshold
-> Orientation
-> Current state
-> Capacity / pace
-> Support / bandwidth
-> Optional longing
-> pathway reveal
-> Continue Without Sharing
-> /shala
-> Sanctuary Map
-> Practice Room
```

The contact-capture form rendered correctly and remained optional. A live form submission was not sent during browser QA because that would create an external data side effect; the existing local fallback and backend-read boundary were instead verified by the repository checks.

## Screenshot Evidence

The following desktop and mobile screenshots were captured in the Codex browser QA session and attached to the sprint task:

| Capture | Viewport | Evidence |
| --- | --- | --- |
| Public portal first viewport | 1440 x 1000 | Primary Start Your Shakti Path action is visible |
| Begin threshold | 1440 x 1000 | Full eight-station ascent and dark-sanctuary foundation |
| Pathway reveal | 1440 x 1000 | Pathway appears before contact capture |
| Shala gates | 1440 x 1000 | Persistent Home / Sanctuary Map utility |
| Sanctuary map drawer | 1440 x 1000 | Direct room destinations remain summonable |
| Deep Practice Room | 1440 x 1000 | Utility chrome hidden; exit remains available |
| Begin threshold | 360 x 800 | Progress and primary CTA visible with no horizontal overflow |
| Begin handoff | 390 x 844 | Optional fields and Continue Without Sharing CTA visible |
| Shala gates | 390 x 844 | Compact sanctuary controls and room doorways |

## Verification Results

| Gate | Result | Notes |
| --- | --- | --- |
| `npm run lint` | Pass with one pre-existing warning | React compiler skips the inline `Particle` class in `EnvironmentalCanopy.tsx`; no lint errors |
| `npx tsc -b` | Pass | Clean lockfile install removed duplicate local `@types/* 2` folders |
| `npm run build` | Pass | Vite production build completed |
| `npm run check:backend` | Pass | Backend read checks passed |
| `npm run check:vault` | Pass | Vault sync checks passed |
| `graphify update .` | Blocked | Reached `Re-extracting code files in .` but did not complete or emit progress after more than two minutes; interrupted and not counted as passing |

## Known Limitations

- Graphify remains stale because the required refresh stalled while classifying the broad workspace. This is the only release-gate blocker found in this sprint.
- The existing React compiler warning in `EnvironmentalCanopy.tsx` remains outside this focused UX sprint.
- The local environment intentionally used the mock backend fallback; production Airtable configuration was not exercised.
- No live contact payload, payment, access-key transaction, or production deployment was performed.
- Existing founder-authentic imagery was preserved. No new photography or sacred imagery was ingested.

## Claude Design Follow-Up

Return to Claude Design for review, not automatic implementation:

- founder-approved photography placement and crop direction;
- any new sacred or goddess imagery;
- final luminous-pink, flora, water, and Himalayan-light art direction beyond the restrained environmental fields used here;
- any larger visual-identity revision;
- review of direct founder voice if new editorial copy is desired.

## Production-Ready From This Sprint

- eight-station wayfinding and named ascent;
- persisted Begin journey and home-return behavior;
- mobile threshold and tall-station layout repairs;
- explicit Shala entry without contact sharing;
- global summonable sanctuary map and home return;
- deep-practice chrome suppression;
- responsive behavior across the required width matrix;
- existing backend, Vault, ritual, persistence, access, and data-capture boundaries.

## Release Assessment

Do not propose release yet. The implementation and browser QA are complete, but `graphify update .` must complete successfully (or the owner must explicitly waive that repository gate) before release is proposed.

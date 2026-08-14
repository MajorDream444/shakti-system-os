# Codex Sprint — Begin UX Refinement

## Objective

Refine the existing Shakti Portal → `/begin` → `/shala` journey so a first-time seeker can understand where to begin, complete the threshold experience easily on mobile or desktop, and enter Shakti Shala without needing Major or Sheetal beside her to explain navigation.

This is a UX refinement sprint, not a redesign of the entire Shakti System OS.

## Canonical sources to read first

Before editing code, inspect:

- `docs/research/SHEETAL-INSTAGRAM-INTELLIGENCE-AUDIT-2026-08.md`
- `docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md`
- existing `DESIGN.md` / design-system docs
- existing Living Intelligence OS / implementation map docs
- `apps/web/ARCHITECTURE_REPORT.md`
- Graphify context for current repository state

Also inspect current implementation:

- `apps/web/src/App.tsx`
- `apps/web/src/begin/BeginApp.tsx`
- `apps/web/src/begin/begin.css`
- `apps/web/src/begin/components/*`
- `apps/web/src/shala/*`
- current route/navigation constants

## Founder / UX evidence

August 2026 founder review and a 10-minute walkthrough exposed these issues:

1. The route architecture exists, but the experience is under-signposted.
2. The `/begin` sequence feels too much like a dark questionnaire rather than an active threshold journey.
3. The visual system is too continuously red/dark and does not reveal enough of Sheetal's luminous feminine visual territory.
4. It is not always obvious how to enter the Shala or move among the sanctuary rooms.
5. The experience needs to work equally well on laptop and phone.
6. Important areas and offerings should not depend on knowing direct URLs.

## Non-negotiable doctrine

- Do not redesign this into a SaaS dashboard.
- Do not flatten Shakti Shala into a normal course platform.
- Do not add gamified progress, streaks, reward loops, or aggressive conversion UI.
- Do not use `somatic breathwork`.
- Preserve human discernment and doctrine review.
- Preserve existing service boundaries and backend architecture.
- Preserve current data capture / fallback behavior unless a bug requires repair.

Core principle:

> The practitioner teaches. AI prepares. Humans steward. The system remembers. The seeker receives.

Design principle:

> Dark sanctuary grounds the work. Luminous Shakti opens the journey.

> Preserve the depth. Reveal more of the beauty.

## Visual direction

Current dark stone / ember / Himalayan sanctuary remains foundational.

Expand the visual field through controlled use of:

- warm gold
- luminous pink
- deep red
- lush green
- water
- florals
- Himalayan light
- founder-authentic photography / approved placeholders
- sacred geometry where appropriate
- environment-specific goddess color shifts

Do not turn the experience into generic goddess fantasy art.

Goddess imagery is doctrinal, not decoration.

## UX requirement 1 — Global wayfinding

A visitor must always understand the macro journey:

```text
Meet Sheetal
→ Start Your Shakti Path
→ Reflect / Discern
→ Receive a Pathway
→ Enter Shakti Shala
→ Explore the relevant room / practice / offering
```

Requirements:

- public `/` has a clearly visible primary `Start Your Shakti Path` action
- `/begin` makes the destination / progress legible without using generic `Step 3 of 8` quiz styling
- completed `/begin` has an unmistakable `Enter Shakti Shala` action
- `/shala` has a quiet persistent way to summon the sanctuary map / destinations
- user can return to sanctuary/home without losing state

## UX requirement 2 — Redesign `/begin` as eight stations

Keep the existing underlying questions / routing logic unless canonical doctrine says otherwise.

Do not turn the experience into one long form.

Each screen should feel like one threshold station.

Suggested progression:

1. Arrival / threshold
2. Orientation
3. Current state
4. Capacity / pace
5. Support / bandwidth
6. Longing / optional reflection
7. Pathway reveal
8. Warm handoff + Shala entry

Important:

- the user receives the pathway before contact capture
- `Continue Without Sharing` remains available
- preserve user agency
- avoid diagnostic language

## UX requirement 3 — Progress as ascent, not quiz completion

Replace or augment generic numeric progress with a subtle mountain/path marker.

Possible language:

- Threshold
- Listening
- Pace
- Support
- Longing
- Discernment
- Doorway
- Shala Ahead

Do not over-theme or create fantasy copy if it reduces clarity.

## UX requirement 4 — Mobile-first controls

For phone widths:

- answer targets must be large and thumb-friendly
- no tiny text or low-contrast secondary actions
- no interaction dependent on hover
- selected state must be obvious
- primary CTA should remain visible without excessive scrolling
- safe spacing around bottom browser chrome
- test common widths: 360, 390, 430px

For desktop:

- each screen should still feel spacious
- answers must read as interactive without looking like SaaS cards
- maintain editorial hierarchy

## UX requirement 5 — Visual progression

Avoid rendering every Begin station with the same dark burgundy field.

Use a controlled environmental progression:

```text
Threshold — stone / ember / mist
Current state — deeper shadow / water
Capacity — mountain air / warm stone
Support — interior sanctuary / lamp
Longing — subtle flora / water / pink-gold light
Reveal — wider Himalayan vista / luminous threshold
Handoff — Shala visible ahead
```

This should feel like movement through one world, not eight unrelated backgrounds.

## UX requirement 6 — Shala navigation

Keep the principle: the deeper the user travels, the less interface she sees.

Do not add a large permanent navbar to deep practice rooms.

At appropriate depths, provide a summonable sanctuary map / threshold drawer with direct destinations such as:

- Temple Gates / Sanctuary
- Practice
- Temple Library
- Goddess Pathways
- Reflection Pool
- Personal Journey
- Retreat Readiness

Deep practice mode may continue to hide navigation except for exit / return controls.

## UX requirement 7 — Offer / payment discoverability

Do not redesign monetization in this sprint.

But make existing doorways discoverable:

- initiation / key access
- circle / ceremony entry
- retreat readiness / passage

Use sanctuary language, not `Upgrade`, `Pro`, or SaaS pricing UI.

The user should understand where a restricted doorway exists without encountering aggressive paywalls.

## Copy rules

Read `docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md` before changing any copy.

Especially:

- no `somatic breathwork`
- use `somatic work`, `somatics`, `pranayama`, `yogic breath practices`, `embodiment`, `nervous system` when contextually accurate
- do not sanitize Sheetal into generic wellness language
- do not invent Sanskrit / lineage claims

## Architecture boundaries

Do not bypass:

- `PersistenceService`
- `RitualService`
- `BackendRepository`
- existing access / Airtable / Drive boundaries

Do not add browser-exposed production secrets.

No backend writes unless separately approved.

## Implementation method

Follow MAIM OS sprint discipline:

1. Repository Hygiene
2. Architecture
3. Feature
4. Verification
5. Documentation
6. Release

First inspect Graphify and repository state.

Do not delete or restructure working architecture solely for aesthetic convenience.

## Verification gate

Run and report:

```text
npm run lint
npx tsc -b
npm run build
npm run check:backend
npm run check:vault
graphify update .
```

Also perform browser QA for:

- `/`
- `/begin`
- `/shala`

Widths:

- 360px
- 390px
- 430px
- tablet
- desktop 1440px+

Test complete journey:

```text
/ → /begin → pathway reveal → continue without sharing → /shala
```

and if available:

```text
/ → /begin → share details → /shala
```

Confirm:

- no horizontal overflow
- no inaccessible controls
- all major CTAs visible
- back / return behavior works
- state is preserved where expected
- deep practice still minimizes chrome

## Deliverable

Create:

`docs/handoff/BEGIN-UX-REFINEMENT-REPORT.md`

Include:

- files changed
- behavior changed
- screenshots at desktop/mobile
- accessibility / responsive notes
- known limitations
- verification results
- what should go back to Claude Design versus what is now production-ready

## Stop conditions

Do not:

- redesign the entire visual identity
- ingest new production media without review
- add live payment processing
- add Airtable writes
- replace Shala architecture
- add AI-generated doctrine

If the design direction requires new approved photography or sacred imagery, use placeholders and document exact asset requirements.

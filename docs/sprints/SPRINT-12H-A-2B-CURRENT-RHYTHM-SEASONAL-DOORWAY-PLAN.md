# Sprint 12H-A.2B - Current Rhythm Seasonal Doorway Plan

Status: PLANNED / HUMAN REVIEW REQUIRED
Owner: Codex
Created: 2026-09-05
Related implementation: Sprint 12H-A.2a Dancing with Durga emotional visual integration

## Purpose

Make the current seasonal invitation discoverable from the Shakti Portal without making the homepage arbitrarily editable.

This is not a generic CMS. It is a stable public doorway whose approved content can rotate.

## Governing Principles

```text
THE STRUCTURE STAYS STABLE.
THE PROGRAMMING ROTATES THROUGH IT.
```

```text
Inspiration enters a decision process.
It does not immediately become infrastructure.
```

```text
Stable Sanctuary, Living Altar.
```

## Proposed Public Component

Working name: `CurrentRhythm`

Public label options:

- Current Rhythm
- What Is Alive Now
- Seasonal Invitation

The component should sit near the top of `/`, after the initial portal orientation and before deeper method/offer complexity.

## Stable Content Contract

| Field | Purpose | Example for Dancing with Durga | Source of truth |
|---|---|---|---|
| `id` | Stable code identifier | `dancing-with-durga-navratri-2026` | GitHub |
| `year` | Programming year | `2026` | GitHub, future Airtable |
| `season` | Human-readable season | `Navratri` | Founder-approved source |
| `sacredPeriod` | Public period label | `NAVRATRI 2026` | Founder-approved source |
| `title` | Invitation title | `Dancing with Durga` | Founder-approved source |
| `line` | Supporting line | `Devotion with a Spine` | Founder-approved source |
| `dateRange` | Visible dates | `October 11-19` | Founder-approved source, calendar checked |
| `ctaLabel` | Public action | `Explore the Sadhana ->` | GitHub copy |
| `href` | Stable route | `/dancing-with-durga` | GitHub routing |
| `status` | Internal state | `founder-confirmed` | GitHub docs / future Airtable |

## Future Data Placement

GitHub:

- component contract
- approved campaign truth
- public rendering rules
- tests

Airtable:

- future Annual Rhythm operational records
- event state
- campaign status

Notion:

- team-facing annual calendar
- owner assignments
- decision notes
- SOPs

Drive:

- approved founder photography
- approved Devi imagery
- campaign assets

Graphify:

- relationships between rhythm, offers, assets, source authority, and implementation

## Non-Goals

- Do not build a generic CMS.
- Do not make homepage layout founder-editable.
- Do not create arbitrary runtime layout mutation.
- Do not connect Airtable or Notion in this pass.
- Do not create commerce or registration behavior.

## Acceptance Criteria For Future Build

- A visitor can discover the current invitation from `/` without hunting through navigation.
- The component can be updated from approved structured data without redesign.
- The component has exactly one primary action.
- It does not compete with `Start Your Shakti Path`; it clarifies what is alive now.
- Mobile preserves the same hierarchy and does not become a promotional banner stack.

# Playwright Design Intention Rubric

## Purpose

Playwright visual review for Shakti is not only functional testing. It is the browser evidence layer for design intention.

Every meaningful visual pass should follow this loop:

```text
inspect -> judge against explicit criteria -> fix highest-severity issues -> show evidence
```

This rubric does not authorize random design decisions. It keeps agent autonomy bounded by the frozen Shakti experience, canonical vocabulary, Sheetal's doctrine, and human visual review.

## Required Questions

For `/`, `/begin`, and `/shala`, the reviewer must answer:

1. Can I tell who Sheetal is?
2. Can I tell what this place is?
3. Can I tell where to begin?
4. Can I see the next step?
5. Can I recover if I get lost?
6. Does mobile preserve the hierarchy?
7. Does this look authored rather than templated?
8. Does the founder feel human and present?
9. Does the sanctuary feel inhabited?

## Status Semantics

Use only these statuses:

- `YES` - Browser evidence supports the intention.
- `WATCH` - The intention is present but needs human taste review, better assets, stronger copy, or tighter layout.
- `NO` - The intention is missing or contradicted. Fix before presenting the surface as ready.

## Evidence Rules

- Attach screenshots for desktop and mobile.
- Attach a written rubric answer set from the browser run.
- Name the route or state that proves each answer.
- Do not treat compile/build success as visual approval.
- Do not let screenshots replace human review when the status is `WATCH`.

## Current Playwright Hook

The reusable check lives in:

```text
apps/web/e2e/sprint12a-visual-review.spec.ts
```

Run from `apps/web` after starting a production preview:

```text
npm run build
npm run preview -- --host 127.0.0.1
npm run test:visual-review
```

The Playwright test captures desktop/mobile screenshots and attaches a Markdown rubric for the visual review run.

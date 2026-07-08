# Untracked Assets Review

Date: 2026-07-08

## Purpose

This repo now treats GitHub as the application, documentation, schema, and handoff source of truth. Large source media, client exports, recordings, and loose workspace artifacts should stay local until reviewed, then move to Google Drive or be deliberately promoted into GitHub.

No assets were deleted during this hygiene pass.

## Stay Local For Now

Keep these untracked until a human review decides their destination:

- Raw call recordings and walkthrough exports such as `.m4a`, `.mp4`, and screen recordings.
- One-off local screenshots, generated covers, and image explorations at the workspace root.
- Exported PDFs, decks, invoices, SOWs, operating packages, and client package files at the workspace root.
- Local Codex/operator state such as `.codex/hooks.json`.
- Generated Graphify output in `graphify-out/`.
- Loose planning folders such as `community/`, `crm/`, `routing/`, and `social/` when they are not part of the tracked product contract.

## Move To Google Drive

Move or mirror these into the Shakti Drive library before Airtable mapping:

- Source media: audio, video, images, transcript source files, and visual campaign exports.
- Client-facing PDFs and decks.
- Retreat, payment, SOW, and operating-package exports.
- Google AI Studio exports and walkthrough recordings.
- Legacy vault/library folders that are source collections rather than application code.

Drive should become the living file library. Airtable should then store metadata records that point back to approved Drive URLs.

## Enter GitHub Deliberately

Promote files into GitHub only when they are durable product, documentation, or app assets:

- App source under `apps/`.
- Architecture, schema, handoff, design, deployment, and roadmap docs under `docs/`.
- Small stable app assets that are required for the UI to build.
- Operator instructions such as `README.md`, `DESIGN.md`, and tracked agent docs.
- Schema constants and integration contracts that mirror approved docs.

## Review Before Adding

Before running broad `git add .`, check:

```bash
git status --short
```

Then stage only intentional source/docs changes. Do not bulk-add root-level media, exports, recordings, or generated graph output.

## Next Backend Prep Step

After Drive review, create Airtable records for approved Drive assets using the schema in:

```text
docs/architecture/SHAKTI-SHALA-AIRTABLE-SCHEMA-DRAFT.md
```

Initial mapping priority:

```text
Seekers
Library Assets
Practices
Initiation Keys
Retreats
Retreat Applications
Environmental Memory
```

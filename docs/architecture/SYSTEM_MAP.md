# Shakti System OS — System Map

## Purpose

Shakti System OS is a sanctuary application backed by a living Vault, an operational database, and a human operations dashboard.

## Layers

```text
Sanctuary App
apps/web
Seeker-facing experience and future Temple Library surface.

Vault Layer
Google Drive
Source files, legacy intelligence, recordings, PDFs, worksheets, ceremony assets, and media.

Operational Database
Airtable
Metadata, seeker readiness, access keys, retreat pipeline, and environmental memory.

Human Dashboard
Notion
Team operations, decisions, responsibilities, and delivery rhythm.

Context Layer
Graphify
Durable map of repo docs, app code, architecture, and relationships.
```

## Current Rule

Do not wire live secrets directly into the UI. Integration code should pass through typed service boundaries and environment config.

## Source Of Truth

- App code: `apps/web`
- Airtable schema draft: `docs/architecture/SHAKTI-SHALA-AIRTABLE-SCHEMA-DRAFT.md`
- Drive map: `docs/drive/SHAKTI-SHALA-VAULT-DRIVE-MAP.md`
- Legacy vault structure: `docs/drive/SHAKTI-LEGACY-VAULT-FOLDER-STRUCTURE.md`
- Untracked asset review: `docs/handoff/UNTRACKED-ASSETS-REVIEW.md`

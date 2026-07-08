# Living Vault Intake SOP

## Purpose

This playbook prepares the repeatable intake path before real teaching assets are published into Shakti Shala.

```text
Google Drive -> Vault Metadata -> Airtable -> BackendRepository -> Shakti Shala
```

The app should not receive raw uploads directly. Every asset moves through review, metadata, Airtable shape, and read-only app boundaries first.

## Current State

The Temple Library exists:

```text
Shakti Legacy Vault / 04_TEMPLE_LIBRARY
```

The first priority lanes are currently empty:

```text
00_FOUNDATIONS
01_PRACTICES
```

Current sample records use internal prototype assets from:

```text
Shakti Legacy Vault / 10_UPLOAD_HERE_FIRST
```

These sample records are system-test records only.

## Intake Rules

- Do not treat prototype archives, walkthrough videos, or build files as public teaching content.
- Mark prototype and system assets as `Internal`, `Needs Review`, and `Internal`.
- Do not write to Airtable from the app during this phase.
- Do not expose private Airtable or Drive tokens in browser code.
- Human review decides whether an asset becomes teaching content.
- Only approved records should eventually feed `BackendRepository`.

## Intake Steps

1. Place new files in:

```text
Shakti Legacy Vault / 10_UPLOAD_HERE_FIRST / 01_RAW_UPLOADS
```

2. Create or refresh a Drive inventory snapshot with:

```text
Name
Folder or File
Drive ID
Drive URL
Source Path
File Type
Media Type
Access Level
Publishing Status
Confidentiality
Notes
```

3. Classify each asset as one of:

```text
Teaching Content
System Build Asset
Design Asset
Transcript Candidate
Needs OCR
Needs Human Review
Duplicate / Archive
```

4. Prepare Vault metadata:

```text
Title
Description
Drive URL
Source Folder
Media Type
File Type
Theme
Keywords
Goddess / Archetype
Moon Phase
Practice Type
Access Level
Publishing Status
Confidentiality
Notes
```

5. Prepare Airtable `Library Assets` records as fixtures or drafts only.

6. After human approval, route assets to the correct Temple Library lane.

7. Keep app consumption read-only through:

```text
BackendRepository
```

## Current Local Fixtures

Code fixtures live in:

```text
apps/web/src/data/vaultIntakeSamples.ts
apps/web/src/data/libraryAssetSeedFixtures.ts
```

Execution check:

```bash
npm run check:vault
```

The check verifies that current sample records remain internal review records and that `VaultSyncService` can produce Airtable-shaped `Library Assets` drafts without live writes.

## Completion Standard

A batch is intake-ready when:

- all items have Drive IDs and source paths
- all records have metadata drafts
- all records have review status
- all records are marked with confidentiality
- no public app content changes are required
- Airtable writes remain manual or separately approved

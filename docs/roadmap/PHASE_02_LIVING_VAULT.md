# Phase 02 — Living Vault Activation

## Purpose

Phase 02 begins once the Shakti Shala app has a stable read-only backend boundary.

The mission is no longer to add more visual features.

The mission is to make Sheetal's real body of work flow through the system.

```text
Google Drive → Vault Metadata → Airtable → BackendRepository → Shakti Shala
```

This phase proves that a real folder of Sheetal's teachings can become part of the living sanctuary without manually hardcoding content into React.

---

# Core Thesis

```text
The app is not the product.
The living body of wisdom is the product.
The app is the sanctuary that receives it.
```

The Temple Library should eventually feel like a living archive, not a static content library.

---

# Phase 02 Success Condition

Phase 02 is successful when one complete content lane moves end-to-end:

```text
1. A real Drive folder is selected.
2. Assets are scanned or manually referenced.
3. Draft metadata is created.
4. Airtable Library Asset records are created or prepared.
5. Approved records are readable through BackendRepository.
6. The app can consume the records without directly knowing about Airtable.
7. The process is documented so the team can repeat it.
```

---

# Primary Source Layer

## Google Drive

Working root:

```text
Shakti Legacy Vault
```

Priority content area:

```text
04_TEMPLE_LIBRARY
```

Initial subfolders:

```text
00_FOUNDATIONS
01_PRACTICES
02_MEDITATIONS
03_AUDIO_REFLECTIONS
04_CEREMONIES
05_MOON_RHYTHM
06_GODDESS_PATHWAYS
07_RETREAT_GUIDES
08_WORKBOOKS_AND_JOURNAL_PROMPTS
09_TEACHER_RESOURCES
```

---

# First Activation Lane

The first lane should be intentionally small.

Recommended first lane:

```text
00_FOUNDATIONS
```

Why:

- lower sensitivity
- easier for early seekers
- likely needed for Visitor / Seeker access
- safest pathway to test the Vault pipeline
- establishes public / foundational content boundaries before deeper chambers

If `00_FOUNDATIONS` does not contain usable material yet, use the next strongest available folder from `04_TEMPLE_LIBRARY` and document the choice.

---

# Living Vault Pipeline

## Step 01 — Select Folder

Choose a Drive folder inside the Temple Library.

Record:

```text
Folder Name
Folder ID / URL
Purpose
Sensitivity
Expected Access Level
Owner
Review Status
```

---

## Step 02 — Inventory Assets

List all direct files in the selected folder.

Capture:

```text
Name
Drive URL
File Type
Mime Type
Source Folder
Created / Modified Date
```

Do not deeply process all files at once.

Start with a small batch.

---

## Step 03 — Draft Metadata

For each asset, prepare metadata:

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

AI may suggest values.

Human review decides final values.

---

## Step 04 — Airtable Record

Create or prepare a `Library Assets` record.

Initial status should usually be:

```text
Needs Review
Needs Transcript
Needs Summary
Ready To Tag
```

Only human-approved records should become:

```text
Approved
Published
```

---

## Step 05 — Backend Read

The app should read only through:

```text
BackendRepository
```

React must not call:

```text
AirtableService
AirtableReadOnlyClient
LibraryAssetReadAdapter
```

directly.

---

## Step 06 — App Consumption

Once approved records can be read, they may feed:

```text
LibraryRoom
PracticeRoom
ChambersRoom
ReflectionPoolRoom
JourneyRoom
RetreatRoom
```

No visuals need to change during this phase.

The user experience should quietly become more real.

---

# Operating Boundaries

## No Writes From App Yet

The app should not write seeker data, journal content, environmental memory, or payment state yet.

## No Private Token In Browser Production

A Vite frontend must not expose a private Airtable token in production.

Use read-only architecture, mock fallback, or a future secure proxy.

## No Automatic Publishing

AI-generated metadata does not equal approval.

Sheetal/team must approve what becomes seeker-facing.

---

# Human Review Standard

Before any asset is published into the Shakti Shala experience, review:

```text
Is this lineage-sensitive?
Is this public, member-only, retreat-only, or internal?
Does this require context before use?
Does this need a transcript?
Does this need Sheetal approval?
Does it belong in the Temple Library or another folder?
```

---

# Relationship To Hanzo

This phase is also the first real proof of the future Hanzo Vault Engine pattern.

But Hanzo is not built inside Shakti.

Current rule:

```text
Build concrete in Shakti.
Extract abstract into Hanzo later.
```

Phase 02 produces reusable learning for:

```text
Shakti System OS
Howling MŪNE
Major AI Mindset
Wild
Future client vaults
```

---

# Sprint 8 Recommendation

## Sprint 8 — First Living Vault Lane

Goal:

Activate the first Drive → Airtable → BackendRepository content lane.

Tasks:

1. Select first Temple Library folder.
2. Add a Drive inventory document for that folder.
3. Create sample Library Asset records in Airtable.
4. Add `LibraryAssetReadAdapter` execution check against mock + live-shaped records.
5. Add docs explaining the repeatable library pipeline.
6. Keep app writes disabled.
7. Do not change visuals.
8. Run lint, TypeScript, build, backend checks, and Graphify.

---

# Operating Reminder

```text
Do not make the system impressive before it is trustworthy.
Do not make the sanctuary louder before it becomes real.
```

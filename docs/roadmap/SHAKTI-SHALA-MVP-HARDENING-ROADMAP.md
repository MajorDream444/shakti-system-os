# Shakti Shala OS — MVP Hardening Roadmap

## Status

Branch: `MajorDream444-patch-1`

Purpose: stabilize the AI Studio V2 export into a production-ready MVP without adding unnecessary new features.

This branch is for hardening, structure, and integration readiness.

It is not for expanding the world endlessly.

---

# Core Principle

```text
Make the sanctuary real.
Do not make it noisy.
```

The V2/V4 experience has successfully moved from app interface into living sanctuary.

The next work is not more visual spectacle.

The next work is:

- clean architecture
- real content
- real data pathways
- real access logic
- real stewardship flows
- handoff-ready documentation

---

# What Already Exists

## Completed Prototype Layers

- Temple Gates
- Courtyard
- Fire Circle
- Archive / Temple Library
- Goddess Chambers
- Reflection Pool
- Moon Observatory / Journey Room
- Retreat / Pilgrim's Hall
- Environmental Canopy
- Environmental Memory
- Prayer Lamps
- Prayer Flags
- Environmental Ritual foundation
- Initiation Key model
- Retreat Passage model
- Local persistence

---

# Freeze Rule

Feature expansion should pause after the Environmental Ritual system is stable.

Do not add:

- points
- badges
- streaks
- XP
- loud notifications
- generic app rewards
- shallow paywall language
- SaaS pricing pages
- crypto-forward language

The sanctuary should witness devotion, not gamify it.

---

# Phase 01 — Production Hardening

## Goal

Prepare the AI Studio export for reliable development, deployment, and team handoff.

## Tasks

### 1. Clean AI Studio boilerplate

Replace generic AI Studio README language with Shakti-specific documentation.

Remove or rewrite:

- generic app banner
- AI Studio deployment copy
- placeholder project name
- unused example comments

Keep AI Studio source attribution internally if needed, but do not make it the public identity of the project.

---

### 2. Confirm app structure

Target structure:

```text
apps/
  shakti-shala/
    src/
    public/
    package.json
    vite.config.ts
    tsconfig.json

docs/
  architecture/
  design/
  drive/
  handoff/
  prompts/
  roadmap/
  playbooks/
```

Do not move files until the current deployment path is understood.

---

### 3. Add service layer

Create stable service boundaries before connecting external tools.

Target:

```text
src/services/
  PersistenceService.ts
  RitualService.ts
  LibraryService.ts
  AccessService.ts
  AirtableService.ts
  DriveService.ts
```

Current persistence may remain localStorage, but components should not depend directly on storage implementation long-term.

---

### 4. Separate data from components

Move hardcoded data toward:

```text
src/data/
  practices.ts
  pathways.ts
  chambers.ts
  moon.ts
  retreat.ts
  offerings.ts
```

This prepares the app for Google Drive and Airtable integration.

---

### 5. Environment configuration

Update `.env.example` toward future integration readiness:

```text
VITE_GEMINI_API_KEY=
VITE_AIRTABLE_BASE_ID=
VITE_AIRTABLE_TOKEN=
VITE_STRIPE_PUBLIC_KEY=
VITE_GOOGLE_DRIVE_ROOT=
VITE_ENVIRONMENT=
```

Do not commit secrets.

---

# Phase 02 — Temple Library Integration

## Goal

Begin replacing placeholder content with real Sheetal source material.

## Source System

Google Drive:

```text
Shakti Legacy Vault / 04_TEMPLE_LIBRARY
```

Key folders:

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

## App Destination

- LibraryRoom
- PracticeRoom
- ChambersRoom
- ReflectionPoolRoom
- JourneyRoom
- RetreatRoom

---

# Phase 03 — Airtable Metadata Layer

## Goal

Create the operational backend that lets the Vault become searchable, categorized, and permission-aware.

## Recommended Tables

```text
Seekers
Library Assets
Practices
Goddess Pathways
Initiation Keys
Offerings
Environmental Memory
Retreats
Journal Index
Content Queue
```

## Initial Metadata Fields

```text
Asset ID
Title
Description
Drive URL
Source Type
File Type
Theme
Keywords
Goddess / Archetype
Moon Phase
Practice Type
Container / Offer
Access Level
Readiness Level
Retreat Relevance
Transcript Status
AI Summary Status
Publishing Status
Confidentiality
Usage Rights
Related Assets
```

---

# Phase 04 — Stewardship / Payment Layer

## Goal

Connect payment without breaking the sanctuary language.

Use Stripe quietly beneath the surface.

Public-facing language should use:

- offering
- stewardship
- key
- passage
- circle
- preparation
- readiness

Avoid:

- buy now
- upgrade
- subscribe
- pro
- premium
- unlock all
- limited-time offer

---

# Phase 05 — Retreat Pipeline

## Goal

Turn RetreatRoom into a real preparation and readiness system.

Pipeline:

```text
Interest
Application
Review
Accepted
Deposit / Offering
Preparation
Travel
Arrival
Integration
Return Home
```

Retreats should be routed through Airtable and human review.

Automation should reduce friction, not replace discernment.

---

# Phase 06 — Hanzo Compatibility Later

## Goal

Do not build Hanzo Core inside this repo.

Instead, keep Shakti clean enough to plug into Hanzo later.

Future provider interfaces:

```text
LibraryProvider
PersistenceProvider
MetadataProvider
AccessProvider
SearchProvider
RitualMemoryProvider
```

Current rule:

```text
Build concrete. Extract abstract later.
```

---

# Immediate Next Sprint

## Sprint Name

`MVP Stabilization 01`

## Outcomes

1. Confirm Vercel deployment path.
2. Clean README.
3. Create service layer.
4. Stabilize local persistence behind a PersistenceService.
5. Document current component map.
6. Prepare Airtable schema draft.
7. Preserve the sanctuary language.

---

# Review Standard

Before merging into main, confirm:

- App builds.
- Vercel preview succeeds.
- No secrets are committed.
- Public language feels like Shakti, not SaaS.
- Payment language remains stewardship-based.
- Source material still belongs in Drive.
- Metadata belongs in Airtable.
- App source belongs in GitHub.
- Future Hanzo compatibility remains possible.

---

# Operating Reminder

```text
The medicine is already real.
The system protects, clarifies, and stewards it.
```

# Shakti Legacy Vault — Google Drive Folder Structure

## Status

**Created in Google Drive as the working Vault intake and organization layer for Sheetal Kandola / Shakti Shala.**

This structure clones the reusable client-vault pattern used for other Hanzo-adjacent systems while adapting the language to Shakti Shala, Temple Library, readiness, ceremony, and initiation-based access.

---

# 1. Root Folder

```text
Shakti Legacy Vault
```

Role:

- temporary and working asset vault
- single deposit point for Sheetal and team
- future source layer for Temple Library / Shakti Shala Vault
- staging area before Airtable metadata, NotebookLM, Graphify, and app access logic are fully connected

Current root contains the existing design artifacts plus the newly created folder system.

---

# 2. Top-Level Structure

```text
00_ADMIN
01_BRAND
02_WEBSITE
03_CLIENT_FLOW_ENGINE
04_TEMPLE_LIBRARY
05_CONTENT
06_OFFERS
07_COMMUNITY_AND_CLIENT_WORK
08_BUSINESS
09_MEDIA_EXPORTS
10_UPLOAD_HERE_FIRST
11_AI_WORKSPACE
12_ACCESS_AND_KEYS
99_ARCHIVE
```

---

# 3. Folder Roles

## 00_ADMIN

Purpose:

- agreements
- credentials notes without passwords
- project setup
- team notes
- handoff references
- access documentation

Do not place client-facing teachings here.

---

## 01_BRAND

Purpose:

- brand voice
- typography
- colors
- photography direction
- logos
- design references
- visual identity notes
- brand constitution exports

Related repo references:

```text
DESIGN.md
docs/design/SHAKTI-DESIGN-CONSTITUTION.md
```

---

## 02_WEBSITE

Purpose:

- landing page assets
- Start Your Shakti Path site content
- Shakti Shala Vault prototypes
- AI Studio exports
- website screenshots
- payment / sales page copy later

This is where the public-facing site assets are staged, not where the full teaching library lives.

---

## 03_CLIENT_FLOW_ENGINE

Purpose:

- Start Your Shakti Path
- self-audit
- application flow
- readiness forms
- lead routing
- community onboarding
- retreat readiness logic

Related tools:

- Google Forms
- Airtable
- Notion
- future app routing

---

## 04_TEMPLE_LIBRARY

Purpose:

Primary working library for teachings, practices, ceremonies, goddess pathways, moon rhythm, audio, and retreat prep.

Substructure:

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

This folder is the direct precursor to the Shakti Shala Vault product experience.

---

## 05_CONTENT

Purpose:

- social content
- email / newsletter copy
- reels
- captions
- article drafts
- podcast outputs
- short-form teaching cuts

Content may be sourced from the Temple Library, but finished social/editorial assets belong here.

---

## 06_OFFERS

Purpose:

- offer ladder
- sales copy
- container descriptions
- pricing notes
- membership offers
- retreat offers
- paid access / initiation key mapping

Future commerce / payment gateway logic should connect here.

---

## 07_COMMUNITY_AND_CLIENT_WORK

Purpose:

- community onboarding
- circle assets
- workshop materials
- participant resources
- testimonials
- community rhythms
- group support docs

This folder should not become a private therapy record archive.

---

## 08_BUSINESS

Purpose:

- operations
- team planning
- finance references
- legal / admin docs
- business strategy
- partnerships

---

## 09_MEDIA_EXPORTS

Purpose:

- final exports
- thumbnails
- MP4s
- downloadable PDFs
- presentation-ready assets
- website-ready images
- client-ready versions

Raw materials should not start here.

---

## 10_UPLOAD_HERE_FIRST

Purpose:

The team’s single intake point.

Instruction:

```text
If unsure where something belongs, upload it here first.
```

Substructure:

```text
01_RAW_UPLOADS
02_NEEDS_REVIEW
03_NEEDS_TRANSCRIPT_OR_OCR
04_READY_TO_TAG
05_PROCESSED
```

This is the folder that allows the team to move fast without breaking the system.

---

## 11_AI_WORKSPACE

Purpose:

AI processing and enrichment layer.

Substructure:

```text
01_METADATA_TABLES
02_TRANSCRIPTS
03_AI_SUMMARIES
04_NOTEBOOKLM_SOURCES
```

This is where content becomes AI-ready before it is activated into the Vault experience.

---

## 12_ACCESS_AND_KEYS

Purpose:

Working folder for access levels, future tokenized access, membership stages, and permission mapping.

Substructure:

```text
01_VISITOR
02_SEEKER
03_PRACTITIONER
04_INITIATE
05_TEMPLE_CIRCLE
06_GUIDE
07_TEACHER
```

Public-facing language should remain ceremonial and human.

Internal logic may later include:

- token-gated access
- wallet status
- Stripe membership state
- Airtable access status
- retreat participation credential
- invitation-only access

---

## 99_ARCHIVE

Purpose:

- old versions
- outdated drafts
- retired assets
- source files that should not be deleted

Do not use as a dumping ground.

---

# 4. Intake Workflow

## Phase 1 — Deposit

Team uploads everything to:

```text
10_UPLOAD_HERE_FIRST / 01_RAW_UPLOADS
```

## Phase 2 — Review

Assets move to:

```text
02_NEEDS_REVIEW
```

Decision questions:

- What is this?
- Who owns it?
- Is it public, member-only, retreat-only, or internal?
- Does it need transcription?
- Does it belong in Temple Library, Content, Website, Offers, Business, or Archive?

## Phase 3 — Extraction

If audio/video/PDF/image needs extraction:

```text
03_NEEDS_TRANSCRIPT_OR_OCR
```

Outputs go to:

```text
11_AI_WORKSPACE / 02_TRANSCRIPTS
11_AI_WORKSPACE / 03_AI_SUMMARIES
```

## Phase 4 — Metadata

When ready:

```text
04_READY_TO_TAG
```

Metadata should eventually be captured in Airtable.

## Phase 5 — Routing

Assets route into the correct destination folder.

Processed intake can move to:

```text
05_PROCESSED
```

---

# 5. Metadata Schema Draft

Every meaningful asset should eventually receive:

```text
Asset ID
Title
Description
Source Type
File Type
Drive URL
Owner
Creator
Date Created
Date Uploaded
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
Related Airtable Record
Related Notion Page
Related Repo Path
```

---

# 6. Relationship To Hanzo Core

This Shakti Vault should stand on its own now.

It should also be clean enough to plug into Hanzo later.

Current discipline:

```text
Build concrete.
Extract abstract later.
```

Shakti-specific language stays Shakti-specific.

Reusable patterns should be captured as shared standards later.

---

# 7. Immediate Next Actions

1. Share the root Vault folder with Sheetal and team.
2. Ask team to upload all source materials into `10_UPLOAD_HERE_FIRST / 01_RAW_UPLOADS`.
3. Do not manually over-sort before review.
4. Create Airtable asset table using the metadata schema.
5. Connect transcripts and summaries into NotebookLM / AI workspace.
6. Decide which assets are open, seeker, practitioner, initiate, circle, guide, or teacher level.
7. Map paid / tokenized access after the content library is clean.

---

# 8. Operating Reminder

```text
Do not let sacred source material become random storage.
Turn it into a mapped Temple Library.
```
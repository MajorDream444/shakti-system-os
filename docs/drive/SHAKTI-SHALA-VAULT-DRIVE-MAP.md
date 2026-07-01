# Shakti Shala Vault — Google Drive Routing Map

## Status

**Working routing map for existing Google Drive assets.**

This document maps the Shakti Shala Vault concept to the current Google Drive production layer so the repo, Drive, Notion, Airtable, and future app build stay aligned.

Do not create new Drive folders until this map is reviewed.

---

# 1. System Roles

```text
Google Drive = working asset vault + collaborative production layer
Notion = human-readable command center / decisions / doctrine notes
Airtable = structured operational backend / source asset tracker
GitHub = source-of-truth docs and build implementation
Graphify = context graph across doctrine, files, workflows, and app structure
```

---

# 2. Confirmed Drive Folders

Current Drive search surfaced these folders and assets:

```text
Shakti Library
Shakti Shala Readiness Tracker & CRM
Shakti Slides
Shakti Shala E-Book Covers
Shakti Brand Voice
Shakti Shala Workshops
```

These should be treated as the first working Drive layer for the Vault.

---

# 3. Folder Role Map

## Shakti Library

**System role:** primary Vault / Temple Library working folder.

Should contain or route to:

- teaching source material
- ceremony recordings
- goddess pathway materials
- practice assets
- transcripts
- audio companions
- final Temple Library files
- internal archive references

Should not become:

- a messy upload dump
- social media working folder
- unrelated brand materials folder

Related repo path:

```text
docs/design/SHAKTI-SHALA-VAULT.md
docs/schemas/temple-library-source-assets.md later
```

Related Airtable table:

```text
Temple Library / Source Assets
```

---

## Shakti Shala Readiness Tracker & CRM

**System role:** readiness, seeker pathway, lead routing, self-audit, and retreat qualification layer.

Should contain or route to:

- Start Your Shakti Path form responses
- self-audit responses
- pathway assignment
- readiness notes
- retreat readiness status
- follow-up tracking

Should not become:

- content library
- social content calendar
- doctrine archive

Related repo paths:

```text
docs/schemas/readiness-scoring.md later
docs/workflows/self-audit-routing.md later
docs/design/SHAKTI-SHALA-VAULT.md
```

Related Airtable tables:

```text
Leads / Seekers
Self-Audit Responses
Readiness Scoring
Retreat Pipeline
```

---

## Shakti Slides

**System role:** slide decks, teaching decks, presentation artifacts, and source material for ebooks / Vault pages.

Should contain:

- Sankalpa slides
- workshop decks
- teaching presentations
- source PDFs
- deck exports
- client presentation material

Related Vault use:

- The Shakti Sankalpa
- Goddess Pathway
- Moon Rhythm Guide
- Retreat preparation guides

Related repo paths:

```text
docs/ebooks/
docs/podcasts/
docs/source-reviews/
```

---

## Shakti Shala E-Book Covers

**System role:** visual production folder for Temple Library guide covers.

Should contain:

- cover direction docs
- image generations
- selected cover art
- front / back prompt docs
- typography tests
- print spread layouts

Related Vault use:

```text
Temple Library doorway texts
```

Current ebook system:

```text
Start Your Shakti Path
The Moon Rhythm Guide
The Goddess Pathway
The Shakti Sankalpa
Maa Kali Shadow Descent
Retreat Begins Before Arrival later
```

Related repo paths:

```text
docs/ebooks/
docs/design/
```

---

## Shakti Brand Voice

**System role:** language rules, public-facing voice, tone standards, CTA banks, and copy guardrails.

Should contain:

- brand voice guidelines
- verbiage architecture
- CTA banks
- words to use / avoid
- copy examples
- client-facing language references

Related repo paths:

```text
README.md
DESIGN.md
docs/prompts/
docs/copy/
```

This folder protects the Vault from generic wellness language.

---

## Shakti Shala Workshops

**System role:** workshop content and possible source assets for Temple Library / practices / audio reflections.

Should contain:

- workshop recordings
- workshop decks
- transcripts
- worksheets
- participant-facing material
- future Vault modules

Related Vault use:

- Practice pages
- audio teachings
- ceremony archives
- pathway content

Related repo paths:

```text
docs/source-reviews/
docs/temple-library/
```

---

# 4. Vault Source Asset Record

Every useful Drive item should eventually be represented as a structured record.

Suggested fields:

```text
Asset Title
Drive Folder
Drive URL
Source Type
Goddess / Archetype
Theme
Practice Type
Readiness Level
Offer Pathway
Access Tier
Transcript Status
Clip Potential
Publishing Status
Owner
Protection Notes
Related Repo Path
Related Notion Page
Related Airtable Record
```

---

# 5. Initial Vault Content Lanes

## Lane 1 — Orientation

Assets:

```text
Start Your Shakti Path
Self-Audit
Brand Voice
Front-door copy
```

Vault role:

```text
Open Gate / first practice orientation
```

## Lane 2 — Moon Rhythm

Assets:

```text
Moon Rhythm Guide
New Moon materials
Full Moon materials
ceremony recordings
```

Vault role:

```text
community rhythm / recurring practice
```

## Lane 3 — Goddess Pathways

Assets:

```text
Navratri recordings
Goddess teaching decks
Goddess photoshoot assets
Secret Goddess Ceremony materials
```

Vault role:

```text
archetypal practice pathways
```

## Lane 4 — Sankalpa

Assets:

```text
The Shakti Sankalpa ebook
Sankalpa slides
podcast / audio companion
40-day tracker
```

Vault role:

```text
devotional vow / 40-day practice guide
```

## Lane 5 — Shadow Descent

Assets:

```text
Maa Kali Shadow Descent sessions
Kali teaching clips
shadow integration prompts
```

Vault role:

```text
deep practice / shadow work / integration
```

## Lane 6 — Retreat Readiness

Assets:

```text
retreat prep guides
readiness forms
Bali / India / Himalaya materials
integration prompts
```

Vault role:

```text
retreat discernment / pre-retreat pathway
```

---

# 6. Immediate Cleanup Recommendation

Do not reorganize Drive yet.

First create:

```text
Temple Library / Source Assets tracker
```

Then tag what already exists before moving files.

This avoids breaking links, duplicating assets, or confusing Sheetal’s team.

---

# 7. Future Drive Standards

Every production asset should have:

- clear title
- version number if iterative
- date where useful
- owner / creator
- status
- related system lane

Example naming:

```text
SHAKTI-SANKALPA_EBOOK_v0.2_2026-06-30.pdf
MOON-RHYTHM-GUIDE_outline_v0.1.md
MAA-KALI-SHADOW-DESCENT_session-01_transcript_raw.docx
GODDESS-PATHWAY_navratri-source-map_v0.1.xlsx
```

---

# 8. Handoff Note

The Drive is already becoming the operational asset layer for Shakti System OS.

The goal is not to make Drive beautiful.
The goal is to make Drive legible enough that Notion, Airtable, GitHub, and the future Vault app can understand what each asset is for.

```text
Do not let sacred source material become random storage.
Turn it into a mapped Temple Library.
```
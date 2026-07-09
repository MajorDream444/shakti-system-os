# Content Transformation Stages

## Status

Sprint 11 production standard.

This document defines how one teaching changes form while preserving the same
doctrine.

## Transformation Principle

Each stage should reduce noise, increase clarity, and preserve lineage.

```text
Source fidelity first.
Derivative usefulness second.
Channel formatting third.
```

## Stage 1 — Recording

Purpose:
Capture the original teaching, conversation, class, or reflection.

Required metadata:

- title
- speaker / teacher
- date recorded
- Drive URL
- duration
- confidentiality
- consent / usage rights
- related offer or pathway

Do not publish from this stage.

## Stage 2 — Transcript

Purpose:
Create a raw text record of the teaching.

Allowed actions:

- transcribe audio or video
- preserve timestamps when useful
- capture uncertain phrases for review
- flag inaudible sections

Do not correct doctrine silently.

## Stage 3 — Clean Transcript

Purpose:
Create a readable version that keeps the teaching intact.

Allowed cleanup:

- remove filler words
- fix obvious transcription errors
- standardize speaker labels
- add paragraph breaks
- preserve key language
- mark uncertain terms

Required flags:

- Sanskrit or lineage-sensitive terms
- names of deities / archetypes
- mantra references
- medical, therapeutic, or trauma-related claims
- retreat or offer claims

## Stage 4 — Doctrine Notes

Purpose:
Extract the underlying teaching architecture.

Doctrine notes should identify:

- central thesis
- emotional problem
- spiritual / philosophical frame
- vocabulary that must be preserved
- what the teaching is not saying
- pathway relevance
- readiness implications
- practice implications
- review risks

## Stage 5 — Temple Library Record

Purpose:
Create the structured metadata record that lets the teaching enter the Living
Vault.

Minimum fields:

- Asset ID
- Title
- Description
- Drive URL
- Source Folder
- Media Type
- File Type
- Theme
- Keywords
- Goddess / Archetype
- Moon Phase
- Practice Type
- Access Level
- Publishing Status
- Confidentiality
- Notes

Publishing status remains `Needs Review` until human approval is complete.

## Stage 6 — Podcast Episode

Purpose:
Turn the teaching into a spacious audio narrative or dialogue.

Podcast output should include:

- episode title
- episode thesis
- host format
- opening scene
- core teaching arc
- reflection / practice doorway
- next doorway in Shakti Shala

Do not over-explain Sanskrit without review.

## Stage 7 — E-book Chapter

Purpose:
Turn the teaching into a durable written chapter.

Chapter output should include:

- chapter thesis
- opening doorway
- teaching body
- key terms
- integration section
- reflection questions
- practice prompt
- connection to the larger book

## Stage 8 — Website Teaching

Purpose:
Create a public-facing teaching page or article.

Website output should:

- orient the reader quickly
- preserve precise language
- avoid funnel-heavy framing
- connect to the appropriate pathway
- stay within approved public claims

## Stage 9 — Reflection Questions

Purpose:
Create inward-facing prompts for seekers.

Question types:

- self-inquiry
- body awareness
- readiness
- devotion
- integration
- pathway discernment

Do not create prompts that pressure disclosure of private trauma.

## Stage 10 — Social Carousel

Purpose:
Create a visual teaching sequence for social platforms.

Carousel should include:

- hook slide
- teaching distinction
- 3 to 5 core insights
- reflection slide
- gentle next doorway

Do not flatten the teaching into slogan-only content.

## Stage 11 — Instagram Reel

Purpose:
Create a short-form teaching moment from the source.

Reel brief should include:

- core line
- visual direction
- voiceover or on-camera option
- caption thesis
- safe call to action
- approval notes

## Stage 12 — Newsletter

Purpose:
Create a relationship-forward teaching email.

Newsletter should include:

- subject line options
- opening personal / teaching doorway
- core teaching
- reflection prompt
- next step
- approved links

## Stage 13 — Graphify Node

Purpose:
Make the teaching visible to the repo knowledge graph.

Required action:

```bash
graphify update .
```

The graph should help future agents find the teaching, its derivatives, and its
relationship to the Vault, podcast, e-book, and sanctuary.

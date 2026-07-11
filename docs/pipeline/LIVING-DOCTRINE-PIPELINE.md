# Living Doctrine Pipeline

## Status

Sprint 11 production manual.

This document defines the repeatable path for turning one approved teaching into
a full Shakti experience ecosystem.

## Objective

Prove that one authentic teaching can move through the entire Living
Intelligence OS without losing its meaning.

First asset:

```text
The Vow Beneath the Path
```

## Core Thesis

```text
One source becomes many derivative experiences.
```

The pipeline does not create random content from a prompt. It preserves a source
teaching, extracts doctrine, creates approved derivative experiences, and routes
each experience to the right operational layer.

## Release 0.3 Success Path

```text
Raw Source
  -> Voice Recording
  -> Transcript
  -> Doctrine Review
  -> Human Approval
  -> Living Library Asset
  -> Temple Library
  -> Derivative Experiences
```

Once this works once, it becomes the repeatable Living Doctrine factory for
future teachings.

Not content. Experiences.

Every derivative experience should point back to the same source doctrine. That
prevents drift.

## Derivative Experiences

For `The Vow Beneath the Path`, the factory output is:

```text
1 Source Recording
  -> 1 Clean Transcript
  -> 1 Doctrine Summary
  -> 1 Temple Library Record
  -> 1 Podcast Episode
  -> 1 Temple Guide (ebook)
  -> 1 Reflection Practice
  -> 1 Journal Prompt Set
  -> 1 Moon Rhythm Connection
  -> 1 Social Carousel
  -> 1 Short-form Video
  -> 1 Newsletter
  -> 1 Graphify Knowledge Node
```

## Knowledge Maturity Lifecycle

Every `Library Assets` record should carry a `Knowledge Maturity` value. This
tracks production lifecycle. It is separate from `Publishing Status`, which
controls visibility and approval.

```text
Raw Recording
  -> Transcript Generated
  -> Transcript Reviewed
  -> Doctrine Extracted
  -> Media Tagged
  -> Library Ready
  -> Sheetal Approved
  -> Published
  -> Repurposed Complete
```

## Required Inputs

Each pipeline run needs:

- source title
- source owner
- Drive file ID and URL
- original recording or source document
- raw transcript if available
- approval owner
- intended Temple Library lane
- confidentiality level
- publishing status
- target derivative experiences
- review notes

## Pipeline Stages

| Stage | Owner | Output |
| --- | --- | --- |
| Source Intake | Operations | Drive record and intake note |
| Transcript Capture | Operations / AI-assisted | raw transcript |
| Transcript Cleanup | Editorial | clean transcript |
| Doctrine Extraction | Strategy / AI-assisted | doctrine notes and review flags |
| Human Approval | Sheetal/team | approved source and doctrine gate |
| Library Metadata | Operations | Airtable `Library Assets` record |
| Longform Development | Editorial | podcast and Temple Guide / e-book chapter |
| Web Teaching | Editorial / Web | website-ready teaching page draft |
| Reflection Layer | Editorial | reflection practice and journal prompt set |
| Moon Rhythm Layer | Editorial / practice | moon rhythm connection |
| Social Layer | Content | carousel, reel brief, caption |
| Newsletter Layer | Content | email / Substack draft |
| Knowledge Graph | Repo / Graphify | committed docs and refreshed graph |

## Future AI Orchestration

The pipeline should eventually be supported by specialized agents with narrow
responsibilities:

```text
Archivist
  -> Transcriber
  -> Doctrine Extractor
  -> Librarian
  -> Publisher
  -> Social Storyteller
  -> Community Guide
```

These agents may prepare, classify, draft, and hand off work. They may not
publish or approve doctrine.

Canonical role standard:

```text
docs/pipeline/AI-ORCHESTRATION-ROLES.md
```

## Canonical Shakti Run

```text
Title: The Vow Beneath the Path
Current source docs:
  docs/podcasts/episode-04-the-vow-beneath-the-path.md
  docs/podcasts/episode-04-transcript-vow-beneath-the-path.md

Airtable:
  Base: Shakti System OS
  Table: Library Assets
  Asset ID: ASSET-VOW-BENEATH-PATH-001
  Record ID: reckBd6wnBYL09jsZ
  Status: Needs Review
  Knowledge Maturity: Transcript Generated
```

## Publication Rule

No output becomes public until:

- the source is reviewed
- doctrine notes are approved
- Sanskrit / lineage-sensitive language is confirmed
- the Airtable record is marked `Approved` or `Published`
- the Drive URL is present
- the output has a clear channel owner

## Output Ownership

| Output | Source Of Truth |
| --- | --- |
| Recording | Google Drive |
| Transcript | Google Drive / GitHub docs if approved for repo |
| Clean Transcript | GitHub docs and/or Drive |
| Doctrine Notes | GitHub docs |
| Temple Library Record | Airtable |
| Podcast Episode | GitHub docs / production workspace |
| Temple Guide / E-book Chapter | GitHub docs / manuscript folder |
| Website Teaching | GitHub docs before app implementation |
| Reflection Practice | GitHub docs |
| Journal Prompt Set | GitHub docs |
| Moon Rhythm Connection | GitHub docs |
| Social Carousel | content production workspace |
| Short-form Video | content production workspace |
| Newsletter | draft platform / GitHub planning doc |
| Graphify Node | Graphify output after commit/update |

## Completion Standard

Sprint 11 is complete when the pipeline manual exists and the first teaching has
a documented path from source to derivative experiences.

The first full content run is complete only when at least one source has:

- approved Drive source
- clean transcript
- doctrine notes
- Airtable `Library Assets` record
- at least three approved derivative experiences
- Graphify refreshed after the docs are committed

## Guardrails

- Do not publish raw transcripts.
- Do not clean doctrine into generic wellness language.
- Do not create public claims from unapproved teaching notes.
- Do not let social experiences outrun the Temple Library record.
- Do not treat AI-generated drafts as approved content.
- Do not connect app rendering before Airtable approval and Drive URL are ready.
- Do not automate publishing before human approval and audit boundaries exist.

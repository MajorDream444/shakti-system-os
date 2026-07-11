# Sprint 09 — First Living Doctrine

## Mission

Prove that one authentic teaching can move through the entire Living
Intelligence OS without losing its meaning.

```text
The practitioner teaches.
AI prepares.
Humans steward.
The system remembers.
The seeker receives.
```

```text
Raw Source
  -> Voice Recording
  -> Transcript
  -> Doctrine Review
  -> Doctrine Passport
  -> Human Approval
  -> Living Library Asset
  -> Temple Library
  -> Derivative Experiences
```

## First Candidate

```text
The Vow Beneath the Path
```

This is the Hello, World teaching for the Living Intelligence OS: the first
teaching intended to prove the full pipeline from source to seeker without
compromising the practitioner's voice.

Current source:

```text
docs/podcasts/episode-04-the-vow-beneath-the-path.md
```

This is a candidate, not approved sanctuary content. Its current review notes
require Sheetal to confirm Sanskrit transliteration, mantra accuracy,
Hiranyagarbha language, Goddess correspondences, advanced Chinnamasta framing,
and alignment with her teaching field.

## Publication Gate

The application may consume only records whose publishing status is:

```text
Approved
Published
```

Records marked `Raw`, `Needs Review`, `Needs Transcript`, `Needs Summary`,
`Ready To Tag`, or `Archived` remain outside sanctuary consumption.

## Human Approval Gates

Before any asset or derivative experience is published, all four gates must be
complete:

```text
Gate 1 — Source Integrity
Did transcription preserve the teaching?

Gate 2 — Doctrine Integrity
Did extraction preserve meaning?

Gate 3 — Lineage Integrity
Does Sheetal approve this representation?

Gate 4 — Publication Integrity
Is this appropriate for Public, Community, Temple Library, or Retreat Only?
```

## Doctrine Passport

Every teaching needs a Doctrine Passport before it becomes a publishable Temple
Library asset. The passport preserves provenance:

```text
Teaching ID
Source
Practitioner
Date
Primary Theme
Secondary Themes
Journey Stage
Audience
Emotional Tone
Lineage Notes
Approval Status
Derivative Assets
Graph Nodes
Related Teachings
Restrictions
Version History
```

Canonical standard:

```text
docs/pipeline/DOCTRINE-PASSPORT-STANDARD.md
```

## End-to-End Proof

Sprint 09 is complete when:

1. Sheetal approves one low-sensitivity foundational teaching.
2. The approved source file has a real Drive ID and URL.
3. The file is routed into `04_TEMPLE_LIBRARY/00_FOUNDATIONS`.
4. Its Vault metadata is reviewed.
5. A matching `Library Assets` record exists in Airtable.
6. A Doctrine Passport exists for the teaching.
7. All four Human Approval Gates are complete.
8. `BackendRepository.listLibraryAssets()` returns the approved record.
9. The existing sanctuary consumes it without direct Airtable access.
10. Derivative experiences point back to the same source doctrine.
11. The path is verified and documented without changing the visual design.

## Derivative Experiences

For `The Vow Beneath the Path`, the target factory output is:

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

## Current State

```text
Sprint status: In Progress
Candidate identified: Complete
Human approval: Pending
Drive source: Pending
Airtable record: Created as Needs Review
Backend publication gate: Complete
Sanctuary consumption path: Wired, hidden until approved Drive asset exists
```

## Current Airtable Candidate

```text
Base: Shakti System OS
Table: Library Assets
Record ID: reckBd6wnBYL09jsZ
Asset ID: ASSET-VOW-BENEATH-PATH-001
Publishing Status: Needs Review
Knowledge Maturity: Transcript Generated
Access Level: Internal
Confidentiality: Internal
```

The Shakti Shala Temple Library now reads approved Library Assets through
`BackendRepository`. This candidate will not render until it has a real Drive URL
and its publishing status is changed to `Approved` or `Published`.

## Guardrails

- Do not publish unreviewed teaching language.
- Do not expose Airtable or Drive credentials in browser production code.
- Do not add live writes.
- Do not redesign the sanctuary.
- Do not alter sanctuary language.
- Keep mock fallback available when the backend is not configured.

# Sprint 09 — First Living Knowledge

## Mission

Prove one real, human-approved teaching can move through the Living Vault into
the existing sanctuary without hardcoding content into React.

```text
Google Drive → Vault Metadata → Airtable → BackendRepository → Shakti Shala
```

## First Candidate

```text
The Vow Beneath the Path
```

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

## End-to-End Proof

Sprint 09 is complete when:

1. Sheetal approves one low-sensitivity foundational teaching.
2. The approved source file has a real Drive ID and URL.
3. The file is routed into `04_TEMPLE_LIBRARY/00_FOUNDATIONS`.
4. Its Vault metadata is reviewed.
5. A matching `Library Assets` record exists in Airtable.
6. `BackendRepository.listLibraryAssets()` returns the approved record.
7. The existing sanctuary consumes it without direct Airtable access.
8. The path is verified and documented without changing the visual design.

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

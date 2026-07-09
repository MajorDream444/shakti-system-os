# Temple Library Publishing Standard

## Status

Sprint 11 publishing gate.

This document defines when a teaching may move from source material into the
Temple Library and downstream content surfaces.

## Purpose

The Temple Library is not a content dump. It is the approved teaching layer of
Shakti Shala.

Every record must protect:

- Sheetal's doctrine
- lineage-sensitive language
- seeker safety
- source traceability
- human approval
- future app integrity

## Publishing Statuses

| Status | Meaning | App Visibility |
| --- | --- | --- |
| Raw | source captured, not reviewed | hidden |
| Needs Review | metadata exists, review pending | hidden |
| Needs Transcript | source needs transcription | hidden |
| Needs Summary | source needs summary or doctrine extraction | hidden |
| Ready To Tag | source is understood but metadata is incomplete | hidden |
| Approved | approved for controlled use | eligible |
| Published | approved and live in a public or member surface | eligible |
| Archived | no longer active | hidden |

## Minimum Record Standard

No teaching should be marked `Approved` until the Airtable `Library Assets`
record includes:

- Asset ID
- Title
- Description
- Drive URL
- Source Folder
- Media Type
- File Type
- Theme
- Keywords
- Access Level
- Publishing Status
- Confidentiality
- Notes

## Shakti-Specific Review Requirements

For Shakti teachings, review must confirm:

- Sanskrit transliteration
- mantra accuracy
- deity / goddess correspondences
- lineage-sensitive framing
- therapeutic or trauma-related claims
- retreat readiness claims
- offer or pathway claims
- whether the teaching is public, member-only, or internal

For `The Vow Beneath the Path`, review must specifically confirm:

- Atma Tattva Avalokanam language
- Hiranyagarbha / Golden Womb language
- Purusharthas framing
- Tripura Bhairavi / Dharma correspondence
- Maa Kamala / Artha correspondence
- Tripura Sundari / Kama correspondence
- Maa Kali / Moksha correspondence
- Maa Chinnamasta framing
- Gupt Navratri spelling and context
- 40-day devotional path framing

## Drive Rule

The approved source file must live in the correct Drive lane before app
visibility.

Current first teaching lane:

```text
Shakti Legacy Vault / 04_TEMPLE_LIBRARY / 00_FOUNDATIONS
```

Do not rely on local repo files as the only source for a published Library
Asset. GitHub may document the source, but Drive owns the source file.

## Airtable Rule

Airtable owns structured publishing status.

```text
Library Assets.Publishing Status
  -> Approved or Published
  -> BackendRepository may return the record
```

Records marked `Raw`, `Needs Review`, `Needs Transcript`, `Needs Summary`,
`Ready To Tag`, or `Archived` must stay outside app consumption.

## Backend Rule

React components should not query Airtable directly.

Approved records move through:

```text
AirtableReadOnlyClient
  -> LibraryAssetReadAdapter
  -> ContentApprovalService
  -> BackendRepository
  -> Shakti Shala / Temple Library
```

## Public Output Rule

Derivative outputs may not outrun the source approval.

Before publishing a podcast, newsletter, web teaching, social carousel, or reel:

- source record must be approved for that channel
- claims must match the approved doctrine notes
- private or internal content must be removed
- CTA must point to an approved route or offer
- final human review must be recorded

## Confidentiality Levels

Use the most restrictive appropriate level:

| Level | Use |
| --- | --- |
| Internal | team-only, source review, private ops |
| Private | restricted client or practitioner context |
| Member | approved for logged-in or invited members |
| Public | approved public teaching |

If uncertain, keep the record `Internal`.

## Completion Gate

A Temple Library teaching is publish-ready when:

- Drive source is approved and correctly placed
- Airtable record is complete
- publishing status is `Approved` or `Published`
- confidentiality matches the intended surface
- doctrine extraction has been reviewed
- derivative outputs have channel-specific approval
- Graphify has been refreshed after docs are committed

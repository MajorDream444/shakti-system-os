# First Living Knowledge Review

## Candidate

```text
The Vow Beneath the Path
```

## Current Source

```text
docs/podcasts/episode-04-the-vow-beneath-the-path.md
docs/podcasts/episode-04-transcript-vow-beneath-the-path.md
```

## Intended Vault Location

```text
Shakti Legacy Vault / 04_TEMPLE_LIBRARY / 00_FOUNDATIONS
```

## Airtable Record

```text
Base: Shakti System OS
Table: Library Assets
Record ID: reckBd6wnBYL09jsZ
Asset ID: ASSET-VOW-BENEATH-PATH-001
Publishing Status: Needs Review
Access Level: Internal
Confidentiality: Internal
```

## Approval Gate

Do not mark this record `Approved` or `Published` until Sheetal/team confirms:

- Sanskrit transliteration
- mantra accuracy
- Hiranyagarbha / Golden Womb language
- goddess correspondences
- Chinnamasta framing
- alignment with Sheetal's teaching field
- approved Drive file URL

## App Consumption Path

```text
Drive asset
  -> Library Assets metadata
  -> Human approval
  -> Airtable read adapter
  -> BackendRepository.listLibraryAssets()
  -> Shakti Shala Temple Library
```

The Shakti Shala app only renders Library Assets that pass the existing approval
gate and include a real Drive URL. This candidate is intentionally not visible
inside the sanctuary yet.

# Airtable Schema

## Source

Operational Airtable home:

```text
Workspace: AMA MOB OS V2
Base: Shakti System OS
```

Live base reference:

```text
docs/architecture/SHAKTI-SYSTEM-AIRTABLE-LIVE-BASE.md
```

Canonical draft:

```text
docs/architecture/SHAKTI-SHALA-AIRTABLE-SCHEMA-DRAFT.md
```

Typed app constants:

```text
apps/web/src/constants/airtableSchema.ts
```

## Initial Build Priority

```text
Seekers
Library Assets
Practices
Initiation Keys
Retreats
Retreat Applications
Environmental Memory
```

## Secondary Build Priority

```text
Goddess Pathways
Offerings
Content Queue
```

## Current Boundary

`AirtableService` exposes placeholder methods for status checks, schema lookup, initial table order, draft creation, and future approved-record reads. It does not make live network calls yet.

Sprint 6 added read-only adapter structure for `Practices` and `Initiation Keys`.

Sprint 7 adds `BackendRepository` as the only app-facing read boundary and adds `LibraryAssetReadAdapter` for the Temple Library / Vault layer. The repository owns cache behavior and keeps React from depending on Airtable adapter details.

Current read-only flow:

```text
BackendRepository
  -> PracticeReadAdapter
  -> InitiationKeyReadAdapter
  -> LibraryAssetReadAdapter
  -> AirtableReadOnlyClient
  -> Airtable or mock fallback
```

The adapters use mock fallback data unless local Airtable env values are present and the app is not running as production.

Security details:

```text
docs/architecture/ENV_CONFIG.md
```

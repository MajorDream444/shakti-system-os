# Airtable Schema

## Source

Operational Airtable home:

```text
AMA MOB OS V2
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

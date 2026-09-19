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
Retreat Applications
Intake Responses
Requests & Signals
Progress
Access Grants
```

## Deferred Or Quarantined

```text
Reflections
Events
Goddess Pathways
Offerings
Content Queue
Initiation Keys
Retreats
Environmental Memory
```

## Current Boundary

`AirtableService` exposes placeholder methods for status checks, schema lookup, initial table order, draft creation, and future approved-record reads. It does not make live network calls yet.

Sprint 6 added read-only adapter structure for `Practices` and `Initiation Keys`.

Sprint 7 adds `BackendRepository` as the only app-facing read boundary and adds `LibraryAssetReadAdapter` for the Temple Library / Vault layer. The repository owns cache behavior and keeps React from depending on Airtable adapter details.

Sprint 11C adds the first approved server-side write boundary for `/begin`. The browser does not write directly to Airtable with privileged credentials. Production writes are controlled by `BEGIN_WRITES_ENABLED`, which defaults to `false`.

The September 19 backend-readiness pass removed the legacy browser-token read
path. Airtable credentials are server-only in every environment; current read
adapters continue to use mock fallback records until a server read endpoint is
approved.

Sprint 11C operational tables:

```text
Seekers: tblKLBelhnhTaoS6o
Intake Responses: tblfGqSLi8NLBpSVv
Requests & Signals: tblcKmCTyPhk68jLU
Progress: tblR04jj5MNMXJ69N
Access Grants: tblTQ0jfG1pftUKxS
```

Write rules:

```text
/api/begin/complete may write Seekers, Intake Responses, and Progress.
/api/request-signal may write Requests & Signals after explicit action and usable contact.
Neither endpoint writes Access Grants in Sprint 11C.
Neither endpoint writes Initiation Keys, Environmental Memory, Retreat Applications, Reflections, Events, payments, deposits, or private reflections.
Server-side pathway rules own persisted pathway assignment.
Anonymous or no-contact Begin journeys remain local-only.
```

## Current Verification - 2026-09-19

The code-to-schema contract remains explicit through `liveAirtable.ts`, but the
HAMAL Production metadata request returned `404` with the configured server
credential name. Therefore current base reachability, table compatibility, and
field compatibility are **NOT VERIFIED** by this pass.

No records were read. No synthetic record was created. No write flag was
enabled. A safe write proof remains on **HOLD** until the canonical credential
name, base authority, and metadata access are corrected and rechecked.

Known operational limits:

```text
Begin completion has Progress-based replay protection.
Request & Signal creation does not yet perform a pre-write idempotency lookup.
The in-memory rate limiter is per warm function instance, not a durable global limiter.
DWD community intent is measurable anonymously but has no dedicated Airtable signal mapping.
The Retreat room remains a local prototype and creates no Airtable record.
```

Typed app constants:

```text
apps/web/src/constants/liveAirtable.ts
```

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

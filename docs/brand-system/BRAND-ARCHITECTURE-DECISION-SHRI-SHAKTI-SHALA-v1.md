# Brand Architecture Decision - Shri Shakti Shala Candidate

Owner: Codex
Created: 2026-09-08
Status: PRIMARY-SOURCE STRENGTHENED DECISION RECORD / NOT IMPLEMENTED

## Decision Question

Should `SHRI SHAKTI SHALA` become the public umbrella, living school, community, or sanctuary name, while `SHAKTI SHADOW & SOMATICS` remains Sheetal Kandola's body of work and method?

## Current State

| Layer | Current governing name | Current role |
|---|---|---|
| Public sanctuary/community | `Shakti Shala` | Public living container and room architecture. |
| Method/body of work | `Shakti Shadow & Somatics` | Sheetal's method and public body of work. |
| Internal system | `Shakti System OS` | Architecture, source governance, data boundaries, implementation. |

## Source Strength

Primary transcript reviewed:

```text
/Users/majordreamwilliams/Downloads/Sheetal September 5 meeting - September 05.md
```

Admitted range: Sheetal/Major project conversation through approximately `1:18:58`.

Direct founder support:

- Sheetal says the entire thing can be called `Shri Shakti Shala`.
- Sheetal says the first sentence can name her as founder of `Shri Shakti Shala`.
- Sheetal distinguishes the space/page from the method/body of work.
- Sheetal says the public business account has used this name for some time.

Transcript caveat: Fathom transcription mangles some proper nouns. Exact spelling/capitalization still needs final human confirmation before runtime rename.

## Candidate Future Architecture

| Layer | Candidate name | Candidate role | Status |
|---|---|---|---|
| Public umbrella / living school / sanctuary | `SHRI SHAKTI SHALA` | The wider public home for teachings, community, practice, seasonal invitations, and Shala membership. | PRIMARY-SUPPORTED / NEEDS ROLLOUT DECISION |
| Founder method / body of work | `SHAKTI SHADOW & SOMATICS` | The method Sheetal teaches and the lens through which offers are held. | PRIMARY-SUPPORTED / REFINED |
| Internal operating system | `Shakti System OS` | Repository, governance, integrations, memory, source boundaries. | KEEP INTERNAL |

## Recommendation

Do not rename globally in this amendment.

Use the Sept 5 primary transcript to prepare a bounded rename rollout, then wait for explicit approval of exact capitalization, domains, public metadata, and migration order before changing public surfaces.

## Why Not Rename Yet

- Existing public navigation, copy, docs, and tests currently use `Shakti Shala`.
- `Shri` carries devotional and cultural specificity that should not be casually applied by implementation inference.
- A global rename touches search, metadata, routes, docs, tests, screenshots, and user expectations.
- Domain acquisition and social handle alignment are founder-owned dependencies.

## Surfaces Affected If Approved

Application:

- `apps/web/src/constants/navigation.ts`
- `apps/web/src/data/portalCopy.ts`
- `apps/web/src/data/offerings.ts`
- `apps/web/src/data/practices.ts`
- `/shala` page and room copy
- `/dancing-with-durga` Shala doorway copy
- metadata and page titles
- Playwright assertions that currently expect `Shakti Shala`

Documentation:

- `docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md`
- `docs/doctrine/SHEETAL-FOUNDER-PROFILE.md`
- `docs/architecture/*`
- `docs/handoff/*`
- `docs/sprints/*`
- `docs/campaigns/dancing-with-durga/source-pack/*`
- `docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md`

Operational systems later:

- Airtable table/view names only if approved and if operationally useful.
- Notion SOPs and launch calendars.
- Drive folder labels only with human approval.
- Graphify relationships after source-truth refresh.

## Explicit Non-Decision

This record does not approve:

- global rename
- route rename
- domain purchase
- logo change
- metadata change
- social-handle change
- public launch announcement

# System Layer Map

## Status

MAIM OS source-of-truth map.

This document explains how the major tools relate to one another. Each tool has
one primary responsibility. Duplication creates drift.

## Core Flow

```text
Drive
  -> Graphify
  -> Notion
  -> Airtable
  -> GitHub
  -> Portal
  -> AI
  -> Client
```

This is not a strict technical pipeline. It is the operating relationship
between source material, knowledge, team coordination, structured records,
implementation, experience, intelligence, and the human being receiving the
system.

## Responsibility Map

| Layer | Responsibility | Should Not Become |
| --- | --- | --- |
| Google Drive | Source files, raw uploads, media, working assets, Vault intake | CRM, final app, source code |
| Graphify | Durable relationship map across docs, code, transcripts, and architecture | Replacement for repo truth |
| Notion | Human dashboard, team notes, roadmap, SOPs, coordination | Operational database |
| Airtable | Structured metadata, CRM, readiness, access, review status | File storage or design workspace |
| GitHub | Code, architecture, playbooks, prompts, deployment record | Media dump or private CRM |
| Portal / App | Public threshold, intake, sanctuary, member experience | Source-of-truth archive |
| AI | Synthesis, classification, drafting, routing, extraction | Unreviewed authority |
| Client / Team | Approval, discernment, relationship, delivery | Passive data source |

## No-Duplication Rule

The same information may be referenced in multiple places, but only one place
should own it.

Examples:

```text
Source PDF
  owned by Drive
  referenced by Airtable
  described by GitHub docs
  surfaced by the app after approval

Publishing Status
  owned by Airtable
  enforced by BackendRepository / adapters
  summarized in Notion

Knowledge Maturity
  owned by Airtable
  tracks Living Doctrine production lifecycle
  does not grant app visibility by itself

Architecture Decision
  owned by GitHub docs
  discussed in Notion
  mapped by Graphify
```

## Living Vault Path

```text
Raw upload in Drive
  -> intake review
  -> transcription / OCR if needed
  -> metadata draft
  -> human approval
  -> Airtable Library Assets record
  -> BackendRepository read
  -> Portal / Sanctuary surface
```

## Reception Layer Path

```text
Visitor speaks or submits context
  -> Reception Layer captures story
  -> CRM profile / readiness record
  -> recommended pathway
  -> human handoff if needed
  -> portal / sanctuary next step
```

## Documentation Path

```text
Decision
  -> GitHub doc
  -> Graphify update
  -> Notion summary if the team needs it
  -> SOP update if repeatable
```

## Tool Boundary Rules

- Drive stores files; Airtable stores metadata.
- Airtable stores structured status; Notion stores human operating context.
- GitHub stores implementation truth; Graphify maps implementation truth.
- The app renders approved experiences; it should not become the database.
- AI assists approved workflows; it should not publish unapproved doctrine.
- Human approval remains the gate between private source material and public
  experience.

## Health Check

A system layer is healthy when:

- source files are easy to locate
- approval status is unambiguous
- a team member knows where to act
- an agent knows which doc to read
- the app can consume approved data without direct secret exposure
- a future client can reuse the pattern without copying Shakti's language

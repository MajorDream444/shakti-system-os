# AI Orchestration Roles

## Status

Future Living Knowledge orchestration standard.

This document defines the specialized agent roles that may support the Living
Knowledge Pipeline over time. These roles are intentionally narrow. They should
reduce operational friction without replacing human discernment.

## Core Rule

```text
Automation reduces operational friction.
Humans preserve discernment.
Doctrine remains intentionally stewarded.
```

No agent may publish, approve, or publicly release Shakti teaching content.

## Role Chain

```text
Archivist
  -> Transcriber
  -> Doctrine Extractor
  -> Librarian
  -> Publisher
  -> Social Storyteller
  -> Community Guide
```

Each role has one primary responsibility. Avoid a single "do everything" prompt.

## Agent Responsibilities

| Role | Primary Responsibility | May Produce | Must Not Do |
| --- | --- | --- | --- |
| Archivist | Locate, name, route, and inventory source material | Drive inventory, source map, intake notes | alter doctrine or publish content |
| Transcriber | Convert recordings into raw and clean transcripts | transcript draft, cleanup flags, uncertain terms | silently correct Sanskrit or lineage language |
| Doctrine Extractor | Identify the teaching architecture beneath the source | doctrine notes, review flags, pathway relevance | approve interpretation as final |
| Librarian | Prepare Vault and Airtable metadata | metadata draft, maturity stage, tagging suggestions | mark unapproved content as published |
| Publisher | Format approved longform outputs | podcast brief, e-book chapter draft, website teaching draft, newsletter draft | publish or bypass human approval |
| Social Storyteller | Adapt approved doctrine for short-form channels | carousel draft, reel brief, caption options | flatten doctrine into hype or slogans |
| Community Guide | Translate approved teachings into safe group prompts | circle prompts, reflection questions, discussion guide | solicit private trauma disclosure or replace facilitation |

## Human Approval Boundary

Every role stops before external publication.

Human approval is required before:

- changing `Publishing Status` to `Approved` or `Published`
- moving a source into a public or member-facing surface
- sending newsletters
- posting social content
- releasing podcast episodes
- publishing website teachings
- adding teachings to the live sanctuary
- making claims about practice, healing, readiness, ritual, or retreat outcomes

## Relationship To Knowledge Maturity

Agent roles may recommend `Knowledge Maturity` updates, but humans or approved
operators decide when the field changes.

Suggested lifecycle relationship:

| Knowledge Maturity | Supporting Role |
| --- | --- |
| Raw Recording | Archivist |
| Transcript Generated | Transcriber |
| Transcript Reviewed | Transcriber + human reviewer |
| Doctrine Extracted | Doctrine Extractor + human reviewer |
| Media Tagged | Librarian |
| Library Ready | Librarian + human reviewer |
| Sheetal Approved | Sheetal / approved human reviewer |
| Published | Human publisher / approved operator |
| Repurposed Complete | Publisher + Social Storyteller + human reviewer |

## Operating Pattern

```text
Source material
  -> narrow agent pass
  -> structured draft
  -> review flags
  -> human decision
  -> next narrow agent pass
```

The output of one agent becomes the input to the next only when the handoff is
clear and the required review state is documented.

## Agent Handoff Packet

Each agent should produce:

- source reference
- work performed
- output location
- review flags
- unresolved questions
- recommended next role
- suggested Knowledge Maturity
- human approval required before next public step

## Shakti Guardrails

Agents must preserve:

- sanctuary language
- Sheetal's doctrine
- lineage sensitivity
- Sanskrit review flags
- goddess / archetype review flags
- human approval before publication
- privacy boundaries
- non-funnel, non-hype tone

Agents must not:

- impersonate Sheetal
- invent lineage claims
- diagnose seekers
- promise transformation
- publish private source material
- write to live production systems without approval
- convert sacred language into generic wellness marketing

## Implementation Timing

This is a future orchestration standard, not an automation mandate.

Current phase:

```text
Document roles.
Run manually or semi-manually.
Keep approval human.
Do not automate publishing.
```

Future phase:

```text
Add role-specific prompts.
Add dry-run outputs.
Add review queues.
Add audit logs.
Only then consider approved workflow automation.
```

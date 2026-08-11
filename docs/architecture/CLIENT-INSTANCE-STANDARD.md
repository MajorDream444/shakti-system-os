# Client Instance Standard

## Status

Reusable MAIM OS implementation standard.

This document defines the minimum set of questions and artifacts every client
instance should answer before new features are built.

## Purpose

Client instances should feel distinct on the surface and consistent underneath.

The standard prevents future builds from reinventing the wheel while protecting
each client's doctrine, voice, visual world, operating model, and handoff needs.

## Required Definition

Each client instance must define:

```text
Doctrine
Public Brand
Internal OS
Front Door
Vault
Pathways
Offers
CRM
Automation
Community
Retreats / Immersions
Handoff
```

If a category does not apply, explicitly mark it `Not applicable` and explain
why.

## Client Instance Checklist

| Area | Required Answer |
| --- | --- |
| Doctrine | What is the client's source teaching, method, worldview, or body of work? |
| Public Brand | What does the public-facing world look, sound, and feel like? |
| Internal OS | Where does the team coordinate work, decisions, notes, and delivery? |
| Front Door | What is the first public threshold? |
| Vault | Where do source files, teachings, recordings, PDFs, and media live? |
| Pathways | How are visitors routed into the right next step? |
| Offers | What containers, services, products, or programs exist? |
| CRM | Where do people, readiness, status, and follow-up live? |
| Automation | Which workflows can safely run without human improvisation? |
| Community | What ongoing rhythm holds the audience or members? |
| Retreats / Immersions | Are there deeper containers requiring readiness and review? |
| Handoff | What does the human team need to act with confidence? |

## Minimum Artifact Set

Each client instance should eventually contain:

- client one-pager
- doctrine brief
- front-door map
- intake / reception map
- vault map
- source-of-truth map
- Airtable or CRM schema
- pathway routing standard
- offer ladder
- handoff SOP
- team operations guide
- deployment / access notes

## Source Of Truth Rules

Use one responsibility per tool.

| Tool | Responsibility |
| --- | --- |
| Google Drive | Source files, media, uploads, working assets |
| Graphify | Relationship map across repo, docs, code, and knowledge |
| Notion | Human dashboard, weekly rhythm, notes, decisions |
| Airtable | Structured operational data and CRM |
| GitHub | Code, architecture, playbooks, documentation |
| Portal / App | Public and member-facing experience |
| AI | Extraction, routing, synthesis, and assistance under approval |
| Human Team | Discernment, approval, relationship, delivery |

## Build Sequence

```text
1. Capture doctrine.
2. Define public threshold.
3. Define internal operating home.
4. Map source material.
5. Create intake and reception boundary.
6. Create CRM/readiness structure.
7. Create pathway routing.
8. Add Vault metadata.
9. Connect approved content to the experience.
10. Add automation only after the workflow is proven manually.
```

## Approval Rule

No client-facing doctrine, teaching, transcript, ceremony language, retreat
material, or sensitive reflection should become public without explicit human
approval.

## Reuse Rule

When a decision or artifact would help the next client instance, promote it to
MAIM OS documentation.

When a decision only belongs to the client's world, document it inside that
client's implementation map.

## Sprint Gate

Before any future sprint starts, answer:

```text
Does this strengthen the MAIM OS?
Does this preserve the practitioner's doctrine and experience?
Which MAIM OS layer is this improving?
Which client-specific surface will inherit it?
What source of truth changes?
What approval is required?
What must not change?
```

## Sprint Order

Every client-instance sprint should follow the MAIM OS sprint sequence:

```text
1. Repository Hygiene
2. Architecture
3. Feature
4. Verification
5. Documentation
6. Release
```

The feature should be one meaningful capability. If hygiene, architecture,
verification, or documentation expose a risk, resolve that before expanding the
client-facing surface.

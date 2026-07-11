# Doctrine Passport Standard

## Status

Release 0.3 provenance artifact.

## Purpose

Doctrine Preservation is a core MAIM OS principle.

Most AI systems optimize for speed. MAIM OS optimizes for faithfulness.

The Doctrine Passport is the provenance record for a teaching. It makes sure
every transcript, doctrine note, Temple Library record, and derivative
experience can be traced back to the same approved source.

Every teaching that enters the Living Doctrine Pipeline should receive one
Doctrine Passport before it becomes a publishable Temple Library asset.

## Preservation Objective

The Doctrine Passport answers:

```text
Where did this teaching come from?
Who carried it?
What did it mean before transformation?
Who approved this representation?
Where did each derivative experience come from?
What restrictions protect it?
What changed over time?
```

## Required Fields

| Field | Purpose |
| --- | --- |
| Teaching ID | Stable identifier for the teaching across Drive, Airtable, GitHub, and Graphify. |
| Source | Original recording, transcript, document, or source asset reference. |
| Practitioner | Practitioner or lineage holder whose teaching is being preserved. |
| Date | Source date, recording date, or approval date when source date is unknown. |
| Primary Theme | Main doctrine theme. |
| Secondary Themes | Supporting themes that may guide derivative experiences. |
| Journey Stage | Where the teaching belongs in the seeker journey. |
| Audience | Intended audience or access lane. |
| Emotional Tone | Felt tone to preserve when transforming the teaching. |
| Lineage Notes | Sanskrit, goddess, practice, cultural, or lineage-sensitive context. |
| Approval Status | Current human approval state. |
| Derivative Assets | Podcast, guide, reflection, newsletter, social, video, or other descendants. |
| Graph Nodes | Graphify nodes or documentation nodes connected to the teaching. |
| Related Teachings | Other teachings that support, precede, or deepen this one. |
| Restrictions | Confidentiality, access, channel limits, or transformation limits. |
| Version History | Record of meaningful changes, approvals, and derivative updates. |

## Template

```text
Teaching ID:
Source:
Practitioner:
Date:

Primary Theme:
Secondary Themes:
Journey Stage:
Audience:
Emotional Tone:

Lineage Notes:

Approval Status:

Derivative Assets:
- 

Graph Nodes:
- 

Related Teachings:
- 

Restrictions:

Version History:
- 
```

## Approval Relationship

The Doctrine Passport does not replace the Human Approval Gates.

It carries the evidence those gates need:

| Gate | Passport Evidence |
| --- | --- |
| Gate 1 - Source Integrity | Source, transcript reference, version history. |
| Gate 2 - Doctrine Integrity | Primary theme, secondary themes, lineage notes, related teachings. |
| Gate 3 - Lineage Integrity | Practitioner, lineage notes, approval status. |
| Gate 4 - Publication Integrity | Audience, restrictions, derivative assets. |

Only after all four gates are complete may derivative experiences be published.

## Storage Rule

For now, Doctrine Passports may live as markdown documents in GitHub and/or as
structured metadata in Airtable.

Current GitHub location:

```text
docs/pipeline/passports/
```

Long term, each `Library Assets` record should be able to point to its Doctrine
Passport so the app, Airtable, Drive, and Graphify can share the same
provenance record without duplicating meaning.

## First Teaching

Initial Doctrine Passport candidate:

```text
Teaching ID: ASSET-VOW-BENEATH-PATH-001
Teaching: The Vow Beneath the Path
Practitioner: Sheetal
Status: Draft / Needs Review
Passport: docs/pipeline/passports/THE-VOW-BENEATH-THE-PATH.md
```

This teaching may not become public or sanctuary-visible until the Doctrine
Passport, Library Asset record, and all four Human Approval Gates are complete.

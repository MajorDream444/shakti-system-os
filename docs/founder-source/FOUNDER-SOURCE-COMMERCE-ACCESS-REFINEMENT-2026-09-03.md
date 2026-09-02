# Founder Source - Commerce and Access Refinement

Owner: Sheetal Kandola
Recorded by: Codex
Date received: 2026-09-03
Mode: Source capture and reconciliation only
Status: HUMAN REVIEW REQUIRED

## Source Metadata

| Field | Value |
|---|---|
| Founder | Sheetal Kandola |
| Date | 2026-09-03 |
| Medium | Reported founder clarification supplied by Major via Chat synthesis |
| Related sources | `FOUNDER-SOURCE-DANCING-WITH-DURGA-2026-09-03.md`; `FOUNDER-CORRECTION-PRIVATE-WORK-CONTAINERS-2026-09-01.md` |
| Authority level | Reported direct founder clarification; raw founder text not yet separately attached |
| Canonicality | Current planning authority, pending human review before public implementation |

## Source Boundary

This record captures a reported founder clarification. It changes planning truth, but it does not authorize app implementation, checkout, payment links, production writes, Airtable mutations, or automatic access grants.

## Founder Clarifications Reported

| ID | Clarification | Classification | Implementation status |
|---|---|---|---|
| CAR-001 | Dancing with Durga purchase includes live Navratri container, recordings, materials/practices, and temporary community/Shala space. | CONFIRMED FOR PLANNING | Not implemented. |
| CAR-002 | After the container ends, non-members retain recording/material access for two months. | CONFIRMED FOR PLANNING | Not implemented. |
| CAR-003 | If a participant joins Shakti Shala, the Dancing with Durga library becomes part of Shakti Shala membership library access. | CONFIRMED FOR PLANNING | Not implemented. |
| CAR-004 | Shakti Shala library access continues while membership remains active. | CONFIRMED FOR PLANNING | Not implemented. |
| CAR-005 | Dancing with Durga does not automatically convert someone into a Shakti Shala member. | CONFIRMED FOR PLANNING | Not implemented. |
| CAR-006 | The pathway is participate -> invitation -> simple application -> human discernment -> paid membership -> Shakti Shala. | CONFIRMED FOR PLANNING | Not implemented. |
| CAR-007 | Founding Shakti Shala membership is first 10 women at `$11/month` or `$111/year`. | WORKING / NEEDS TERM CONFIRMATION | Not implemented. |
| CAR-008 | Founding rate duration is unresolved. | BLOCKED | Requires founder decision. |
| CAR-009 | Monthly membership may require a six-month minimum commitment. | WORKING / NOT PUBLIC | Requires founder decision. |
| CAR-010 | Standalone private session is permitted at `$200`. | SUPERSEDES SEP 1 FOR PLANNING | Not implemented. |
| CAR-011 | 3/6/9/12-session private containers are `$150/session`. | SUPERSEDES SEP 1 FOR PLANNING | Not implemented. |
| CAR-012 | Containers reward deeper commitment while standalone remains available at a premium. | CONFIRMED FOR PLANNING | Not implemented. |

## Current Private Work Planning Truth

Reported current founder pricing:

| Path | Current founder price |
|---|---:|
| Standalone private session | `$200` |
| 3-session container | `$450` |
| 6-session container | `$900` |
| 9-session container | `$1,350` |
| 12-session container | `$1,800` |

## Source Conflict Resolution

The Sept 1 correction said:

```text
No standalone private sessions.
Public private work is 6-, 9-, or 12-session containers.
3 sessions only by exception.
```

The Sept 3 refinement now reports:

```text
Standalone private session permitted at $200.
3 / 6 / 9 / 12 containers priced at $150/session.
```

Current resolution:

- Sept 1 remains preserved as historical provenance.
- Sept 3 supersedes Sept 1 for future commerce planning.
- Current public app behavior has not been updated yet.
- Do not publish pricing or checkout until a dedicated approved commerce implementation sprint.

## Access Contract for Dancing with Durga

```text
Dancing with Durga purchase
-> live Navratri container
-> recordings
-> materials and practices
-> temporary community / Shala space
-> container ends
-> two-month continued recording/material access if not a Shala member
-> invitation / simple application / human discernment for Shakti Shala
-> paid membership if aligned and accepted
-> DWD library access continues while Shala membership remains active
```

## Important Modeling Decision

Temporary Dancing with Durga access should not be modeled as full Shakti Shala membership.

Use a distinct future access state such as:

```text
Dancing with Durga Participant
```

This avoids confusing:

- paid Shala membership
- temporary event access
- member library access
- participant recordings/materials access
- human-reviewed continuation

## Still Unresolved

1. How long the founding Shala rate is protected.
2. Whether monthly founding membership requires a six-month minimum.
3. Whether the final public title is `Dancing with Durga: Devotion with a Spine`.
4. Exact refund/cancellation/payment terms.
5. Exact platform/community tool.
6. Whether the generated visual reference can influence public artwork.

## Implementation Boundary

Do not implement from this source until human review approves the architecture plan.

Do not:

- update app pricing
- add checkout
- add Stripe
- mutate Airtable
- create Access Grants
- change Shakti Shala membership behavior
- deploy
- enable production writes

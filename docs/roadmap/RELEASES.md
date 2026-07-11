# Shakti System OS — Release Map

## Purpose

Releases describe product maturity. Sprints remain the bounded units of work
used to reach each release.

| Release | Milestone | Status | Completion Gate |
| --- | --- | --- | --- |
| `0.1` | AI Studio MVP | Complete | Sanctuary prototype preserves the approved experience, language, rooms, and interactions. |
| `0.2` | Living Vault Foundation | Complete | Typed architecture, read-only backend boundaries, Vault intake pipeline, and team handoff are established. |
| `0.3` | First Living Doctrine | In progress | One real, human-approved teaching flows from Drive through Airtable and `BackendRepository` into the sanctuary. |
| `0.4` | Private Beta | Planned | An invited cohort can use the approved sanctuary path with operational support and monitored feedback. |
| `0.5` | Retreat Ready | Planned | Retreat readiness, application, review, and handoff pathways are operationally proven. |
| `1.0` | Public Sanctuary | Planned | The sanctuary is approved, secure, supported, and ready for public access. |

## Current Release

```text
Release: 0.3 — First Living Doctrine
Status: In progress
Branch: MajorDream444-patch-1
```

Current execution record:

```text
docs/roadmap/SPRINT_09_FIRST_LIVING_DOCTRINE.md
```

## Release Rules

- A release is complete only when its completion gate is proven.
- Every completed major phase receives a permanent annotated Git tag.
- Sprints may advance work without advancing the release number.
- Human approval remains required before teaching content becomes available to
  the sanctuary.
- Phase 2 remains on `MajorDream444-patch-1` until one real teaching is proven
  end to end.
- Merge into `main` only after the `0.3` completion gate is satisfied.
- Visual design, sanctuary language, room architecture, and current
  interactions remain protected unless a future release explicitly authorizes
  change.

## Planned Checkpoints

```text
v0.1-sanctuary-mvp
        |
v0.2-living-vault-foundation
        |
v0.3-first-living-knowledge
        |
v0.4-private-beta
        |
v0.5-retreat-ready
        |
v1.0-public-sanctuary
```

`v0.2-living-vault-foundation` is the first confirmed repository tag in the
current Git history. Earlier or future tags should be created only against
verified milestone commits.

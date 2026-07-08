# Developer Guide

## Repo Entry Points

- App: `apps/web`
- Architecture docs: `docs/architecture`
- Playbooks: `docs/playbooks`
- Handoff docs: `docs/handoff`
- Roadmap: `docs/roadmap`

## Development Checks

Run from `apps/web`:

```bash
npm run lint
npx tsc -b
npm run build
```

Then from repo root:

```bash
graphify update .
```

## Integration Boundary

Live integrations should enter through services, not components:

- `DriveService`
- `AirtableService`
- `VaultSyncService`
- `AccessService`
- `PersistenceService`

## Visual Rule

Backend and architecture sprints must not change visual design unless the task explicitly says so.

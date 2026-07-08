# Graphify

## Role

Graphify is the context layer for the Shakti System OS repo. It helps future operators understand relationships across docs, app code, schemas, and handoff material.

## Local Output

```text
graphify-out/
```

This folder is generated locally and ignored by Git.

## Rule

Read `graphify-out/GRAPH_REPORT.md` before broad repo exploration when it exists, then verify with direct file reads before editing.

## Refresh

Run after meaningful code or docs changes:

```bash
graphify update .
```

## Current Boundary

Graphify output is not the product source of truth. It is a generated map.

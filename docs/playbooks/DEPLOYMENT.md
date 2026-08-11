# Deployment Playbook

## Current Host

Vercel deploys from GitHub branch work.

## Pre-Deploy Checks

Run from `apps/web`:

```bash
npm run lint
npx tsc -b
npm run build
```

## Rules

- Do not commit real `.env` files.
- Do commit `.env.example`.
- Review dependency security updates separately from feature work.
- Keep generated `dist/`, `node_modules/`, and `graphify-out/` out of Git.

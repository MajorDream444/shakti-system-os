# Vercel deployment authority - 2026-09-19

Status: **PARTIALLY VERIFIED / ACCEPTANCE HELD**. This record does not authorize DNS, commerce, production writes, or another deployment.

## Source strength

- **GitHub status, verified:** `MajorDream444/shakti-system-os` `main` resolves to `de2a9f7d4b083cbe8a9b8851a0c410ee21686041`. Its `Vercel - shakti-system-os` status reports `success` and "Deployment has completed" at 2026-09-18 22:37:05 UTC, targeting [the `hamal-agi` deployment](https://vercel.com/hamal-agi/shakti-system-os/9FX5YH5aogC4Xb9QQQgp47H7dWhd). This establishes a new-team GitHub deployment signal for that commit; it does not independently prove the served runtime or production alias.
- **Repository configuration, verified:** Root `vercel.json` builds with `cd apps/web && npm install && npm run build`, outputs `apps/web/dist`, and rewrites the seven public SPA paths to `/index.html`. Root `api/begin/complete.ts` and `api/request-signal.ts` are the serverless entrypoints. The intended Vercel Root Directory is `./`, not `apps/web`.
- **New Vercel dashboard, not verified:** The deployment detail URL redirected to Vercel login during this audit. New project ID, team/account ID, exact deployment/production URL, Git source as displayed by Vercel, Root Directory setting, and Build/Output/Install/Development override switches could not be read. The repository configuration is the intended contract, not proof that dashboard settings match it.
- **Candidate alias, not bound to exact deployment:** `https://shakti-system-os-hamal-agi.vercel.app/` responded from Vercel with HTTP 302 to `vercel.com/sso-api`; the same occurred for all checked routes. Its apparent naming is consistent with the new team, but authentication prevented confirmation of its project, commit, or application content. Do not treat this alias as a verified public release URL.

## Intended architecture

`GitHub -> MajorDream444/shakti-system-os -> main -> hamal-agi/shakti-system-os -> root vercel.json (Root Directory ./) -> apps/web/dist + root /api -> Vercel deployment`.

The `hamal-agi` team/project slug comes from the GitHub status target. The new project ID and account ID remain **UNKNOWN**, not inferred from the slug. Dashboard overrides must be checked in the new account before declaring repository configuration authoritative in practice.

## Legacy boundary

The September 12 Vercel status for this commit points to `major-hanzoais-projects/shakti-system-os` and a separate `web` project. Those are **LEGACY / SUPERSEDED DEPLOYMENT INFRASTRUCTURE** for the re-home; retain as history and do not delete them here.

Both local `.vercel/project.json` files still identify the same legacy project and account. An inspection attempt against the intended new-account scope returned "The specified scope does not exist" under the current local CLI identity. Thus the new project is **not** locally linked/inspectable from this session. Do not use the stale local link for future new-account deployments.

No DNS, Stripe, Vercel settings, environment variables, or deployment state was changed in this audit.

# Codex Operating Notes — Sri Shakti Shala

This repository holds **client truth** for Sri Shakti Shala: Sheetal Kandola's
doctrine, voice, brand, assets, offers, and the public site that carries them.

It is not the reusable platform. Platform architecture lives in
`MajorDream444/MAIM_Client_Intelligence_Workspace_Platform`. Nothing
Sheetal-specific belongs there; no reusable platform architecture belongs here.

## Required read order

Before planning or editing:

1. `AGENTS.md` — read `graphify-out/GRAPH_REPORT.md` before source files
2. **`docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md`** — the client
   specification, in her own words. This is the single most important document
   in the repository. It did not exist until four months into the build, and
   its absence explains most of what went wrong
3. `docs/handoff/HANDOVER-2026-09-25-CLAUDE-TO-CODEX.md` — current engineering
   state, open work in priority order, environment traps
4. `docs/canonical/CROSS-REPO-AGENT-MAP-2026-09-26.md` — which repo owns what
5. `docs/handoff/DESIGN-CAPABILITY-ROADMAP-2026-09-26.md` — tooling direction

## The standard

Not "technically complete". The client is confident enough to send people to
it. As of 25 September she was not.

## Rules earned the hard way

- **Measure after every layout change.** Every real defect on this project was
  found by measuring, not by looking — including four regressions introduced
  by the fixes themselves, three of which looked correct in source.
- **Never describe a capability as working when it is not.** Overstating what
  is built is what damaged trust here. If a thing is written but switched off,
  say so.
- **Two options, never one, never five.** See
  `.claude/skills/visual-first-delivery/SKILL.md`.
- **No internal vocabulary in visitor-facing copy.** "Seeker" is a table name.
  Approval workflows are not the visitor's business. The testimonials page once
  rendered the record schema as page content.
- **Reading floor is 16px.** Her community skews older. Nothing below it.
- **Real content only.** Placeholder text hides the defects that matter.

## Environment

- Container restarts silently revert the git checkout. `git fetch && git
  checkout -B <branch> origin/main` before trusting anything local.
- `npm ci` omits devDependencies here — use `npm ci --include=dev`, or the
  build dies in a wall of `TS7026`.
- Chromium for Playwright: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  as `executablePath`.
- Egress blocks the live domain, `*.vercel.app` and every design reference
  site. Verify against a local production build.

## Production

`apps/web` only (`vercel.json`). Live at `www.srishaktishala.com`.

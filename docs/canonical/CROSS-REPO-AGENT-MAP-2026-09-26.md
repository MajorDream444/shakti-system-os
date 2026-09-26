# Cross-repo and cross-agent map

**Created:** 2026-09-26
**Purpose:** where each kind of truth lives, and how Claude and Codex hand work
between them without either one rebuilding context from scratch.

---

## 0. Correction worth recording

STB and the Client Intelligence Workspace are **not folders inside
`shakti-system-os`**. They are separate repositories. Anyone told to "look in
the repo" for them will not find them:

| Project | Repository | Last activity |
|---|---|---|
| Sri Shakti Shala | `MajorDream444/shakti-system-os` | active |
| STB Command Center | `MajorDream444/STB-COMMAND-CENTER` | 2026-08-16 |
| Client Intelligence Workspace | `MajorDream444/MAIM_Client_Intelligence_Workspace_Platform` | 2026-09-24 |

What *is* in this repo is `docs/stb/STB-REUSABLE-ASSET-EXTRACTION-AUDIT-v1.md`
and `docs/handoff/SEPT-05-STB-REUSABLE-LESSONS.md` — extracted lessons, not the
STB build.

A session is scoped to one repository at a time. Reading another one means
`add_repo` first; pushing to it means `add_repo` with `access: "push"`.

---

## 1. The boundary, which is already defined

The platform repo states it plainly, and it is the right rule:

> The platform is reusable.
> The client instance is configurable.
> Client truth remains client-specific.

Read across the three repositories that resolves to:

| Layer | Lives in | Example |
|---|---|---|
| **Platform** — reusable architecture, tenant isolation, workspace shell, module contracts | `MAIM_Client_Intelligence_Workspace_Platform` | How any client workspace is structured |
| **Client truth** — doctrine, voice, brand, assets, offers, the client's own words | `shakti-system-os` | `docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md` |
| **Client instance** — one configured workspace | a deployment, configured from the platform, reading client truth | Sheetal's workspace |

**The practical rule:** nothing specific to Sheetal belongs in the platform
repo, and no reusable platform architecture belongs in `shakti-system-os`.
When something feels like it belongs in both, it is client truth with a
platform-shaped hole next to it — write the truth here and the contract there.

---

## 2. Something to check

The platform repo is at **Stage A — Foundation**, and `CODEX.md` says in as
many words: *"Do not scaffold the frontend yet. Do not add live integrations.
Do not migrate client assets or data."*

But a live client workspace was demonstrated to Sheetal on 25 September, at
`sheetal-workspace-mvp.majoraimindset.chatgpt.site`.

Both can be true — the MVP may deliberately sit outside the platform repo as a
throwaway demo. But if that MVP is the thing being built on, then the stage
gate is out of date and Codex is being told not to do work that is already
happening. Worth ten minutes to reconcile, because a stale stage gate is
exactly the kind of drift that produced the Sri Shakti Shala problem.

*(Flagged, not resolved: this container's egress policy blocks that URL, so I
could not look at the MVP.)*

---

## 3. How the agents divide

Major's normal arrangement: **ChatGPT / Codex orchestrates and directs; Claude
Code executes.** As of 25 September that is inverted while Codex tokens are
exhausted, so Claude Code and Claude Cowork are primary.

That inversion is the reason this document exists. When the orchestrator
changes, the only thing carrying continuity is what is written down.

### What each agent should read first

**In `shakti-system-os`:**

1. `AGENTS.md` — graph rules; read `graphify-out/GRAPH_REPORT.md` before source
2. `docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md` — **the client specification.
   Read this before any design or copy work.** It did not exist until four
   months in, and its absence explains most of what went wrong
3. `docs/handoff/HANDOVER-2026-09-25-CLAUDE-TO-CODEX.md` — engineering state,
   open work, environment traps
4. `docs/handoff/DESIGN-CAPABILITY-ROADMAP-2026-09-26.md` — tooling direction
5. `.claude/skills/visual-first-delivery/SKILL.md` — how visual work is
   delivered to Major

**In the platform repo:** its own `README.md`, `STAGE.md`,
`docs/REPO_BOUNDARY.md`, `docs/client-intelligence-workspace.md`,
`docs/BUILD_SEQUENCE.md` — that read order is already specified in its
`CODEX.md`.

### What to write back, always

A session that changes anything material writes it into the canonical layer
**before** it ends, in the repository that owns that layer. A decision that
exists only in a chat transcript is lost the moment the token budget runs out —
which is the situation that produced this arrangement.

---

## 4. Convention gap worth closing

The platform repo carries `AGENTS.md`, `CLAUDE.md`, `CODEX.md` and `STAGE.md`
at its root. `shakti-system-os` has only `AGENTS.md`, and it covers graphify
rather than the project.

A `CODEX.md` has been added here to match the pattern, so an agent landing in
this repository is pointed at the same read order regardless of which one it
is. Worth doing in STB-COMMAND-CENTER too.

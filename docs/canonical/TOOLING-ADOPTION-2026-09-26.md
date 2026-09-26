# Three repos to adopt

**Created:** 2026-09-26
**Surveyed:** cloned and read, not inferred from names.

---

## Summary

| Repo | What it is | Verdict |
|---|---|---|
| `claudex-loop` | Fork of `chaseai-yt/claudex-loop`. Skills for working across Claude Code and Codex. | **Adopt now.** Solves the exact problem. |
| `HAMAL_MOB_PLAYBOOKS` | Major's own doctrine, SOP and playbook library for HAMAL OS. | **Already the canonical layer.** Feed it. |
| `archify` | Fork of `tt-a1i/archify`. Turns an idea into an interactive HTML visual. | **Adopt for Major personally.** |

---

## 1. claudex-loop — adopt now

This is the one that matters today. It is built for precisely the situation
Major described: ChatGPT/Codex normally orchestrates, Claude Code executes, and
context has to survive the handoff in both directions.

Four skills:

| Skill | Purpose |
|---|---|
| `claudex-route` | Pick a model, or make one scoped handoff. Self-contained. |
| `claudex-loop` | Requirements → plan review → implementation → final inspection |
| `codex-review` | Codex-side plan review |
| `codex-build` | Codex-side builder |

The loop's shape, from its README:

> Your current conversation handles requirements and coordination; the other
> provider challenges the plan with concrete evidence. The host arbitrates
> findings, records decisions, and keeps the loop bounded.

**Why this matters more than it looks.** The plan gets an independent review
before implementation, and the code gets an independent inspection after. The
inspector is always the *other* provider, in a fresh session.

That is a direct answer to what went wrong on Sri Shakti Shala this week. Four
regressions were introduced by the same work that fixed the original defects —
a `width: 100%` that killed a shared container, an `h1` rule left pointing at a
renamed parent, a body-ink rule that painted dark text cream on a gold card,
and a grid change that made a block taller. **Three of the four looked correct
in source and were only caught by measurement afterwards.** An independent
inspection pass is structurally the thing that catches that class of error,
because the author is the worst reviewer of their own diff.

MIT licensed. Python 3.10+ and both CLIs for the full loop; `claudex-route`
alone needs neither.

**First use:** run the next Shakti page rebuild through `claudex-loop` with
`builder=claude`. Codex reviews the plan, Claude builds, a fresh Codex session
inspects. That is a real test of the loop on work that matters.

---

## 2. HAMAL_MOB_PLAYBOOKS — this is the canonical layer

Not a tool to adopt. It is already the thing the rest should feed.

```
00_stage_a_foundation   05_templates
01_sops                 06_audits
02_playbooks            07_rubrics
03_mobs                 08_agent_context
04_industries           09_sources
```

Plus `CODEX_HANDOFF.md`, `CONTEXT.md`, `GLOSSARY.md`. Its own framing:

> Skills alone do not create leverage. Tools alone do not create leverage.

`02_playbooks` currently holds `client_onboarding` and
`high_performance_personal_brands`. Last pushed 2026-07-07 — it has been
sitting still while a great deal was learned.

**What Sri Shakti Shala owes it.** Everything general learned this week is
currently trapped in a client repo. These belong upstream as reusable assets:

| Goes to | What |
|---|---|
| `05_templates` | `SHEETAL-DIRECTION-2026-09-25.md` as the **client brief template** — the doc whose absence for four months caused most of the damage |
| `06_audits` | The verification harness: clipped-text sweep, type-floor sweep, pixel-sampled contrast against real photography |
| `07_rubrics` | The reading floor, contrast floor, and "two options never one" rule |
| `08_agent_context` | `visual-first-delivery` skill, and the cross-repo map |
| `01_sops` | Asset intake: JPEG/PNG only, one folder, `Title_Date_Initials`, tags |

`docs/stb/STB-REUSABLE-ASSET-EXTRACTION-AUDIT-v1.md` shows this extraction
pattern already exists. It just has not been run on Shakti yet.

---

## 3. archify — for Major specifically

Turns an idea, plan or system into an interactive HTML visual you can explore
and share. Trending upstream project, actively maintained.

Recommended because of something Major said about himself:

> *"I'm a visual. I'm pretty visual."*

Two concrete uses:

- **Explaining a system to a client.** Sheetal could not picture what "the
  system" meant, and a paragraph did not fix it. An interactive diagram of
  where an enquiry goes would have.
- **Thinking.** Architecture is Major's strength; this gives that thinking a
  shareable artefact instead of a whiteboard photo.

Caveat: it produces explanatory visuals, not interface design. It will not help
design a homepage. Different tool, different job.

---

## Adoption order

1. **`claudex-loop`** — install the skills, run the next rebuild through it
2. **Backfill `HAMAL_MOB_PLAYBOOKS`** from this week's Shakti work, using the
   table above
3. **`archify`** when there is a system worth explaining visually

Both forks track upstream. Pull periodically rather than diverging, or the
fork becomes a snapshot nobody maintains.

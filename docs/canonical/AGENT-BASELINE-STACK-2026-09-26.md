# Agent baseline stack

**Created:** 2026-09-26
**Question:** what gets installed by default on every new Claude Code and Codex
workspace, so we stop rebuilding context and stop paying for slop.

All five repos below were cloned and read. Star counts were verified against
the GitHub API, not taken from the video — **they were all accurate.**

---

## The five, verified

| Repo | Stars | Licence | Last push |
|---|---|---|---|
| `multica-ai/andrej-karpathy-skills` | 215,195 | **none** | 2026-04-20 |
| `JuliusBrussee/caveman` | 107,873 | **MIT + BSL-1.1 split** | 2026-09-22 |
| `thedotmack/claude-mem` | 94,707 | Apache-2.0 | 2026-09-24 |
| `blader/humanizer` | 52,048 | MIT | 2026-09-06 |
| `ayghri/i-have-adhd` | 51,252 | MIT | 2026-09-19 |

### Two licence facts the video does not mention

**`andrej-karpathy-skills` has no LICENSE file.** 215k stars and no licence
means all rights reserved by default. The practical risk is near zero — it is
four paragraphs of behavioural guidance, not code — but the correct move for a
corporation is to **write our own version of the principles rather than vendor
the file.** Costs nothing, since we would tune the wording anyway.

**`caveman` is split-licensed.** `skills/` and the SDK surfaces are MIT, but
the compression engine and the Go binaries that embed it are **BSL-1.1**, with
an Additional Use Grant covering first-party self-hosted production use and
**requiring a commercial licence for third-party hosted, managed or embedded
services.** Read plainly: using the skill ourselves is fine; shipping the
engine inside a client deliverable is not, without a licence. Worth knowing
before it ends up in a $50k build.

---

## Tier 1 — always on, every workspace

### Karpathy's four principles — as our own file

> Think before coding · Simplicity first · Surgical changes · Goal-driven
> execution

Adopt the principles, not the file. They map almost exactly onto what actually
went wrong on Sri Shakti Shala:

| Principle | What it would have caught |
|---|---|
| Think before coding | A hero rebuilt three times because nobody wrote the brief down first |
| Simplicity first | Eleven home page sections where five would do |
| Surgical changes | A `width: 100%` that killed a shared container two pages away |
| Goal-driven execution | "Looks fine" instead of a verifiable success criterion |

Most of this is already in `CODEX.md` at this repo's root, written before I had
seen the Karpathy file. That convergence is the argument for it.

**Where:** `~/.claude/CLAUDE.md` for the global default, plus a per-repo
`CLAUDE.md` / `CODEX.md` that adds project specifics.

### claude-mem — persistent context across sessions

Apache-2.0, actively maintained, and it explicitly supports **Claude Code and
Codex both**, which is the arrangement here.

This is the direct answer to the stated problem. Compressed summaries carry
forward instead of raw transcripts, so a new session starts knowing what the
last one learned.

**One caution.** It guesses what to remember. It is a convenience layer, not a
source of truth. **The canonical layer stays the repo.** A decision that
matters gets written into `docs/` in the repo that owns it — claude-mem is how
an agent remembers it was discussed, not where the decision lives.

---

## Tier 2 — on when the work calls for it

### i-have-adhd — output shape

A skill that stops the agent burying the answer: lead with the next action,
number multi-step tasks, end on one concrete step, no preamble.

Pairs directly with `.claude/skills/visual-first-delivery/SKILL.md` — that one
governs *what* gets delivered for visual work, this one governs *how any
answer is shaped*. Use on execution work; leave off for brainstorming.

### humanizer — client-facing writing

Strips the twenty-five patterns that make text read as machine-written. For an
agency this is not cosmetic: proposals, outreach, and client-facing copy are
the product.

Two places it earns its keep immediately: the `outreach-writer` skill already
on this account, and Sheetal's site copy. It can also be trained on Major's own
writing so the voice is his rather than generically "human".

---

## Tier 3 — adopt with a boundary

### caveman — token reduction

The saving is real, roughly 30–60% depending on workload, and for an operation
running agents daily that is money.

**Two boundaries.**

*Commercial:* see the BSL note above. Skill yes; engine inside a client
deliverable, not without a licence.

*Practical, and this one matters more:* **do not run it on review, handover or
client-facing work.** Terse output is exactly where this week's four
regressions would have been easier to miss. The detail in a report is what
makes an error catchable — three of those four looked correct in source and
were only found because the write-up carried the measurement. Use caveman for
bulk mechanical work, not for the passes whose whole job is scrutiny.

---

## Install order

1. **Karpathy principles** into `~/.claude/CLAUDE.md`, written in our words
2. **claude-mem** globally — biggest single reduction in re-explaining
3. **i-have-adhd** and **humanizer** as toggled skills
4. **caveman** last, with the two boundaries above written down beside it

Then record the whole stack in `HAMAL_MOB_PLAYBOOKS/08_agent_context` so it is
a standard rather than five things one person happens to have installed.

---

## What this does not solve

Worth saying, because a stack of five repos can look like a finished answer.

None of these fix the actual failure on Sri Shakti Shala. That was **no written
specification for four months.** claude-mem would have faithfully remembered
the wrong assumptions. caveman would have made the wrong output cheaper.

The order is: write the brief, then hold the constraints, then make the agents
cheaper and more consistent at working inside them. This stack is the third
thing. It is worth doing, and it is third.

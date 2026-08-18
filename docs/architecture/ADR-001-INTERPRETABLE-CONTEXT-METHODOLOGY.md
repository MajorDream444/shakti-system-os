# ADR-001 — Interpretable Context Methodology (ICM)

Date: 2026-08-18
Status: **ACCEPTED — deferred until after launch (2026-08-28)**
Source: Van Clief & McDermott, *Interpretable Context Methodology: Folder Structure
as Agent Architecture* (`Folder_Structure_and_Architecture.pdf`, 26pp)

---

## Decision

Adopt ICM for the **content pipeline only**, as a new `workspace/` created after the
2026-08-28 launch. Do **not** retrofit `apps/web` or `docs/`.

## The five layers

| Layer | File | Question | Budget |
|---|---|---|---|
| 0 | `CLAUDE.md` | Where am I? | ~800 tok |
| 1 | `CONTEXT.md` | Where do I go? | ~300 tok |
| 2 | `<stage>/CONTEXT.md` | What do I do? | 200–500 tok |
| 3 | `references/` | What rules apply? | 500–2k tok |
| 4 | `output/` | What am I working with? | varies |

Layer 3 is the recipe (stable, internalized as constraints). Layer 4 is the
ingredients (per-run, processed as input). Folder numbering encodes execution order;
`output/` folders are the handoff points; the Layer 2 **Inputs table** is the control
point that scopes context explicitly and auditably.

## Why it fits the content pipeline

The Aug 13 founder meeting (S-001) describes a linear multi-stage pipeline:

```
weekly call → transcribe → doctrine passport review → repurpose → archive to Vault
```

Two strong alignments already exist in this repo:

1. **The doctrine files are already Layer 3.** `SHAKTI-VOICE-AND-LANGUAGE.md`,
   `SHAKTI-CANONICAL-VOCABULARY.md`, `SHEETAL-FOUNDER-PROFILE.md`,
   `SHAKTI-COLOR-DOCTRINE.md` are stable across runs and internalized as constraints.
   The breathwork negative prompt is a textbook L3 constraint.
2. **The doctrine passport is a Layer 2 stage contract with a human gate.** ICM lists
   "human decides between stages" as a property; this repo already states it as
   "AI prepares. Humans steward." Convergent design, arrived at independently.

## Why NOT `apps/web`

`apps/web` is a React/Vite application. Renaming `src/components/` to
`02_components/` would break Vite conventions, tooling and every import for no
benefit. ICM governs how an agent navigates context across pipeline stages — not
application source layout. The paper does not claim otherwise.

## Why deferred

At time of writing the project is ~10 days from opening to Sheetal's community, in
week one of a four-week sprint, with a hard date tied to the 2026-08-28 lunar eclipse.
A structural migration now is risk with no launch payoff.

The content pipeline is not needed until a community exists generating weekly calls to
feed it — which is what launching creates.

## Constraints for when we build it

1. **Do not duplicate doctrine.** `docs/doctrine/` remains the single source of truth.
   Stage `references/` point at it; the L2 Inputs table names which sections apply.
   Copying doctrine into each stage produces drift within weeks.
2. **The pipeline fans out, it does not pipe.** One weekly call yields ~30 clips, an
   article, a Substack post and an ebook chapter, across platforms, simultaneously.
   Keep this as *one* repurpose stage emitting many outputs, with per-platform
   reference files in L3. Do not make each platform its own stage — that breaks
   "one stage, one job" in spirit while satisfying it in letter.
3. **Accept the stated limits.** ICM has no native parallel agent coordination, is
   sequential by design, and requires manual re-run of failed stages. Acceptable for a
   weekly human-in-the-loop run; unacceptable for anything needing concurrency.

## Proposed shape (build after launch)

```
workspace/
  CLAUDE.md                     L0
  CONTEXT.md                    L1
  01_capture/                   recording + transcript
  02_doctrine_review/           doctrine passport — HUMAN GATE
  03_repurpose/                 clips · article · Substack · ebook chapter
  04_publish/
  shared/  _config/  setup/
```

## Revisit

Reopen after the first weekly call post-launch, when there is real pipeline volume to
design against.

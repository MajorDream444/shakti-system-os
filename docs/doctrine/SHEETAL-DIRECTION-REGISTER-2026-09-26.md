# Answering Sheetal's Direction — Decision Register

**Created:** 2026-09-26
**Answers:** `SHEETAL-DIRECTION-2026-09-25.md`, section by section
**Status:** Canonical. Where the two documents disagree, the direction document
states what she wants and this one states what was done about it.

> Every item she raised on the 25 September call appears below with a decision,
> a state, and the evidence for that state. **State is measured, not asserted.**
> Four items are marked NEEDS HER CONFIRM — those are judgement calls made on her
> behalf that she has not seen.

---

## How to read the state column

| State | Meaning |
|---|---|
| **DONE** | Built, measured, in the branch |
| **PARTIAL** | Built but incomplete, with the gap named |
| **NOT STARTED** | Decided, not built |
| **NEEDS HER CONFIRM** | Built, but it interprets something she said — she decides |

---

## §0 — The ten-second test

> *"In ten seconds… this is what it's about. This is where I can click."*

**Decision:** the first fold carries five things and nothing else — name,
what it is, a question, one paragraph, two doors.

**State: DONE.** The hero was rewritten to exactly that. Everything else that
used to sit above the fold was removed rather than shrunk.

---

## §1.1 — The first fold: name front and centre

> *"Shakti Shala is here twice, it should be like front and center."*

**She was factually right.** The name was the small text and a different phrase
was the big text.

**Decision:** swap them. The name becomes the `h1`; the old headline becomes the
descriptor beneath it.

**State: DONE.**

| | Before | After |
|---|---|---|
| Big text | Shakti Shadow & Somatics | **Sri Shakti Shala** |
| Small text | SRI SHAKTI SHALA · LIVING SCHOOL | A Living School of Shakti, Shadow & Somatics |
| Question | — | Is the goddess calling you? |

This is the Shakti Temple Arts pattern from §2 — name → what it is → a question
— which she singled out herself.

---

## §1.2 — Not about her

> *"I don't care about people coming because of me… I'm just a vessel."*
> *"These pictures are beautiful of me… but it's not super important."*

**Decision:** the four-portrait opening is gone. Her face moves deeper into the
site and onto her own page.

**State: PARTIAL — NEEDS HER CONFIRM.**

Done: the home page no longer opens with four photographs of her.

The open question: the hero is now a single real photograph of a temple water
shrine — `founder-holy-spring-sept24.jpg`. Sheetal is in it, small, in the lower
third, in red, head bowed, face not legible. It is a photograph of a temple that
happens to contain her, not a portrait.

**That is a judgement call made on her behalf.** It satisfies "I want this to
feel like a temple space" and "simple and realistic", and it is not a portrait —
but she said her face is not the hero more than once, and she has not seen this.
**She decides.** If it is wrong, the same frame works with a temple photograph
containing nobody.

---

## §1.3 — Real before stylised

> *"That first page should be simple and realistic. This should come after."*

**Decision:** progressive disclosure. Real photography at the door; the stylised
temple render moves to the Shala threshold, deeper in.

**State: DONE.** The homepage hero is an unretouched photograph. No render
appears above the fold.

---

## §1.4 — A magnet, not a funnel

> *"I'm not for everyone, I'm not trying to be for everyone."*

**Decision:** say who it is for, in the first fold, in plain words.

**State: DONE.** The hero body reads: *"For women learning to trust the body,
meet the shadow, and stop abandoning themselves."*

**Gap, and it is hers to answer:** that says who it is *for*. She also asked to
make obvious who it is *not* for, and nothing on the site currently does that.
Doing it well needs her words, not ours. **Open.**

---

## §1.5 — Simple, for her too

> *"Send me in a few lines, I need this, this, this."*

**Decision:** two options, never one, never five. Nothing she receives is longer
than it needs to be, and long documents are for the build, not for her.

**State: DONE as a standing rule.** Written into
`.claude/skills/visual-first-delivery/SKILL.md` and `CODEX.md` so it survives a
change of agent.

**Honest note:** this rule was broken repeatedly before it was written down. The
rule exists because of that, not in spite of it.

---

## §2 — The reference sites

**Decision:** adopt the Shakti Temple Arts structure — name, what it is, a
question, over a real photograph.

**State: DONE.** That is the structure the hero now uses.

**Constraint worth recording:** this container's network blocks all three
reference sites, so the pattern was reconstructed from her description and the
structure quoted in the direction document, **not** from looking at the live
sites. If any detail of that pattern matters, it should be checked by a human
with a browser.

---

## §3 — "I thought we were building a system"

This is the deepest objection on the call, and the most answerable.

Her five requirements, each with its real state:

| # | What she means by *system* | State | Evidence |
|---|---|---|---|
| 1 | **Finds** the right people | PARTIAL | The site exists and captures enquiries. No acquisition beyond her own Instagram. |
| 2 | **Filters** them — *"keeps the creeps out"* | NOT STARTED | See the Calendly leak below. This is the one she named as actively costing her. |
| 3 | **Routes** to the right doorway | DONE | Begin scores four pathways and assigns one without her deciding. |
| 4 | **Responds** so she is not the first reply | PARTIAL | Three emails written, verified live in Airtable, **all three switched off** pending her approval. Pathway-naming defect fixed 26 Sep — see below. |
| 5 | **Archives** her work | PARTIAL | Enquiries persist to Airtable. The media library does not ingest automatically — `DriveService.listLibraryAssets()` returns an empty array and is never called. |

**The single most direct answer to her objection is to show her 3 and 4
working.** She does not know they exist. A registration was verified end to end
on 25 September; the routing already runs.

**Do not overstate 5.** There is no Drive-to-site automation. Saying otherwise
is what damaged trust here.

### The Calendly leak — §3, named by her

> *"They're booking on my calendar and I have to cancel them."*

**Decision:** remove the direct Calendly link from her Instagram bio; route
through Begin so there is an actual filter instead of a line of text asking men
not to book.

**State: NOT STARTED.** This is hers to do — it is her bio — and it is the
cheapest win on the entire list. It costs her one edit and stops a leak she
raised unprompted.

---

## §4 — Commitments made on the call

| Who | What | When | State |
|---|---|---|---|
| Major | Homepage mock-up for review | Sun 28 Sep | **PARTIAL** — two full options built, awaiting his pick. Due in two days. |
| Major | One consolidated asset list | with the mock-up | **NOT STARTED** |
| Sheetal | Organise and upload media | ongoing | hers |
| Both | Full handoff | two weeks, before Navratri | in progress |

**Review discipline holds:** mock-up first, not deployed. One consolidated round
of feedback. *"I don't want any dribble."*

Dancing with Durga: nine nights, **11–19 October**, confirmed and on the site.

---

## §5 — Asset conventions

**Decision:** adopted verbatim as requirements. JPEG/PNG only, one intake
folder, `[Title]_[Date]_[Initials]`, multiple tags per file.

**State: DONE as doctrine, NOT STARTED as enforcement.** Nothing rejects a HEIC
today; the convention is written down and depends on people following it.

---

## §6 — What it means for the build

| # | Principle | State |
|---|---|---|
| 1 | Home page is a door, not a brochure | **DONE** — eleven sections cut to five |
| 2 | Sections must be justified, not invented | **DONE** — four repeating sections removed |
| 3 | A small type and colour system, held | **DONE** — 16px floor, contrast measured against real photographs rather than assumed |
| 4 | Her face is not the hero | **NEEDS HER CONFIRM** — see §1.2 |
| 5 | Seasonal containers rotate | **NOT STARTED** — Durga is currently hard-coded furniture |

---

## §7 — The standard

> *"I don't feel comfortable opening Shakti Shala in this state."*

The standard is not "technically complete." It is **she is confident enough to
send people to it.**

**State: not met.** She has not seen the rebuilt homepage. Until she does and
says so herself, this stays open — and nobody but her can close it.

---

## Her own vocabulary — governing all copy

Any letter, email or page written for her is checked against
`SHAKTI-CANONICAL-VOCABULARY.md`, which is built from **102 of her own posts**
across both Instagram accounts, 2024-09 → 2026-08.

Three rules that change what we write:

- **"Sadhana"** over a generic "practice" wherever the meaning is disciplined,
  chosen and sustained. Highest-value term recovered in that audit.
- **"Maa"** (87 uses) is her natural address for the goddess. Preferred over
  always writing "the goddess."
- **"Sovereignty" is a pillar name, not everyday register.** `Sovereignty &
  Power` is one of her five published pillars, so it stays. But one use in 102
  captions means it should not be sprinkled through body copy. In prose prefer
  *"trust your own power."*

Live Instagram is blocked from this container. The audit in the vocabulary
registry is the canonical source for her voice.

**Corrected 2026-09-26** from four graphics her social team published. Two
things changed:

- The registry previously said sovereignty was "our word, not hers — stop using
  it." **Withdrawn.** It is a published pillar name. Acting on the old rule
  would have stripped her own brand vocabulary out of her letters.
- The five pillars are now recorded verbatim with their published glosses, and
  `Sadhana` is confirmed in her live marketing — *"A 9-Night Navratri Sadhana ·
  Devotion With A Spine."*

**A deliberate divergence, worth stating.** Her feed's register is hotter than
the site's — *"People love Kali's fire until a woman actually has it."* The site
is calmer, and should stay calmer at the door. The feed is a megaphone; the site
is a temple door. The site is not an extension of Instagram and should not
converge on its typography or its heat.

---

## The pathway-naming defect — fixed 26 September

Emails 1 and 3 printed the stored enum directly, so a seeker would have read
*"the doorway that seems closest is **ONE_ON_ONE**"*. Same class of error as
"Seeker" appearing as visible copy on the site: an internal token reaching a
visitor.

**This was never a naming question.** Human names already existed — they are the
`nextStep` labels the website shows on every Begin result. The emails simply did
not use them.

**Fix:** a formula field, `Pathway (in words)` (`fldubgxCx1c57wQqs`), maps the
enum to sentence-ready text. Both automations now reference it. The app's writes
and the enum itself are untouched, so nothing else could break.

| Stored | What the seeker now reads |
|---|---|
| `CIRCLE` | the Weekly Shakti Circle |
| `ONE_ON_ONE` | private work with me |
| `CONTAINER` | the nine-session Shakti, Shadow & Somatics container |
| `RETREAT` | the retreat readiness pathway |

Both automations revalidated. **Still switched off** — the fix removes the
blocker, it does not grant the approval.

---

## The four things only she can answer

Everything else above is decided. These are not.

1. **The hero photograph** — temple shrine with her small and face-down in it.
   Right, or replace with a temple containing nobody?
2. **Who this is *not* for** — she asked for it; it needs her words.
3. **The three email sequences** — written, verified, defect fixed, switched
   off, waiting on her read.
4. **The Calendly link in her bio** — one edit, stops a leak she named herself.

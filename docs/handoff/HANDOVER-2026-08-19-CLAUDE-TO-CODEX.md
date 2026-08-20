# Shakti System OS — Handover

**Period covered:** 2026-08-16 → 2026-08-19
**Author:** Claude (Claude Code, remote session)
**Audience:** Codex / GPT strategic direction, Sheetal, Major
**Repo:** `MajorDream444/shakti-system-os`
**Branch:** `claude/epic-cray-ICKrI` — 2 commits ahead of `main`

---

## 0. TL;DR

| | |
|---|---|
| **Launch target** | 2026-08-28 lunar eclipse — **~9 days out** |
| **One blocker to open the doors** | `BEGIN_WRITES_ENABLED=false` in Vercel |
| **Backend** | Verified sound. All three checks pass. IDs match live base. |
| **Frontend** | Fixed a bug that blanked `/begin` and `/shala` entirely |
| **Doctrine** | 6 documents created/extended, per-claim sourcing |
| **Photography** | 18 images reviewed, selects assigned, clearance mapped |
| **Biggest risk** | Art direction is not finished, and it is not the same thing as the colour system being finished |

---

## 1. What was merged (already in `main`)

PR #10 merged as `d0e79cb`. Contains:

### 1.1 A production bug that mattered

`/begin` and `/shala` **rendered a blank page** whenever Google Fonts was unreachable.

Both route stylesheets opened with `@import url(fonts.googleapis.com…)`. A failed
`@import` makes Vite's CSS preload helper reject the entire lazy chunk, so the route
never mounts. Not a font fallback — a white screen.

Found because this sandbox blocks that host, which turned out to be a useful accident:
it is exactly what a seeker on a slow or restricted connection in India would hit.

Fonts now load from `index.html` as `<link>` with preconnect, where failure is
non-fatal and the serif stack falls back to Georgia.

**Side effect worth noting:** this also restored the Sanctuary Map and room entries.
My earlier QA runs had been reporting them `MISSING`, which I had wrongly attributed to
a flaky local server. They were missing because `/shala` was never mounting.

### 1.2 The guna colour system

Palette is now **doctrine, not taste**. From Sheetal directly (2026-08-13):

> *"white is sattva, red is rajas, black is tamas — the three gunas… that red is really
> important because you already have white and black."*

The site was rendering tamas and sattva and almost no rajas. That is a doctrinal
incompleteness expressed as a colour gap. Tokens added: `--rajas-red`, `--maroon-lit`,
`--pink-soft`, `--gold-lit`; ground warmed from `#050505` to `#0a0505`.

### 1.3 `/begin` contrast defect

Idle choice cards were `bg-stone-900/[0.2]` beneath a black gradient at `opacity-90` —
rendering **darker than their own field**. On the most decision-heavy screen in the flow.

Now a rose-maroon surface with a defined pink-gold border. Measured on real pixels:

| Sample | Value | vs field |
|---|---|---|
| Card border | `rgb(147,106,115)` | **4.26:1** ✅ |
| Card fill | `rgb(82,38,44)` | 1.57:1 (intentional) |

### 1.4 Doctrine layer

- `docs/doctrine/SHEETAL-FOUNDER-PROFILE.md`
- `docs/doctrine/SHAKTI-VOICE-AND-LANGUAGE.md`
- `docs/doctrine/SHAKTI-COLOR-DOCTRINE.md`
- `docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md` *(extended, not replaced)*
- `docs/research/SHEETAL-PUBLIC-SOURCE-REGISTER.md`
- `docs/architecture/ADR-001-INTERPRETABLE-CONTEXT-METHODOLOGY.md`

---

## 2. On the branch, not yet merged

`9781526` and `92db035`. Docs-only, no deployment risk.

- `docs/design/motion-study.html` — three motion intensities, live
- `docs/doctrine/SHAKTI-PHOTOGRAPHY-DIRECTION.md` — 18 images, selects, clearance
- Shri Yantra correction in the colour doctrine

---

## 3. Findings Codex should know

### 3.1 The vocabulary registry was wrong in three ways

Built from 102 Sheetal-controlled Instagram records, Sep 2024 → Aug 2026:

`shakti 175 · tantra 132 · feminine 118 · ritual 102 · Maa 87 · Kali 76 · healing 76 ·
retreat 65 · embodiment 64 · Devi 61 · goddess 59 · somatic 51 · sadhana 45 ·
devotion 37 · shadow 28 · nervous system 25 · breathwork 2 · sovereign 1`

1. **`sadhana` (45), `Maa` (87), `Devi` (61) were absent entirely.** Among her most-used
   words. Use `sadhana` in place of generic "practice" where the meaning is disciplined
   and sustained.
2. **"Sovereignty" is over-weighted.** One use in two years. It is *our* word, not hers.
   Keep the concept; stop using the word as if it were founder language. Prefer
   *"trust your own power"* — which is hers, verbatim.
3. **"Shadow" is lower-frequency than the brand name implies** (28). Do not let
   "Shakti Shadow & Somatics" cause shadow language to dominate beyond its real weight.

**The breathwork prohibition is confirmed and binding.** `breathwork` appears twice in
two years; `somatic breathwork` zero times. Codex's existing ruling stands.

### 3.2 Her voice is warmer than the site

Her highest-engagement post in two years — 15,318 likes, 1.26M plays — is:

> *"Talking dirty is cute. Have you tried devotion?"*

And:

> *"BE LOUD. BE PROUD. BE YOUR FUCKING SELF. Dare to be witnessed, to be seen, to be
> cringe 😂"*

The site is uniformly hushed. Rule: **reverent, not solemn. Warm, not precious.**
The register transfers; the specific words do not, without approval.

### 3.3 Her actual thesis, in her own current words

> *"Tantra and neuroscience arrive at the same truth through different languages.
> 🕉️ Ida & Pingala. 🧠 Parasympathetic & Sympathetic."* (2026-07-24)

Better and more specific than anything currently on the site. Should anchor the founder
section. Note she does not rank the two systems.

### 3.4 Credentials are BLOCKED

MSc Global Mental Health / King's College London / LSHTM reached this project through a
chat summary. **Never fetched, never verified.** They are the least-supported content in
the entire doctrine set and exactly the kind of claim that damages credibility if wrong.

Marked BLOCKED. Do not publish without Sheetal's direct confirmation. Absence is safer
than error.

### 3.5 Photography — the governing finding

18 images reviewed. **None are in the "soft pink, aged, temple-like" register** Sheetal
named as her reference.

Her real visual world is saturated, bright, documentary, joyful.

> **The frame carries the devotional register. The photograph carries the truth.**

Victorian-print treatment lives in borders, gold rule, yantra, ornament. Photographs
stay **unfiltered**. Ageing a documentary photograph reads as costume.

Two corollaries:
- **The pink must come from the interface** — the only pink in her whole set is a
  tourist sari. This makes the rajas UI work load-bearing, not decorative.
- **Red was already everywhere in her life.** The website was the only place missing it.
  The guna palette is observed, not imposed.

**One image per surface, each being its own metaphor:**

| Surface | Image | Why |
|---|---|---|
| Front door | Waterfall lotus | She kneels at the centre of a carved stone lotus — the exact form of the Threshold sigil, as real stone, with her at the bindu. Also replaces the CSS-faked water and flora. |
| `/begin` | Snow-range ascent | The flow opens at "the foot of the mountain." Five women, arms raised, facing one. No faces — zero consent friction. |
| Founder | Balcony portrait | Only frame of her unambiguously as practitioner. Garment is black/red/cream — tamas, rajas, sattva. |
| `/shala` | Temple at night | Arms raised to a shikhara. Near-black sky, stone, gold — the site palette occurring naturally. |

**Clearance:** 7 safe (solo or no faces), 5 need adult consent, 2 contain minors and are
marked do-not-publish. The safe set covers the entire front door, so **nothing is blocked
on consent.**

### 3.6 Shri Yantra — I was wrong, twice

I told Major, and wrote in the colour doctrine, that the existing Threshold sigil
"already carries this geometry" and satisfied Sheetal's request.

**It does not.** A Shri Yantra is nine interlocking triangles — four upward (Shiva),
five downward (Shakti) — forming 43 triangles around the bindu, ringed by 8- and
16-petal lotuses inside the bhupura with four T-gates.

Our sigil has **one** downward triangle in an 8-petal lotus. That is a yoni triangle.
Legitimate, but not what she asked for by name.

Corrected in doctrine. A parametric Shri Yantra now exists in the motion study — with a
stated caveat that the proportions are a faithful approximation, not a temple-grade
construction. In a true Shri Yantra every vertex meets its neighbours at exact
triple-points; that solution is iterative. **Sheetal will know the difference.**

---

## 4. Corrections I made to my own work

Included so the team knows what was revised and why.

| Claim | Correction |
|---|---|
| Threshold sigil satisfies the Shri Yantra request | False. It is a single yoni triangle. |
| Contrast floor: 3:1 on card **fill** | Imprecise. WCAG 1.4.11 is satisfied by border **or** fill. Lifting the fill to 3:1 requires ~`rgb(130,82,88)`, which floods the interface and violates Sheetal's "not overly" clause. Boundary now carried on the border. |
| I built a per-station luminosity system | Redundant. **Codex had already built a better one** (`.begin-station-1..8::before`, with water at 3, gold at 4, pink+green at 6). It was rendering at `opacity: 0.76` and reading as faint. I deleted mine and raised his. |
| Gemini's mockup implies a parchment/ivory ground | Misleading. The rendered mockup is **dark**; the linen is the desk the browser sits on. Sheetal said *"complement"* and *"add"*, and explicitly likes the dark. Dark-warmed direction confirmed. |

---

## 5. Backend

**Verified sound.** All three checks pass:

```
check:backend       Backend read checks passed.
check:begin-write   Begin secure-write checks passed.
check:vault         Vault sync checks passed.
```

Airtable base `appj3hDhI0HoulNrf` inspected live. **Every hardcoded ID in
`liveAirtable.ts` matches**: base, seekers, intakeResponses, requestsSignals, progress,
accessGrants. Schema has consent versioning and "no passive telemetry" written into
field descriptions — good design, and it should stay that way.

### THE launch blocker

```
BEGIN_WRITES_ENABLED = false
```

PAT is in Vercel. Wiring is correct. **Nothing writes until this is `true`.**

Flip it, then put **one real submission** through `/begin` and confirm the Seekers row
appears **before inviting anyone**. This is the single highest-priority item in the
project and it is a human decision, not an engineering one.

---

## 6. Tooling notes

### 6.1 Claude Design canvases — unreadable

I have **never been able to read a single one**. `Shakti_Shala_Vault_4/5/7.html`,
`Shakti_Team_Rules.dc.html`, `Shakti_Sanctuary__Wireframe_Map.html`,
`Shakti_Shala_Visual_Territory_Board_2.html` — all ~800KB bundled exports with content
base64-encoded inside a bundler runtime. Stripping tags yields only loader CSS.

**Consequence:** every reference to Team Rules tokens in doctrine came from Major
relaying them in chat, not from reading the canvas. If the canvas and the doctrine ever
disagree, **the canvas has not been verified by me.**

**Suggestion:** export design decisions as plain Markdown or JSON tokens alongside the
canvas. The canvas is good for humans and opaque to agents.

### 6.2 Remote environment constraints

Operationally relevant for anyone reproducing this work:

- **Egress policy blocks `*.vercel.app` and `drive.google.com`.** A 403 or `http:000`
  from those hosts is the sandbox, not the service. I could not view the deployed site;
  I built production locally and drove Chromium against that instead.
- **`/tmp` is wiped between turns.** Scripts and screenshots vanish. Persist anything
  that matters to the repo.
- **Inline images cannot be used.** Pasted images can be *seen* but are not written to
  disk — no bytes to crop, embed or commit. Only `@`-referenced uploads land as files.
  This is currently blocking the photography work.
- **No browser OAuth.** Drive connector and `higgsfield auth login` both need an
  interactive session.

### 6.3 Higgsfield

CLI and 8 skills installed. MCP server already authenticated. **But: 0 credits, free
plan** — every generation call will fail until topped up.

**Recommendation when credits exist:** use it for `upscale_image` and `reframe` on her
**real** photographs, and for ornament/texture. **Do not generate people or goddesses.**
There are 18 real photographs; a generated one will not beat the lotus waterfall, and it
would undercut exactly what makes the set good. The taste gate already prohibits
AI-generated goddess clichés.

---

## 7. Impressions

### 7.1 Codex's work is better than I first credited

My initial review called the atmosphere "CSS abstraction." Reading the source properly,
Codex had authored a genuinely considered per-station progression with bespoke hues —
water at station 3, gold at 4, pink and green at 6. **The design was right; the opacity
was wrong.** I nearly shipped a cruder linear ramp over the top of it.

The vertical ascent rail, the Sanctuary Map with honest status badges
(Open / Requires Preparation / Available to Request), and "Interest is not readiness" as
UI copy are all strong. `/shala` is the best surface in the build.

### 7.2 The real risk is conflating two different kinds of "done"

> The colour system is implemented ≠ the art direction is finished.

Palette, contrast and tokens are done and measured. But the flora and water are still
CSS gradients, there is no gallery, no Shri Yantra in the product, and no photography.
A stakeholder looking at the site today would see something coherent and dark, and would
not see Sheetal's world.

**~9 days to launch.** My honest read: the front door can be genuinely good by the 28th
*if* the four image files arrive this week. If they do not, launch with the current
build — it is sound, it works, it is not embarrassing — and treat art direction as a
fast-follow. Do not hold the eclipse date for photography.

### 7.3 Watch the authority chain

The Gemini briefing was a **third-party summary of a document I already held directly**,
and its prose description of "vintage parchment" nearly pushed the design to a light
ground that contradicts what Sheetal actually said. The mockup image corrected it.

This will keep happening as more tools summarise each other. The source register exists
for exactly this reason — **tier-1 is Sheetal's own words, and everything else is
corroboration.** Codex and GPT should both write to that register rather than around it.

### 7.4 The most valuable thing produced this week

Not the code. It is the observation that **her photographs already contain the doctrine**
— the guna colours in her clothing, the lotus she happens to be kneeling in, the mountain
the flow already invokes, red everywhere.

The design does not need to impose a system on her. It needs to notice the one she is
already living in. That is a better foundation than any token file.

---

## 8. Division of labour, proposed

Since GPT/Codex is strategic and I am engineering:

**Strategic (GPT/Codex):**
- Approve or revise the photography selects and clearance
- Resolve credential verification with Sheetal
- Decide launch scope: ship the 28th vs hold for art direction
- Own the content pipeline design (ADR-001, post-launch)

**Engineering (me):**
- Implement photography once files land
- Shri Yantra into the product
- Gallery and soft touches
- Measured verification of every visual change

**Shared, do not duplicate:** the doctrine documents. Extend, never overwrite. Codex's
breathwork ruling and my devotional-vocabulary addition coexist in the same file — that
is the pattern to follow.

---

## 9. Open items

| Item | Owner | Blocking |
|---|---|---|
| `BEGIN_WRITES_ENABLED=true` + test submission | Major | **Launch** |
| Four image files as attachments | Major | Placement study, art direction |
| Photo clearance confirmation | Sheetal | Group images only |
| Credential verification | Sheetal | Founder credential strip |
| Motion intensity decision (01 / 02 / 03) | Major + Sheetal | Motion implementation |
| Shri Yantra geometry review | Sheetal | Yantra ship |
| The two reference pages | Major | Vintage frame treatment |
| Merge branch → `main` | Major | Nothing — docs only |
| Higgsfield credits | Major | Upscaling only |
| `"Vic Indian"` → Victorian devotional prints | ✅ confirmed | — |

---

## 10. Live artifacts

**Motion study** — three Shri Yantra intensities on a shared 5.5s breath clock, plus
diya, bells and incense:
https://claude.ai/code/artifact/b2893fac-3128-45ef-930c-5c808aa9f539

The breath pacing is not decoration. Sheetal is a somatic therapist; pranayama is her
practice; her own thesis maps Ida/Pingala to parasympathetic/sympathetic. An interface
breathing at a coherent-breathing pace *is* the modality. My recommendation is
**Intensity 02 (Devotional)** — 03 is beautiful for about eight seconds and then starts
performing at you.

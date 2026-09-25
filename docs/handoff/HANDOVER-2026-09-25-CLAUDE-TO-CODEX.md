# Shakti System OS — Handover

**Period covered:** 2026-09-24 → 2026-09-25
**Author:** Claude (Claude Code, remote session)
**Audience:** Codex, Major, Sheetal
**Repo:** `MajorDream444/shakti-system-os`
**Production at time of writing:** `c5e19499` — READY on `www.srishaktishala.com`

---

## 0. TL;DR

| | |
|---|---|
| **Merged this period** | PR #28, #29, #30 — all live |
| **Registrations** | Working end to end. Verified with a real submission. |
| **Sheetal's verdict** | Still not confident enough to open Sri Shakti Shala. Homepage redesign agreed. |
| **Next deliverable** | Homepage mock-up for Sheetal — **Sunday 28 September** |
| **Handoff target** | **Two weeks**, before she travels to India for Navratri |
| **Biggest risk** | We do not have a hero photograph good enough for the homepage she wants |
| **One person waiting** | A real enquiry from 23 September has had no reply |

The client direction that governs everything below is in
`docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md`. **Read that first.** This
document is the engineering state; that one is what the work is for.

---

## 1. What shipped (all merged and live)

### PR #28 — Dancing with Durga
The page taking registrations.

| | Before | After |
|---|---|---|
| Artwork render | 479×621, starting 450px down | **604×782, starting 108px down** |
| Artwork on a phone | y = 1,427 (below the checkout) | **y = 375** |
| Resolution headroom | 1.63× | **2.32×** |
| Actions per payment card | 3 | **1** |

Founder supplied 3× upscales. Resampled keeping existing filenames, so no
component changes were needed:

- `durga-approved-art-sept23.jpg` — 779×1008 / 359K → **1400×1812 / 335K**
- `durga-nine-forms-approved-sept23.jpg` — 796×986 / 269K → **1100×1362 / 204K**

Both higher resolution *and* smaller on the wire. Masters kept in `upscaled/`,
added to `.vercelignore`.

### PR #29 — Navigation, home page length, cropped captions

Navigation cut from eight items to four: **About · Offerings · Dancing with
Durga · Begin**, plus the logo and the Start Path button.

> `/work-with-sheetal` was an **alias of `/offerings`** in the router. Two nav
> items served the same 9,990px page under different names. That was the
> clearest single instance of the repetition Sheetal reported.

`NAV_TARGETS` still carries Pathway, Retreat and Shala so existing links resolve.

Home page: **14,720px → 9,205px** desktop, **23,029px → 15,438px** mobile.

Four sections removed, not shortened:

| Removed | Why |
|---|---|
| `WaterfallDoctrine` | Covered the same ground as `Philosophy` |
| `ReadinessMap` | Restated the journey `Pathway` already lays out |
| `RetreatVision` | Describes work that is not bookable |
| `AuthorityStrip` | **Repeated `Philosophy`'s five pillars** — Shakti, Shadow, Sensuality, Somatics, Sovereignty — with the wording changed |

All four components remain in the tree. Each can be restored with one line;
`App.tsx` carries a comment saying so.

The hero gallery went from 2,231px to 588px. Four founder-selected frames were
stacked in one column; two-up keeps every image.

### PR #30 — Legibility

Reading floor raised to **16px** — 41 CSS declarations, Tailwind `text-[8..13px]`
across 16 files, `text-xs` across 14, and a `0.95em` container in the Shala
utility bar that left a bare `<strong>` at 15.2px.

A pixel-sampling contrast pass over 214 rendered text elements found nine real
failures, all where labels sit on photography. The cause was the ink, not the
ground:

| Was | Now |
|---|---|
| `#8a7c6d` | `#c7b6a2` |
| `#6b5f52` | `#bda994` |
| `#B27A52` | `#dc9a68` |

### Repository cleanup
Two duplicate application trees at the repo root (`shakti-shala/`,
`start-your-shakti-path (3)/`), byte-identical to directories under `apps/` and
referenced by nothing, plus five loose root images already named and filed.
**63 files, ~16MB.**

---

## 2. Verification state

Measured across 8 routes at desktop 1440 and mobile 390:

| Check | Before | After |
|---|---|---|
| Clipped or overflowing text | 13 | **0** |
| Text below 16px | 46 strings | **0** |
| Internal copy on screen | 17 strings | **0** |
| Horizontal page overflow | — | **none** |
| Contrast failures | 9 | **0** |

Four contrast flags remain on the Dancing with Durga payment cards. Computed
from their actual colours they are **7.37:1 to 10.64:1** — comfortably above the
floor. The sampler misjudges dense dark text on a light fill. Left flagged
rather than tuning the tool to hide them.

### Internal copy that was removed
Worth recording, because this is what made Sheetal feel unprofessional in front
of her own clients:

- **Testimonials** rendered the record schema — *quote, attribution, source,
  visibility* — as visible page content.
- **Offerings** carried approval-workflow language: *"Pricing and payment are
  shown only when Sheetal's team has approved the exact offer"*, *"Checkout
  appears only for founder-approved offers."*
- **"Seeker"** — the Airtable table name — appeared 13 times in visitor-facing
  copy.
- `data-asset-status` and `data-image-gate` governance attributes were in the
  shipped markup.

---

## 3. The system layer (this is the part Sheetal has not seen)

Her strongest objection on 25 September was *"I'm still doing everything
myself."* That was true. It is now substantially less true, and **nobody has
shown her.**

### Registrations and enquiries — working, verified
`BEGIN_WRITES_ENABLED` is `true` on Production and a redeploy has been taken.
Verified end to end with a real submission at 02:56 UTC on 25 September:

- Seeker row created, pathway assigned (`RETREAT`), consent recorded
- **Three** linked Intake Responses under session `begin_26ded7d1-…`
- Consent version `begin-consent-v1` stamped on each

> **Gotcha for whoever follows.** `BEGIN_WRITES_ENABLED` was created as a Vercel
> **Sensitive** variable, so its value can never be read back — not by the API,
> not in the dashboard. Do not try to verify it by reading. Overwrite it and
> redeploy, then confirm with a real submission.

When the flag is off the endpoint returns **HTTP 200** with
`status: "write_disabled"` and tells the visitor *"Your path is safe to continue
privately right now."* No error. Silent data loss. Worth knowing.

### Airtable automations
Base `appj3hDhI0HoulNrf` ("Shakti System OS").

| Automation | ID | State |
|---|---|---|
| Alert Sheetal — new Seeker | `wfl95VVAgnjAWTryg` | **ON** |
| Alert Sheetal — new request or signal | `wflArHp8Q5ekupFuK` | **ON** |
| Seeker sequence 1 — welcome reply | `wfla1bqAoGGVOw20C` | Created, **off** |
| Seeker sequence 2 — day three note | `wfljd0nV5rPyndQlb` | Created, **off** |
| Seeker sequence 3 — day seven, doorway | `wfli4aghkRe019PXK` | Created, **off** |

The three sequence automations are deliberately off. They send **in Sheetal's
name to people she has not met**, and she has not read them yet. She should,
before they are enabled.

New fields on `Seekers` supporting the sequence:

| Field | ID | Purpose |
|---|---|---|
| Sequence Step | `fldPBc3VYjBgYR2Wk` | 1 = welcome, 2 = day three, 3 = day seven |
| Pause Sequence | `fldJ4jziAZG86E2Jx` | Stops all further automated mail |
| Last Sequence Email At | `fldMRbvUXb4qKYBtj` | Gates the next step |

Every step checks `Pause Sequence` before sending. **Sheetal should tick it the
moment she writes to someone personally**, so nobody gets a warm human reply
followed by a robot.

---

## 4. Open — in the order I would take it

### 4.1 Reply to Akshay — *today*
`recya0TfwauUs8g3e` · `akshayoturkar2@gmail.com` · pathway CIRCLE · 23 September
22:30 UTC. A real person, not a test row. He came in before the alerts existed,
so nobody was told. **Not covered retroactively by the automations.**

### 4.2 Homepage redesign — *mock-up due Sunday 28 September*
Three first-fold directions exist as a design canvas. First fold only is
deliberate: the brief is the first ten seconds.

The structural move, and the one that answers her complaint directly:

> The name is currently the small eyebrow text and **"Shakti Shadow & Somatics"**
> is the headline. Swap them. The name becomes the headline; the old headline
> becomes the descriptor line — the slot `School Of Feminine Embodied Awakening`
> occupies on Shakti Temple Arts, the reference she singled out.

### 4.3 The hero photograph — *blocking the homepage*
**This is the biggest risk in the whole project and it is not an engineering
problem.**

Every reference site leads with one arresting, real photograph. What the repo
has is mostly stock nature or personal photos of Sheetal — and she explicitly
said the homepage should not be about her. The two best candidates:

- `founder-holy-spring-sept24.jpg` — real, Hindu, she is small in frame. Strongest.
- `temple_gates_1783418503682.jpg` — a real threshold, but those are **Tibetan
  Buddhist prayer flags**, arguably the wrong lineage for Shakti practice.

Direction C in the canvas exists precisely because it does not depend on a
photograph we do not have.

### 4.4 Everything else

| Item | Note |
|---|---|
| Offerings page | 9,998px desktop / 15,471px mobile. Has not had the home page's pass. |
| Contact page | Does not exist. Contact currently means the Begin form. |
| Retreat page | Removed from home; no destination. Needs one when retreats can be booked. |
| Testimonials | Page is honest but holds no client words. Blocked on Sheetal. |
| Calendly leak | "Women only" is text in a bio; men book anyway. Route through Begin. |
| Members' area | Loads and works. Its content has never been reviewed with Sheetal. |

---

## 5. Environment notes for whoever picks this up

Learned the hard way this session.

- **Container restarts silently revert the git checkout** to an older commit.
  It happened twice. `git fetch && git checkout -B <branch> origin/main` before
  trusting anything local.
- **`npm ci` omits devDependencies** — the environment sets `omit=dev`, so
  `@types/react` goes missing and the build fails with a wall of `TS7026`.
  Use `npm ci --include=dev`.
- **Chromium for Playwright** lives at
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Pass it as
  `executablePath`; the bundled path in `playwright` does not exist here.
- **Egress is blocked** for `www.srishaktishala.com`, `*.vercel.app` and every
  reference site. The live site cannot be inspected from this container. All
  visual verification was done against a local production build. Vercel's
  `web_fetch_vercel_url` works for server responses but returns only the SPA
  shell.
- **The `.dc.html` canvas format** and the verification scripts used this
  session (clipping sweep, type floor, pixel-sampled contrast) are worth
  rebuilding rather than rediscovering — they caught every regression below.

### Regressions this session caught in its own work
Recorded so the pattern is recognised, not repeated:

1. A `width: 100%` override killed the shared `.container` max-width, pushing
   the DWD hero to the viewport edge and the payment cards past it.
2. Restructuring the DWD hero left the `h1` rules pointing at the old parent,
   rendering *"Dancing with DurgaDevotion with a Spine"*.
3. A full-strength body-ink rule matched every `<p>` — including the payment
   card's audience and price, which sit on a **light gold fill**. They rendered
   cream-on-gold at **1.22:1** until it was caught.
4. A five-across pillar grid made the block **taller** (840px → 1,246px), not
   shorter. Reverted.

Measure after every layout change. Three of those four looked correct in source.

---

## 6. Honest assessment

The engineering is not the problem and has not been for a while. The backend is
sound, the commerce works, the write boundary and consent versioning are real,
and as of today the alerting works too.

What went wrong is that **a system was built to a specification nobody had
written down in the client's own words.** Every section was invented
independently, so nothing constrained anything, and the result was a site that
was internally coherent and externally baffling. Sheetal's clients got lost in
it, and so did she.

The fix is not more building. It is a small number of decisions made once —
what the first ten seconds say, what the five sections are, what the type scale
is — and then held. That is what the homepage directions and the design
direction document are for.

One more thing worth saying plainly: the home page is **37% shorter, not half**.
Getting to half means cutting the section offering the two ways to work with
Sheetal, which is the main route to booking. That was left in deliberately and
it is Major's call, not an oversight.

# Handover — the week of 23–30 September 2026

**Written:** 30 September 2026
**Covers:** Claude Code sessions, 23–30 September
**For:** Codex / ChatGPT as returning orchestrator, and anyone picking this up cold
**Canonical state at time of writing:** `main` = `21e6563` · branch
`claude/epic-cray-ICKrI` = `ebd4a9a`, **one commit unmerged**

> Read `docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md` first if you have not.
> It is the client specification in her own words. This document assumes it.

---

## 1. The one-paragraph version

The site went from something the client would not send people to, to something
she approved and is actively sending people to. Payments now record themselves
into Airtable through a live Stripe webhook. Five emails exist in her own
words and **every one of them is switched off**, waiting on two assets she
still owes. Four pull requests merged. The biggest single lesson of the week
is recorded in §6 and it is about verification, not design.

---

## 2. What she said, which is the only score that matters

On 25 September she would not open the Shala:

> *"I don't feel comfortable opening Shakti Shala in this state… it doesn't
> feel ready, it feels like we're still under construction."*

On 27 September, after the rebuild:

> *"I looked at the redesign and I felt excitement in my body… Sri Shakti
> Shala, a living school of Shakti Shadow & Somatics, is the goddess calling
> me. Clear, concise. It knows exactly what's here, who's here. Boom."*

> *"Before, I even got messages like 'what is this, I'm not really getting the
> website.' Now they're clearly getting it, because **they're paying without
> actually asking me.**"*

That last line is the outcome. Clarity converted.

---

## 3. The site

**Homepage — the Guided Path.** Founder-selected from two options. Order is
deliberate: explain the work, route to a door, show what is open, *then*
introduce the woman holding it. Pathway sits ahead of FounderPresence because
*"they should come because of the vision."*

- Name at 138px, breathing — a slow scale with a gold glow. "A Living School"
  taken literally.
- Five pillars are now real portals opening knowledge chambers that already
  existed in the codebase and had never been wired up.
- One word per crystal — Shakti · Shadow · Somatics · Sensuality · Sovereignty
  — with the full published pillar name inside the chamber. This replaced a
  CSS problem with an editorial answer and the type went *up*, not down.
- `SeasonalOffering` band added. Dancing with Durga Devi had been named only
  in a button, so the one bookable thing was invisible to anyone who scrolled.

**Hero photograph — approved, and the reason is worth keeping.** Not a stock
temple. It is the first water temple she visited in Bali, on her 35th
birthday, photographed that day. On her own smallness in the frame: *"Shala is
bigger than me, and I'm just, that's it."* **Do not swap this image.**

**Naming, all sourced from her own recordings:**

| Thing | Rule |
|---|---|
| The container | **Dancing with Durga Devi** — her title, no Maa |
| The goddess | **Maa Durga**, **Maa Kali**, **Maa Shailaputri** — always |
| The campaign chant | **Durga. Devotion. Dharma.** — cadence wins |
| The circle | **Shakti Moon Circles**, fortnightly — *not* weekly |

The Maa rule and its one exception are in
`docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md` with the transcript quotes.

**Also shipped:** both Instagram accounts in the nav; the six-month membership
commitment as fine print at 16px; her confirmed gathering dates (11, 13, 15 &
17 October) on the page rather than only in the welcome email; a Sri Yantra
drawn as geometry filling the blank right side of the Durga band; a downward
Shakti triangle replacing a glyph that was accidentally a hexagram.

---

## 4. The payment rail — live

`api/stripe-webhook.ts` → `apps/web/src/server/stripeWebhook.ts` → Airtable
**Payments** table (`tblf2kC6qHsgJMjUm`).

Verified against the real domain, not assumed:

```
GET https://www.srishaktishala.com/api/stripe-webhook
→ 405 Method Not Allowed, allow: POST
```

Three properties, because money is involved:

- **Fails closed.** No secret, bad signature or stale timestamp writes
  nothing. A missing row is recoverable from the Stripe dashboard; a forged
  one is not.
- **Idempotent** on the checkout session id. Stripe retries, and a duplicate
  row would show two sales where there was one.
- **Never creates access or a Seeker record.** It links to an existing Seeker
  by email, otherwise notes the buyer never came through Begin. Entitlement
  stays a human decision.

Signature verification is hand-rolled HMAC-SHA256 with `timingSafeEqual` — no
SDK in a function whose whole job is one POST. Seven cases pass: valid,
tampered body, wrong secret, missing header, ten-minute replay, unhandled
event, unconfigured.

**Vercel env is complete.** `STRIPE_WEBHOOK_SECRET` (production),
`AIRTABLE_PERSONAL_ACCESS_TOKEN`, `AIRTABLE_BASE_ID`, `BEGIN_WRITES_ENABLED`.

**Not yet done:** nobody has fired a Stripe test event end to end. The
endpoint answers correctly; a row has never actually landed.

---

## 5. The email system — built, in her words, entirely OFF

| Automation | State | Blocker |
|---|---|---|
| Alert Sheetal — new Seeker | **ON** | — |
| Alert Sheetal — new request/signal | **ON** | — |
| Seeker 1 — welcome | OFF | Ready. Awaiting a decision to switch on. |
| Seeker 2 — day three | OFF | `[WATCH THE SHAKTI WATERFALL EMBODIMENT PRACTICE]` is a dead placeholder |
| Seeker 3 — day seven | OFF | References that practice; meaningless until 2 works |
| Buyer welcome — on payment | OFF | Durga image 404s until the last commit merges; second branch is still a placeholder |

All five carry **Sheetal's own copy**, supplied 27 September
(`DWDEMAIL_27Sep_SK`, `SSSEMAILS_27Sep_SK`). Earlier drafts written for her
were discarded the moment hers arrived.

**The sequence order is inferred, not instructed.** She wrote the emails but
never said which fires when. The A→B→C reading is coherent — #1 promises next
steps "shortly", #2 delivers them with the free practice, #3 opens by
referring back to that practice — but she has not confirmed it.

**Two Airtable formula fields feed these:** `Pathway (in words)` maps the
stored enum to human words, and `Pathway clause` returns her exact
fortnightly description for CIRCLE and **empty for the other three on
purpose**, so a sentence ends rather than being completed in words she never
wrote.

---

## 6. Four mistakes worth inheriting

Recorded because the pattern matters more than the individual fixes.

**A test passed on the wrong thing — twice.**

The pillar-text containment check measured element boxes. `white-space:nowrap`
lets a heading honour its `max-width` while its glyphs paint straight out of
the box, so it reported ALL CLEAN while text visibly spilled off a crystal.
Now measures `Range.getClientRects()`.

Worse, and more recent: I committed her Durga image, verified it appeared in
`apps/web/dist/`, and reported it hosted. `.gitignore` ignores `*.jpg`
globally — `git add -A` had skipped it **silently**. The build looked correct
because Vite copies from the *working tree*. The file merged to main having
never existed there. **Verify against the pushed tree, not the build:**

```
git cat-file -e origin/<branch>:<path> && echo PRESENT
```

**A bug that only appears when embedded.** Section headings never declared a
colour; they inherited it. Fine on the deployed site, whose body carries the
dark theme — but inside a host that sets its own body colour, every heading
computed to `rgb(20,20,19)` and painted near-black on near-black photography.
"Begin Your Shakti Path" was effectively invisible. The founder found it, not
me, because I had only screenshotted the standalone build. **Rule: anything
that must be legible states its own colour. Nothing over photography inherits
from body.**

**Internal reasoning is not public copy.** One sentence about the fifth Durga
call went through four versions — "included" over-promised, "when the circle
is present for it" printed the private logic in public and read as *prove
yourselves*, "with a fifth" quietly over-promised again, and "**a fifth may
open**" finally stated the offer and nothing else. Full worked example in
`SHAKTI-VOICE-AND-LANGUAGE` §9.

**Her published vocabulary beat our doctrine, twice.** The registry said
"sovereignty" was our word and instructed agents to stop using it — her team
publishes **Sovereignty & Power** as a named pillar. And I applied Maa to the
container name until a transcript showed her saying both forms in one
sentence. **When doctrine and her own published words disagree, she wins.**

---

## 7. Documents added this week

| Document | What it is for |
|---|---|
| `doctrine/SHEETAL-DIRECTION-REGISTER-2026-09-26.md` | Every item she raised, answered, with measured state |
| `doctrine/SHAKTI-CANONICAL-VOCABULARY.md` | Amended: goddess naming rule, five pillars verbatim, sovereignty correction |
| `doctrine/SHAKTI-VOICE-AND-LANGUAGE.md` | Amended: §9, internal reasoning is not public copy |
| `canonical/CROSS-REPO-AGENT-MAP-2026-09-26.md` | Which repo owns what; STB and the platform are separate repos |
| `canonical/TOOLING-ADOPTION-2026-09-26.md` | claudex-loop, archify, HAMAL playbooks |
| `canonical/AGENT-BASELINE-STACK-2026-09-26.md` | Five repos verified, with two licence facts the source omitted |
| `assets/EMAIL-LINKED-FILES.md` | Where email assets live, and the gitignore trap |
| `handoff/DESIGN-CAPABILITY-ROADMAP-2026-09-26.md` | Tooling direction |

---

## 8. Open, and on whom

**Sheetal owes:**
1. **Vimeo link** for the Shakti Waterfall Embodiment practice — blocks two emails
2. **Copy for non-Durga buyers** — the only placeholder text left in the system
3. Confirmation of the **email sequence order**
4. The **Calendly link in her Instagram bio**, routed behind Begin — the leak she raised herself, still open

**Major owes:**
1. **Merge `ebd4a9a`** so the Durga image URL resolves
2. **Fire a Stripe test event** and confirm a row lands in Payments
3. Decide whether **Seeker 1** goes on alone — it is complete and self-contained, and today a woman who finishes Begin receives nothing

**Standing:** Dancing with Durga Devi opens **11 October**. Every buyer
between now and then receives a Stripe receipt and nothing else until the
buyer welcome is switched on.

---

## 9. Environment traps

- Container restarts silently revert the git checkout. `git fetch && git
  rev-parse origin/<branch>` before trusting anything local.
- `npm ci` omits devDependencies here — use `npm ci --include=dev`.
- Chromium for Playwright: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Egress blocks the live domain, Instagram and every design reference site.
  Use the Vercel MCP `web_fetch_vercel_url` to reach production.
- **`.gitignore` blocks all media by extension.** Add a per-directory
  exception before adding any image, or it is dropped without warning.
- Airtable attachment URLs expire in ~2 hours. Never link an email to one.

---

# Addendum — 3 October 2026

Sheetal sent a voice note from the Himalayas (she has left Bali; four days of
travel, arrived the night before) plus two Google Docs. Three things changed.

## 1. She wrote the Shala welcome herself

`SSSEMAILS_27Sep_SK` has been extended with two new emails. The first —
*"You've chosen to step into a space that is not only about your own
becoming, but about the collective rising of the feminine"* — is her own
copy for a woman who has just joined the Shala.

**That is the email I previously had to assemble from her phrases.** The
`Shala Membership — founding` branch of `Buyer welcome — on payment` now
carries her words verbatim, and both invented sentences are gone:

- ~~"choosing to be met"~~ — removed from this branch
- ~~"Founding members are the women who build the ground the rest will
  stand on."~~ — removed entirely

Airtable reports the automation valid. It remains **switched off**.

**Still needing her approval:** the `Shakti Embodiment — 1:1` branch is the
last assembled email, and it still carries *"choosing to be met"*. It is now
the only unapproved sentence in the buyer path.

## 2. A new sequence step exists that we have no home for

Her second new email, *"For those who haven't joined yet"*, is a nurture note
for a seeker who received the Waterfall practice and did not join. It names a
**founding discounted price** — a commercial claim with no counterpart
anywhere in the site or the base.

**It is also unfinished.** The document ends mid-sentence on *"That might "*.
It cannot be built from as it stands.

## 3. The 1:1 branch is missing three assets she always sends

Her real client welcomes (`Sample Email_SS_3Oct_Sk`, 3 October) route every
new 1:1 client through a coaching agreement attachment, an intake form at
`forms.gle/cam5Ewp8CoASEL6NA`, and Calendly at
`calendly.com/sheetalkandola/1-1-embodiment-session`. The Shakti Embodiment
branch references none of them. See `SHAKTI-VOICE-AND-LANGUAGE.md` §10.

## What she said about the freebie

> *"We do have the one freebie ready to go, the Shakti Waterfall."*

Consistent with what is already in Seeker 2 — her Vimeo link is in the
automation with tracking parameters stripped. The line in the table above
calling it *"a dead placeholder"* was written before the link arrived and is
**out of date**. The open question on it is unchanged and is not about the
link: the video is **password protected**, and egress here blocks Vimeo, so
nobody has yet opened it logged out to confirm it resolves.

She is still finishing the **A–Z of Tantra** PDF. Not ready.

## Her ask

A call, **Tuesday or Wednesday**. She is tired and unwell from the travel.
Nothing in this addendum needs to interrupt that.

# Live system state — email, payments, automations

**Updated:** 15 October 2026
**Audience:** any agent or person about to change the site, Airtable, Stripe or Vercel.

Read this before touching email, payments or automations. It records what is
live, what is deliberately switched off, and the mistakes that have already
been made here so they are not made again. Several of these cost real women
real emails.

---

## 1. The one constraint everything else follows from

**Airtable's native Send Email action cannot reach anyone who is not a
collaborator on the base.** On this plan it silently fails with
`NON_COLLABORATOR_RECIPIENTS`.

Proven 6 October: at the same instant, from the same new record, the alert
addressed to Sheetal succeeded while the seeker email failed. Four separate
runs failed this way. No seeker had ever received a welcome, and no buyer
would have either.

**Consequence:** Airtable may notify Sheetal. It may never email a customer.

---

## 2. Who sends what

| Email | Trigger | Transport | State |
|---|---|---|---|
| Seeker welcome + Shakti Waterfall | website, `/api/begin/complete` | **Resend** | live, proven 7 Oct |
| Day three, the doorway | **Vercel cron** `0 2 * * *` | **Resend** | live, no due seeker yet |
| Day seven | same cron | **Resend** | live, no due seeker yet |
| Buyer welcome | Stripe webhook | **Resend** | live, never completed end to end |
| Alert — new Seeker | Airtable | Airtable | live, works |
| Alert — new request/signal | Airtable | Airtable | live, works |
| Alert — new payment | Airtable | Airtable | live, **proven 12 Oct** |

**Trigger and transport are different things.** "Triggered by Airtable" does
not mean "sent by Resend". An Airtable automation can only use Airtable's own
action. Routing one through Resend would mean putting the Resend key inside
Airtable, which the owner has ruled out.

### Retired, and must stay off

`Seeker sequence 1`, `Seeker sequence 2`, `Seeker sequence 3`,
`Buyer welcome — on payment`.

They are kept unmodified as the record of Sheetal's copy. They are OFF because
they cannot reach a customer, and leaving them on put a red failure against
every real sale while Resend quietly did the work — which is exactly what
misleads someone watching that screen on a launch night.

**Do not switch them back on.** If emails appear to be missing, the fault is
in Resend or the webhook, never here.

---

## 3. Reading live state correctly

**`deploymentStatus` in the Airtable API is the truth:** `deployed` means on,
`undeployed` means off.

An earlier version of these notes claimed the API could not read this. That
was wrong, and the wrong claim was written into four automation descriptions,
then read back later as if it were live state. **Never trust prose in a
description field.** Use `deploymentStatus` and `list_automation_runs`.

---

## 4. The trap that has cost the most time

**Vercel injects environment variables at deploy time.** A variable added or
changed *after* a build is invisible to that build.

This has caused four separate false diagnoses:

- `RESEND_API_KEY` added 11 seconds after the build → "not configured"
- `STRIPE_WEBHOOK_SECRET` updated after the build
- `STRIPE_WEBHOOK_SECRET_SRI_SHAKTI` added under a name the code did not read
- `GUIDE_LINK_SECRET` rotated 77 minutes after the build

**Every time a secret changes, redeploy, then compare the deployment's
`created` against the variable's `updatedAt` before concluding anything.**

---

## 5. Secrets, by name only

Never commit a value. Never print one. Never put one in Airtable.

| Variable | Used by |
|---|---|
| `RESEND_API_KEY` | all customer email |
| `STRIPE_WEBHOOK_SECRET`, `STRIPE_WEBHOOK_SECRET_SRI_SHAKTI` | webhook signature |
| `CRON_SECRET` | the day-three/day-seven cron |
| `GUIDE_LINK_SECRET` | signing guide download links |
| `AIRTABLE_PERSONAL_ACCESS_TOKEN`, `AIRTABLE_BASE_ID` | all Airtable writes |
| `BEGIN_WRITES_ENABLED` | must be `true` or Begin saves nothing |

The webhook accepts **any** variable whose name starts with
`STRIPE_WEBHOOK_SECRET`, comma or whitespace separated, so several endpoints
can be served at once and a rotation does not drop events.

The `srishaktishala_SUPABASE_*` and `srishaktishala_POSTGRES_*` variables are
**unused**. Nothing in this codebase reads them. They arrived with an
integration on 14 October and are inert.

---

## 6. Rules the code enforces, which must not be relaxed

**State advances only after Resend accepts.** A seeker is never moved to the
next step, and a buyer is never marked welcomed, on an email that was not
accepted. Under the old Airtable path a failed send halted before the state
write and stranded people silently; here the absence of a step is a recorded
outcome, and the next run retries.

**Failure alerts use a pinned sender.** They ignore `RESEND_FROM_ADDRESS`,
because the likeliest cause of a customer send failing is a sender or domain
fault — the one thing that would also silence the alert.

**Four honest delivery states:** `sent`, `failed`, `skipped`, `private`. The
confirmation screen must never claim Sheetal was alerted unless an alert was
actually sent. That bug shipped once and is now guarded by tests.

**Nothing is sent from `@gmail.com`.** A free mailbox cannot be
domain-verified, so Resend rejects it. Mail goes from
`Sheetal Kandola <hello@srishaktishala.com>` with reply-to her Gmail.

**An unrecognised offering sends nothing** and flags the row. Inventing a
welcome is worse than sending none.

---

## 7. Offering detection — keep in step with `commerce.ts`

A Stripe **Payment Link** carries no offering name: no metadata, no client
reference, only an opaque `plink_` id. So the offering is resolved from the
**amount**, against the published prices.

On 11 October this was not yet true, and the first real buyer — Rachel
Tisdall, $150, the day Durga opened — was classified `Other`, received
nothing, and missed the first night.

**If a price changes in `apps/web/src/data/commerce.ts` and not in
`OFFERING_BY_AMOUNT` in `stripeWebhook.ts`, a buyer silently gets no welcome.**
The better long-term fix is to set `offering` metadata on each Stripe Payment
Link, after which the name match wins and the amount is only a fallback.

A custom amount — Daisy-Lia paid $222 — matches nothing and will always need a
human.

---

## 8. The guide is not a public file

`assets/guide/navratri-companion.pdf` is **outside** `public/` on purpose.
Anything in `public/` is served with no check at all.

It is reachable only through `/api/guide?t=<token>`. The token carries the
recipient, an absolute expiry and the document name, HMAC-signed. Refusals all
return the same 403 so a reader cannot distinguish expired from forged. Each
download logs the recipient, which is what makes a leaked link attributable.

`/api/guide-link` mints a link for one person.

**This stops the link circulating, not the file.** Someone who downloads the
PDF can forward the PDF. A per-buyer watermark is the deterrent for that and
has not been built.

---

## 9. Records that are not what they look like

Three Payments rows were created **by hand**, not by the webhook. Their Stripe
session IDs, amounts and paid-at times are incomplete — take those from
Stripe, and do not read a blank as "no money moved".

| Buyer | Note |
|---|---|
| Daisy-Lia DELANOE | $222, an unexplained amount. Sheetal owes her a free post-Navratri integration session that is in no email. |
| Rachel Tisdall | $150, the first real webhook row. Missed night one. |
| Namitha Vasudevan | amount unknown. |

All three, plus the seeker Bhaktiveda, were emailed from **Major's Gmail**,
honestly framed as on Sheetal's behalf rather than in her voice. Their
`Welcome Sent` is ticked but there is no Resend message id, and the notes on
each row say so.

---

## 10. Never verified

Say so rather than implying otherwise.

- `/api/guide` has never been loaded. The first real click tests whether
  Vercel bundles the PDF with the function.
- The cron has never had a due seeker, so it has never done real work.
- The buyer welcome has never completed end to end through Resend.
- Egress from the agent container blocks `srishaktishala.com`, `*.vercel.app`,
  Vimeo and `api.resend.com`. Everything here was verified from the deployed
  tree, Airtable run history and Vercel metadata — not by loading pages.

---

## 11. Working alongside other agents

Several agents and people work in this repository. To avoid overwriting each
other:

- **Push every change.** An uncommitted fix is invisible to everyone else and
  will be undone by the next agent who touches the file.
- **Prefer appending a dated section** to rewriting someone else's. Both of
  the long-running handoff documents are append-only in practice.
- **Re-read before editing** anything that carries state — `vercel.json`,
  `commerce.ts`, the automation descriptions. They have each been changed by
  more than one party this month.
- **Record what is true, not what was intended.** The single most expensive
  error in this project was a stale note describing a system that had since
  changed, read back later as fact.

---

## 12. The Vault — added 15 October, not live

A passwordless email sign-in, a server-side identity boundary, an entitlement
service and protected asset delivery were built on branch
`claude/epic-cray-ICKrI`. **Nothing is deployed and nothing is merged.**

What anyone touching this must know before changing it:

- **The Vault serves nothing today, and that is correct.** No Library Asset
  has been approved for publication, so every asset is refused to everyone.
  An empty Vault is the publication gate working.
- **Membership is never inferred from a Dancing with Durga payment.** The
  Payments table is not an input to the authorization decision at all.
- **No code creates an Access Grant.** The Vault's repository has no write
  method, on purpose.
- Three new secrets are required and must all differ from each other and from
  `GUIDE_LINK_SECRET`: `VAULT_MAGIC_SECRET`, `VAULT_SESSION_SECRET`,
  `VAULT_ASSET_SECRET`. Section 4 above applies to them — redeploy after
  setting them.
- **The single-use, revocation and rate-limit store is in process memory**,
  so those three guarantees are weaker than they read on Vercel. A durable
  store is the first thing to fix. Signatures and expiries are unaffected.
- No asset source is configured, so `/api/vault/asset` returns 503. No Drive
  permission was changed.

Full detail: `docs/canonical/VAULT-V1-SECURE-FOUNDATION-2026-10-15.md`.
Endpoint contract for Codex: `docs/contracts/VAULT-API-CONTRACT-v1.md`.

### Known outstanding

1. Redeploy production so the rotated `GUIDE_LINK_SECRET` is live, then mint
   and send four guide links.
2. Stripe statement descriptor still reads `WWW.SHEETALKANDOLA.COM`; should be
   `SRI SHAKTI SHALA`.
3. The $9 Navratri Companion product: needs Sheetal's Payment Link, two
   "Shri" → "Sri" corrections in the PDF copyright lines, and the
   participants-only wording rewritten for a public edition.
4. Backfill Stripe references on the three hand-made Payments rows.
5. Per-buyer watermarking before the guide sells.

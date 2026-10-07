# Controlled end-to-end test — prepared, NOT yet run

**Status:** READY TO EXECUTE. Held pending one external dependency.
**Blocker:** `srishaktishala.com` is not verified in Resend. Sheetal is
identifying where its DNS is managed. **Do not change nameservers and do not
attempt domain verification until Major supplies the provider.**

Nothing in this document sends an email. It is the procedure to run the moment
the domain shows Verified, written down now so the test is fast and identical
each time it is repeated.

---

## Preconditions — all must be true before step 1

| # | Condition | State as of 7 October | How to re-check |
|---|---|---|---|
| 1 | `RESEND_API_KEY` set for Preview **and** Production | **MET** — target `["production","preview"]`, `visibility: secret` | `filter_project_envs`; never decrypt |
| 2 | A preview deployment built **after** the key was last updated | **NOT MET** — key updated at `1791292095`, last preview built `1791292084`, 11s earlier | compare `updatedAt` to deployment `created` |
| 3 | `srishaktishala.com` verified in Resend | **NOT MET** — blocked on DNS provider | Resend dashboard → Domains |
| 4 | `BEGIN_WRITES_ENABLED` for Preview | **MET** | `filter_project_envs` |
| 5 | Branch unmerged, production untouched | **MET** — `main` at `0b742f7`, branch 6 commits ahead | `git log origin/main -1` |

Condition 2 is why the first attempt reported *"RESEND_API_KEY is not
configured"*. Vercel injects environment variables at deploy time, so a key
added after a build is invisible to that build. **A redeploy is required even
if nothing else changes.**

---

## The test

### Step 1 — redeploy Preview

Push any commit to `claude/waterfall-lead-path`, or redeploy the latest
deployment from the Vercel dashboard. Confirm `state: READY` and that its
`created` timestamp is **later** than the key's `updatedAt`.

### Step 2 — one controlled submission

Open `https://<preview-host>/begin` and complete the Guided Path.

| Field | Value |
|---|---|
| Name | `Resend Verified Test` |
| Email | `waterfall-evidence-2026-10-06@agentmail.to` |
| Consent | ticked |

That inbox is agent-controlled and currently empty, so anything arriving is
unambiguously from this run.

**Note on "exactly one record".** `upsertSeeker` matches on email, so this
address already maps to `rec7BJKP7tpA1cPWx`. The assertion is therefore
**one seeker row for that address**, not one new row. To force a brand-new row
instead, use a fresh address — AgentMail can create one in seconds.

### Step 3 — what the screen must say

| Screen text | Meaning | Verdict |
|---|---|---|
| "Your Shakti Waterfall practice is on its way" | Resend accepted | **PASS** |
| "could not be sent… Sheetal has been told" | Resend refused; alert sent | FAIL — read the reason |
| "could not be sent… please write to" | Nothing attempted; no key at runtime | FAIL — condition 2 |
| "Your path is held" with no practice line | No email given | wrong test input |

### Step 4 — evidence to capture

| # | Check | Where | Expected |
|---|---|---|---|
| 1 | One seeker row for the address | Airtable `tblKLBelhnhTaoS6o` | one record |
| 2 | Intake responses linked | `tblfGqSLi8NLBpSVv` | 3 rows |
| 3 | **`Sequence Step` = 1** | seeker row `fldPBc3VYjBgYR2Wk` | `1`, **and only because delivery was accepted** |
| 4 | `Last Sequence At` stamped | `fldMRbvUXb4qKYBtj` | the send time |
| 5 | Review flag NOT set | `fld0FrzbEm6Wu4tYT` | empty |
| 6 | Exactly one email received | AgentMail inbox | one message |
| 7 | From / Reply-To | that message | `Sheetal Kandola <hello@srishaktishala.com>` / `sheetalkandola@gmail.com` |
| 8 | Carries link and password | that message | `vimeo.com/1231792529`, `Shakti108!` |
| 9 | Resend message id | runtime log `waterfall_delivered` | an id, recorded here |
| 10 | Vimeo opens logged out | private browser window | plays; password behaviour documented |
| 11 | Mobile playback | phone | plays |

### Step 5 — the negative tests

These matter as much as the happy path, because the system's worth is in what
it does when something breaks.

1. **Hold Privately** — complete the path leaving email blank. Expect: no send,
   no `Sequence Step`, screen makes no promise.
2. **Intentional failure** — temporarily set `RESEND_FROM_ADDRESS` to an
   unverified domain on Preview, submit, expect: screen says Sheetal has been
   told, review flag set, note written with the reason, alert in her inbox,
   `Sequence Step` **still unset**. Then revert the variable.
3. **No duplicate on retry** — submit the same path twice. Expect one email;
   Resend de-duplicates on `seeker-welcome:<idempotencyKey>` for 24h.

### Step 6 — Sequence 2 cannot resend the practice

Confirm by reading, not by waiting three days: the day-three email body
contains no `vimeo.com` link and no password — it refers back to the practice
only. Already asserted in `check:resend`.

---

## Then, and only then

1. Controlled Buyer Welcome test (Stripe → webhook → Payments row → email).
2. Disable the native Airtable customer sends, so two systems can never both
   fire. **No urgency and no risk today:** the native action cannot reach a
   non-collaborator at all, which is the original bug, so there is currently
   zero duplicate exposure.
3. Record evidence, then merge and deploy **only on Major's approval**.

---

## DNS, when the provider is known

Not to be acted on yet. Recorded so it is quick when Major gives the word.

Resend will ask for records on `srishaktishala.com`, typically:

- a **TXT** record for domain verification;
- **DKIM** records (usually `resend._domainkey` or similar);
- an **MX** and **TXT/SPF** pair on a sending subdomain if a subdomain like
  `send.srishaktishala.com` is used.

The exact names and values come from the Resend dashboard and must be copied
from there, never guessed.

**Two things worth deciding at the same time:**

1. **Sending subdomain vs apex.** Sending from `send.srishaktishala.com` keeps
   the apex domain's existing mail setup untouched and isolates sending
   reputation. The From address can still read `hello@srishaktishala.com` only
   if the apex is verified — if a subdomain is used, the From becomes
   `hello@send.srishaktishala.com`, which is slightly less clean to read.
   Worth a decision rather than a default.
2. **The site is on Vercel.** If DNS is managed at Vercel, the records go in
   the same place as the domain. If it is at a registrar or Cloudflare, that is
   where they go. Nameservers must not be moved to find out — that would take
   the website down.

`hello@srishaktishala.com` is a **sending identity, not a mailbox**. Nobody
needs to watch it: every message sets Reply-To to `sheetalkandola@gmail.com`,
so replies land where Sheetal already reads.

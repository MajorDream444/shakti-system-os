# Vault inbox intake playbook

**Status:** design, approved by nobody yet. Nothing in here is built.
**Date:** 15 October 2026.
**Watches:** `10_UPLOAD_HERE_FIRST`, Drive ID `1eOgB0S-Z6qcvNcXWANarQyZl65QDJhR2`.

---

## Purpose

Sheetal drops a file into one folder. Everything after that — noticing it,
describing it, spotting that it is a duplicate, proposing where it belongs —
happens without anyone remembering to do it. **Nothing moves, publishes or
changes permissions until a human says so.**

The split is the whole design:

> **Detection is automatic. Disposition is human.**

## Inputs

- New and modified files anywhere under the intake folder, including
  subfolders Sheetal creates.
- Existing migration registers (`Sheetal_File_Index.csv`,
  `Sheetal_Pending_Files.csv`, `MIGRATION_STATUS.md`) as prior art — **read
  before proposing anything**, because 42% of the indexed corpus is already
  a duplicate of something else in it.

## Outputs

- An **intake event** row per file: Drive ID, version, name, MIME, bytes,
  parent path, owner, detected-at, hash where obtainable.
- A **proposal**: suggested Temple Library branch, suggested metadata,
  duplicate group, confidence, and the evidence for each.
- A **review queue** for Sheetal and Major.
- An append-only **event log**.

Proposals are written to the Library Assets work queue **as proposals**,
never as catalogued assets, and never with a publishing status.

## Owner

Major owns the pipeline. **Sheetal owns every disposition** — what a file
is, whether it is doctrine, whether it may ever be seen. Neither role is
delegable to an agent.

## Trigger

**Primary — Drive changes API with a push channel.** A watch on the intake
folder delivers a webhook when anything changes. Cheap, near-immediate.

**Recovery — polling on a cursor.** A scheduled pass every 30 minutes
replays the changes feed from the stored `startPageToken`. Push channels
expire, webhooks get dropped, and a silent intake folder is indistinguishable
from a broken one. **The poll is not a backup; it is the thing that makes
the system honest.** If the poll finds items the push never reported, that
discrepancy is itself logged and alerted.

Both paths write to the same cursor, and the cursor is persistent. A cursor
in process memory would re-scan the world on every cold start — which is the
same class of mistake as the in-memory session store in PR #39, and it must
not be repeated here.

## Tools

Drive changes API; the persistent store chosen for the Vault session work
(the same one — do not stand up a second); Airtable for the work queue;
Resend for the review digest, using the pinned alert sender from
`resendClient.ts` so a sender fault cannot silence it.

## Rules

1. **Idempotency key is `driveFileId + version`.** A file re-saved produces
   a new version and a new event; a webhook delivered twice does not.
2. **Duplicate detection before proposal.** Compare content hash first; fall
   back to `(name, bytes)` and mark the match as *probable, unverified* —
   the Drive connector in use today returns no checksum, and a dedupe that
   silently treats byte-equality as identity will eventually discard
   something that was not a copy. Never auto-discard either way.
3. **Classification is a proposal with its evidence attached.** "Audio,
   36 MB, title matches an existing Library asset" is a proposal. "This is
   the Vow Beneath the Path teaching" is a claim about doctrine, and an
   agent does not make it.
4. **Never fabricate doctrinal metadata.** Goddess, moon phase, lineage and
   intention come from Sheetal or stay blank. A plausible guess in a
   doctrine field is worse than an empty one, because it will be read back
   later as hers.
5. **Fail closed.** No cursor, no store, no credential, or an unreadable
   folder ⇒ the run stops, alerts, and changes nothing. A pipeline that
   degrades to "process what I can see" quietly skips files.
6. **Nothing is moved, renamed, deleted, published or re-shared** by the
   pipeline. Ever. Those are human actions taken deliberately.
7. **Sheetal's own uploads are flagged as hers** (owner
   `sheetalkandola@gmail.com`) and default to the most restrictive handling.
8. **Log the Drive ID, never the content**, and never a plaintext email.

## Status transitions

```
detected → described → deduplicated → proposed → in_review
                                                   ├→ approved → organized
                                                   ├→ rejected
                                                   └→ needs_founder_input
```

`organized` is reached only by a human performing the move. The pipeline
records that it happened; it does not do it.

## Failure and recovery

| Failure | Behaviour |
|---|---|
| Webhook missed | Recovery poll catches it; the gap is logged |
| Push channel expired | Renewal job; expiry is alerted, not silent |
| Drive 5xx / rate limit | Exponential backoff, 5 attempts, then dead-letter |
| Dead-letter | Row with the full event and the error; alerts; never retried blindly |
| Airtable write fails | Event stays `described`; the cursor does **not** advance |
| Hash unobtainable | Proceed, marked *unverified*; never claim a verified dedupe |
| Two instances racing | Atomic cursor compare-and-set; a loser re-reads |

**The cursor advances only after the event is durably recorded.** Same rule
as the seeker sequence: state never advances on work that did not complete.

## Maintenance

Weekly: dead-letter queue empty? cursor advancing? push channel renewed?
Monthly: duplicate groups reviewed; stale `in_review` items escalated.
Every change to the Temple Library branch structure updates the destination
map in one place.

## Handoff

The review digest goes to Sheetal and Major with: what arrived, what it
appears to be, what it duplicates, where it is proposed to live, and what is
blocked. **Each item carries a one-click "this is wrong" that returns it to
`needs_founder_input`** — a review that is easier to approve than to correct
is not a review.

## Training

A new operator needs to know three things:
1. The pipeline proposes; **it never disposes**.
2. An empty first page is not an empty folder (the connector pages at 5).
3. The migration registers currently **contradict each other** — see
   `docs/audit/DRIVE-AUDIT-MANIFEST-2026-10-15.md` §3. Read both, trust
   neither alone.

## Open decisions before any of this is built

1. **The public-link exposure in the audit manifest §1 outranks this
   entire workstream.** Automating intake into a world-readable folder
   organises material that is already exposed.
2. Which persistent store — it must be the same one the Vault session work
   adopts.
3. Whether a service credential with the Drive changes scope is approved.
4. Whether proposals live in Library Assets or a separate intake table.

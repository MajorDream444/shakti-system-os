# Vault API contract v2 — reconciled

**Supersedes:** `VAULT-API-CONTRACT-v1.md` (PR #39) and
`VAULT-V1-LIBRARY-AUTHORIZATION-CONTRACT.md` (PR #40).
**Status:** proposed. Needs Codex's agreement and Major's authorisation.
**Date:** 15 October 2026. Nothing here is implemented in either PR yet.

---

## What each PR got right

**Codex (#40)** has the better *shape*. Collections with titles and access
states, a four-value status enum, a strict runtime parser that rejects
anything off-contract, locked collections carrying zero items, no silent
mock fallback, and it is already wired into `LibraryRoom` without disturbing
the `/shala` design. That is the experience Sheetal approved and it is kept.

**Claude (#39)** has the better *authorization*. Server-decided identity,
publication gated before entitlement, per-asset permits issued at click
time, re-validation at delivery, uniform refusals, and no Drive URL
anywhere near a browser. That is the security and it is kept.

## The one thing that cannot survive

```ts
export type AuthorizedLibraryItem = {
  …
  deliveryUrl: string;   // ← removed in v2
}
```

`deliveryUrl` is a required string on every item. A server populating a
catalogue has only one thing to put there: a Drive URL. Given the audit
finding that **the whole Drive tree is `anyone: reader`**, such a URL is a
permanent public link to Sheetal's doctrine, served to a browser, cacheable,
and impossible to revoke.

**v2 replaces it with `assetId`.** The browser exchanges an `assetId` for a
short-lived permit at the moment of the click, and never holds anything that
works twice.

---

## Endpoints

One catalogue endpoint, Codex's name. One permit endpoint. One byte
endpoint. Auth endpoints unchanged from v1.

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/vault/request-link` | Ask for a sign-in link |
| `GET` | `/api/vault/callback?t=` | **Interstitial only.** Consumes nothing |
| `POST` | `/api/vault/callback` | Consumes the link, sets the session |
| `GET` / `DELETE` | `/api/vault/session` | Who is asking / sign out |
| `GET` | **`/api/vault/library`** | The catalogue |
| `GET` | **`/api/vault/permit?assetId=`** | One permit, ~2 minutes |
| `GET` | `/api/vault/asset?permit=` | The bytes |

`/api/vault/assets` from v1 is **retired**; its listing role moves to
`/api/vault/library` and its permit role to `/api/vault/permit`.

## The catalogue response

```ts
export const VAULT_LIBRARY_CONTRACT_VERSION = "vault-library-v2";

export type VaultLibraryStatus =
  | "ready"            // collections may be present
  | "empty"            // authorized, nothing approved for this viewer
  | "review_required"  // assets exist but none are approved for publication
  | "unavailable";     // fail-closed: unconfigured, or Airtable unreachable

export type VaultCollectionAccess = "free" | "membership_locked";

export type AuthorizedLibraryItem = {
  assetId: string;        // exchanged for a permit; NOT a URL
  title: string;
  description: string;
  durationLabel: string;
  categoryLabel: string;
  goddess?: string;
};

export type AuthorizedLibraryCollection = {
  id: string;
  title: string;
  description: string;
  access: VaultCollectionAccess;
  items: AuthorizedLibraryItem[];   // ALWAYS empty when membership_locked
};

export type VaultLibraryResponse = {
  contractVersion: typeof VAULT_LIBRARY_CONTRACT_VERSION;
  status: VaultLibraryStatus;
  collections: AuthorizedLibraryCollection[];
};
```

Codex's parser invariants are kept and extended:

- unknown `contractVersion` ⇒ reject
- `status !== "ready"` ⇒ `collections` must be empty
- `access === "membership_locked"` ⇒ `items` must be empty
- **new:** any item carrying a key that is not in the type ⇒ reject. A
  parser that ignores extra fields will happily pass a `deliveryUrl` a
  future server adds by mistake.

### Locked shells: the one place v1 yields

v1 hid everything a viewer could not open. v2 adopts Codex's **locked
collection shell**: title and description visible, `items` empty.

This is a deliberate, bounded disclosure. It reveals that a membership tier
exists — which the public site already says — and nothing about what is in
it. **Item-level hiding is unchanged:** an asset a viewer is not entitled to
is never named, never counted, and never present in any response.

## Permits

```
GET /api/vault/permit?assetId=ASSET-…
200 { "status":"ok", "assetId":"ASSET-…", "permit":"<opaque>", "expiresInSeconds":120 }
403 { "status":"refused", "message":"<the one sentence>" }
```

Fetched on click, never with the listing. Bound to the asset **and** to the
session. Every authorization check is made again at `/api/vault/asset`: a
permit records that a decision was made two minutes ago, it is not the
decision.

## Rules both implementations must hold

1. No Drive URL, in any field, in any response, ever.
2. No restricted metadata in a listing: no confidentiality label, no
   entitlement name, no publishing status, no count of what is hidden.
3. Publication is gated before entitlement, so an unapproved asset refuses
   identically to everyone.
4. Membership is never inferred from a Dancing with Durga payment.
5. One refusal sentence for every 403 across the whole surface.
6. `Cache-Control: private, no-store` and `X-Robots-Tag: noindex` on
   everything.
7. Fail closed to `unavailable` — never to prototype or mock data.
8. The existing `/shala` design is unchanged.

## Migration, in order

1. Codex renames `vault-library-v1` → `v2` and **drops `deliveryUrl`**,
   adding `assetId`. Parser gains the unknown-key rejection.
2. Claude retires `/api/vault/assets`; moves listing behind
   `/api/vault/library` returning the v2 shape, and permits to
   `/api/vault/permit`.
3. `LibraryRoom` calls `/api/vault/permit` on click and passes the permit to
   `/api/vault/asset`.
4. Joint check suite: one run asserting every rule above against both
   implementations.
5. Neither PR merges until step 4 passes and the persistent store (below)
   is in place.

## The production blocker, restated

PR #39's single-use, revocation and rate-limit state is **in process
memory**. On Vercel that means single use is only usually single use, a
revoked session can outlive its revocation, and rate limits multiply by the
number of warm instances.

**This must be a shared persistent store with atomic compare-and-set before
production**, and the intake pipeline in
`VAULT-INBOX-INTAKE-PLAYBOOK.md` must use the same one rather than standing
up a second. Required tests: multi-instance single-use consumption,
revocation propagation, enumeration resistance, session fixation.

## And the thing that outranks all of it

`docs/audit/DRIVE-AUDIT-MANIFEST-2026-10-15.md` §1: the Drive tree holding
every one of these assets is currently readable by **anyone with the link**,
including the Founder Source marked `Internal`. Until that is resolved, this
contract protects an entrance to a room whose back door is open.

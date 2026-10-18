# Vault API contract v1

**Status:** implemented on branch `claude/epic-cray-ICKrI`, not deployed.
**Audience:** Codex, and whoever builds the Vault page.
**Updated:** 15 October 2026.

This is the whole surface. Build against it; it will not change shape without
a new version of this file.

---

## Rules that apply to every endpoint

- All responses carry `Cache-Control: private, no-store, max-age=0` and
  `X-Robots-Tag: noindex, nofollow`.
- Every response body has a `status` field.
- **Refusals are deliberately identical.** A 403 says the same sentence
  whether the asset does not exist, is not approved, or is approved and not
  hers. Do not try to tell those apart in the UI — the server will not tell
  you, on purpose. The real reason is in the server log.
- The browser never receives a Drive URL, an entitlement name, a
  confidentiality label, or an asset it may not open.
- Identity comes only from the `sss_vault` cookie, which is `HttpOnly` —
  script cannot read it. Do not attempt to. Call `GET /api/vault/session`.

---

## `POST /api/vault/request-link`

Ask for a sign-in link.

```json
{ "email": "her@example.com" }
```

| Status | Body | When |
|---|---|---|
| `202` | `{"status":"acknowledged","message":"If that address is known…"}` | **Always**, whether the address is known, unknown, rate limited, or the send failed |
| `400` | `{"status":"invalid","message":"Please enter an email address."}` | No address in the request at all |
| `405` | `{"status":"invalid"}` | Not POST |
| `503` | `{"status":"unconfigured"}` | Vault secrets are not set |

**Build the UI for a single outcome.** Show the 202 message and stop. Do not
add "we don't know that address", a spinner that resolves differently, or
anything else that lets a visitor test whether a woman is one of Sheetal's.

Limits: 5 per address and 20 per source IP per 15 minutes. Both are reported
as the same 202.

## `GET /api/vault/callback?t=<token>`

The link in her email. Sets the session cookie.

| Status | Body |
|---|---|
| `200` | `{"status":"signed_in"}` + `Set-Cookie: sss_vault=…` |
| `403` | `{"status":"refused","message":"This link is no longer valid…"}` |
| `503` | `{"status":"unconfigured"}` |

Links open **once** and last 15 minutes. A second use is a 403, identical to
an expired or forged one.

> This returns JSON rather than redirecting because there is no Vault page
> yet. When one exists, this becomes a `302` to it carrying the same
> `Set-Cookie`, and nothing else about the contract changes.

## `GET /api/vault/session`

Who the server thinks is asking. Safe to call on every page load.

```json
{ "status": "ok", "signedIn": false }
{ "status": "ok", "signedIn": true, "email": "her@example.com", "grantCount": 0 }
```

`grantCount` is a number, never the area names. Always `200`.

## `DELETE /api/vault/session`  (`POST` also accepted)

Sign out. Optional body `{ "everywhere": true }` revokes every session issued
to her, which is what to offer when she thinks someone else has her inbox.
Always `200` `{"status":"signed_out"}`, and always clears the cookie — signing
out when already signed out is not an error.

## `GET /api/vault/assets`

What this viewer may open.

```json
{ "status": "ok", "viewer": "authenticated",
  "entries": [ { "assetId": "ASSET-FULL-MOON-001", "title": "Full Moon Teaching" } ] }
```

**`entries` is empty today, for everyone, including Sheetal.** No asset has
been approved for publication. Design the empty state as the normal state,
not as an error — a line such as *"Nothing has been opened here yet."*

`503 {"status":"unavailable"}` if Airtable cannot be read. Never fall back to
prototype data on this surface.

## `GET /api/vault/assets?assetId=<id>`

A permit for one asset.

```json
{ "status": "ok", "assetId": "ASSET-…", "permit": "<opaque>", "expiresInSeconds": 120 }
```

`403` with the shared refusal otherwise. Treat `permit` as opaque and
short-lived: fetch it at the moment she clicks, not when the list renders.

## `GET /api/vault/asset?permit=<permit>`

The bytes. `200` with `Content-Type` and `Content-Disposition` from the asset.

| Status | Meaning |
|---|---|
| `403` | The shared refusal. Permit bad, expired, from another session, or the grant has been withdrawn since |
| `503` | `"This teaching is not ready to open yet."` — **ours, not hers**: no asset source is configured yet |

Every authorization check is made again here. A permit is not a decision; it
is a two-minute note that one was made.

---

## What the UI must not do

- Do not render assets the listing did not return. There is no "locked" row.
- Do not read, store or send the email as an identity. The cookie is identity.
- Do not cache a listing or a permit.
- Do not surface `grantCount` as a tier name.
- Do not change the public sanctuary design to accommodate any of this.

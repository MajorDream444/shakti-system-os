# Vault v1 — secure foundation

**Date:** 15 October 2026
**Branch:** `claude/epic-cray-ICKrI`
**State:** implemented, tested, **not deployed and not merged**
**Follows:** the 15 October Vault reconciliation and the authentication &
asset readiness decision.

---

## 1. What was decided, and why

**Passwordless email sign-in, built on the signing pattern this codebase
already uses, rather than a hosted authentication provider.**

The decision report compared the two. The deciding evidence: there is no
Supabase project for Sri Shakti Shala, and all four projects visible to this
account are `INACTIVE`. The 16 `srishaktishala_SUPABASE_*` and
`_POSTGRES_*` variables added to Vercel on 14 October point at nothing this
session can see, and nothing in the codebase reads them. A paused project
cannot sign anyone in, and it pauses quietly.

Against that, the HMAC signing, expiry and recipient-binding primitive was
already built, already covered by tests, and already proven in production on
15 October when four real guide links were minted.

**Honest cost of the choice:** we own the crypto, and instant revocation
needs a durable store we do not yet have (§5). Revisit if Sheetal needs
multi-device session management or a second application shares the user base.

---

## 2. What was built

| File | What it holds |
|---|---|
| `server/vault/vaultTokens.ts` | The signing primitive. Three purposes, kept apart three ways |
| `server/vault/vaultConfig.ts` | Secrets and lifetimes; refuses to run on shared secrets |
| `server/vault/vaultStore.ts` | Single use, revocation, rate limits. **In memory — see §5** |
| `server/vault/vaultAuth.ts` | Request a link, follow it, sign out |
| `server/vault/vaultIdentity.ts` | The viewer identity boundary |
| `server/vault/vaultEntitlement.ts` | The whole authorization decision, in one pure function |
| `server/vault/vaultRepository.ts` | Read-only Airtable. **No write method exists on it** |
| `server/vault/vaultAssetDelivery.ts` | Listing, permits, protected streaming |
| `server/vault/vaultLogging.ts` | Attribution without plaintext addresses |
| `server/vault/vaultEmail.ts`, `vaultHttp.ts` | The letter; the composition root |
| `api/vault/*.ts` (5) | Thin routes. No rule is written in any of them |
| `checks/vaultAuthChecks.ts` | **81 checks**, wired into `npm run build` |

**No public page changed.** No component, no style, no route in
`vercel.json`'s rewrites. Nothing under `src/components` or `src/begin` was
touched, and no vault server code reaches the browser bundle — verified
against the built output.

---

## 3. The rules the code holds

**Identity is decided by the server.** There is no email parameter, no viewer
header, no id in a query string that the boundary will read. The only input
is a signed `HttpOnly` cookie. `AccessService.ts` in the browser still
defaults to `{ hasAccess: true }`; that no longer matters for anything real,
because the browser never sees a protected byte unless the boundary put it
there.

**Two gates, publication before entitlement.** An unapproved asset is refused
identically for everyone, including a fully granted member — otherwise the
difference between the two refusals would itself report what exists.

**Technically ready is not approved.** On 15 October all 22 Library Assets
carried "Needs Review" or "Internal" in publishing status, confidentiality
and content entitlement. **So the Vault serves nothing to anyone, and that is
the gate working.** A check asserts exactly this, so the day it stops being
true will be a deliberate act.

**Membership is never inferred from a payment.** A woman who bought Dancing
with Durga bought nine nights of Durga. The Payments table is not an input to
the authorization function at all — not as a fallback, not as a hint. Access
beyond Free comes from an Access Grant and nothing else.

**No grant is ever created by code.** The repository has no write method, so
no future edit to a route can mint one. Access Grants held zero records on
15 October; that is correct until a rule is approved.

**Everything fails closed.** No secret, a shared secret, an unreadable
Airtable, an unrecognised entitlement option, a renamed select — every one of
them locks the Vault rather than opening it.

**A guide link can never be a session.** Different secrets, a purpose mixed
into the signed material, and an explicit type check after verification. Any
one would do; all three are there. Tested, including the case where every
secret is misconfigured to the same value.

**Refusals are indistinguishable.** One sentence for every 403 across the
whole surface. "Send me a link" answers 202 whether the address is known,
unknown, rate limited or the send failed — otherwise the endpoint becomes a
way to ask whether a given woman is one of Sheetal's clients.

**No state advances on an email that was not accepted.** The same rule the
seeker sequence and the buyer welcome already follow.

**Logs attribute without naming.** A delivery records a stable HMAC
fingerprint and a masked address, not the plaintext one. A leak is still
traceable — Sheetal's side runs the same HMAC over the Seekers list — without
leaving a readable list of who opened what.

---

## 4. Tests and checks run

| | Result |
|---|---|
| `npm run check:vault-auth` | **81/81 pass** |
| `npm run build` (tsc, vite, four existing check suites, smoke) | **passes** |
| `npx eslint` on all new files | **clean** |
| `tsc --strict` on `api/vault/*.ts` | **clean** |
| Bundle sweep for vault server code, secrets, field ids | **absent from `dist/`** |

One real defect was found and fixed by these checks: the store swept its
consumed-token set using wall-clock time while callers supplied their own
clock, which silently turned a single-use link back into a reusable one
whenever the two disagreed. The store now takes the clock as an argument.

---

## 5. Remaining decisions, and what is NOT safe yet

**1 — The store is in process memory. This is the one real gap.**
On Vercel each invocation may be a fresh instance, so single use degrades to
"usually single use", a revoked session may be honoured until it expires on
its own, and the rate limit counts per instance. None of this fails open to
someone with no token — the signature and the expiry are maths, not memory —
but the three guarantees that depend on remembering are weaker than they
read. The short lifetimes (15-minute links, 12-hour sessions, 2-minute
permits) are what keep the exposure small. **Swapping in Vercel KV, Edge
Config or an approved Airtable table is one new class and one line in
`vaultHttp.ts`.** This should be done before the Vault carries anything
Sheetal would mind being read twice.

**2 — No asset source is configured.** Reading from Drive needs a service
credential, and changing who may read those files needs a migration plan that
has not been approved. The default source **refuses**, and `/api/vault/asset`
returns 503. Nothing here touched a Drive permission. A fallback to the
public Drive URL was deliberately not written: it would hand out exactly the
bearer link the whole file exists to avoid.

**3 — Nothing is approved for publication.** Fourteen assets are technically
ready. Zero are approved. Until Sheetal approves a batch, the Vault is
correctly empty. The proposed first batch is in the decision report: the Full
Moon collection as Free, Shakti Sankalpa and The Vow Beneath the Path as
Member, and Kali Purification if she confirms the recording.

**4 — Access Grant rules are not approved.** No grant exists, so "Sri Shakti
Shala" and "Purchased" are unreachable tiers today. Who gets a grant, on what
basis, and whether a purchase ever produces one are founder decisions.

**5 — There is no Vault page.** The contract is fixed and documented so Codex
can build one without guessing.

**6 — Three secrets must be set in Vercel before any of this works:**
`VAULT_MAGIC_SECRET`, `VAULT_SESSION_SECRET`, `VAULT_ASSET_SECRET`. They must
differ from each other and from `GUIDE_LINK_SECRET`; the code refuses to run
if they do not. **Vercel injects environment variables at deploy time —
redeploy after setting them, then compare the deployment's `created` against
each variable's `updatedAt` before concluding anything.** That trap has
produced four false diagnoses on this project already.

---

## 6. Operating requirements for whoever holds this next

- **Never relax a fail-closed path to make something work.** Every one of
  them is load-bearing, and each has a check that will fail loudly.
- **Never add a reason to a 403.** The uniform refusal is the feature.
- **Never read identity from a request parameter.** If you find yourself
  wanting to, the boundary is being bypassed.
- **Never let a payment imply membership.** If that rule ever changes, it
  changes in `vaultEntitlement.ts` with Sheetal's written decision beside it.
- **Never write an Access Grant from code** without an approved rule, and
  never give `vaultRepository.ts` a write method.
- **Never log a plaintext address** on this surface. Use `describeViewer`.
- **Never point the asset source at a Drive URL the browser could receive.**
- **Approving an asset is a founder act, not an engineering one.** Changing
  Publishing Status in Airtable publishes it. Do not do it on her behalf.
- **Re-read before editing.** More than one agent works in this repository;
  push every change.

# Vault V1 — Temple Library Authorization Contract

Status: IMPLEMENTED CLIENT CONTRACT / SERVER RESOLVER PENDING

Owner: Sri Shakti Shala repository

Contract version: `vault-library-v1`

## Boundary

The existing Temple Library remains the participant experience. No separate
`/vault` route is introduced. The browser requests `GET /api/vault/library`
with same-origin credentials and renders only the server-authorized response.
It does not query Airtable, inspect `Access Level`, calculate entitlement, or
receive raw Drive URLs, rights notes, provenance notes, confidentiality, or
unpublished asset metadata.

The server response is the authorization decision:

```ts
type VaultLibraryResponse = {
  contractVersion: "vault-library-v1";
  status: "ready" | "empty" | "review_required" | "unavailable";
  collections: Array<{
    id: string;
    title: string;
    description: string;
    access: "free" | "membership_locked";
    items: Array<{
      id: string;
      title: string;
      description: string;
      durationLabel: string;
      categoryLabel: string;
      goddess?: string;
      deliveryUrl: string;
    }>;
  }>;
};
```

Locked collections must return `items: []`. Non-ready states must return
`collections: []`. The client rejects a response that violates either rule and
shows `unavailable`; this prevents restricted titles or delivery references
from leaking into browser state.

## Entitlement and publication rules

- `Content Entitlement` is distinct from historical `Access Level`.
- `Free` may be returned as an unlocked collection only when publication,
  confidentiality, rights, provenance, and application-safe delivery checks
  all pass server-side.
- `Sri Shakti Shala` may be returned unlocked only after the server validates
  the current authenticated subject and active membership grant. Otherwise it
  is a metadata-minimal locked collection.
- `Purchased` requires a validated grant for the relevant purchase.
- `Private`, `Internal`, and `Needs Review` are never returned as item records.
- Browser state, local storage, URL parameters, Stripe redirects, and legacy
  `Access Level` labels are not entitlement evidence.

## Current resolver state

`api/vault/library.ts` deliberately returns `503 unavailable`. That is the
fail-closed integration seam until Claude Code's authentication resolver and
server-side Airtable field identifiers are supplied and reviewed. Prototype
fixtures are not imported by runtime code.

## First mapping held for Sheetal

The repository includes non-runtime, review-only mappings for:

- Full Moon philosophy (`05_MOON_RHYTHM`)
- Shakti Sankalpa and the 40 Day Path (`03_AUDIO_REFLECTIONS`)
- The Vow Beneath the Path (`03_AUDIO_REFLECTIONS`)

All three remain `Needs Review`, contain no delivery URL or application-safe
reference, and must not be published until Sheetal approves entitlement,
publication, rights, provenance, and confidentiality.

## Remaining dependencies

1. Claude Code must provide the authenticated subject resolver used by the
   server endpoint, including unauthenticated and expired-session behavior.
2. The Airtable `Content Entitlement`, usage-rights, rights-holder,
   rights-status, provenance, publication-approval, and confidentiality field
   IDs must be verified in the Shakti base. No IDs are guessed here.
3. The server adapter must query only the Shakti `Library Assets` table and
   join approved `Access Grants`; no client data belongs in the reusable MAIM
   platform repository.
4. Sheetal must approve the first three assets and their seeker-facing copy.
5. Delivery URLs must be application-safe, expiring or otherwise access-bound;
   raw Drive URLs are not a delivery contract.

## Verification

- `npm run check:vault-library` — contract parser, fail-closed behavior, and
  review-fixture publication gates.
- `npm run typecheck:e2e` — browser-test contract compilation.
- `npm run test:vault-library` — free, locked, empty, unavailable,
  review-required, accessibility, and metadata non-disclosure behavior.
- `npm run build` and `npm run lint` — repository regression gates.

Human gate: **HOLD** for live content. The client foundation is reviewable;
authentication, server Airtable resolution, and Sheetal's publication approval
remain required before activation.

/* Who may see what. The whole authorization decision lives in this one pure
   function, so there is exactly one place to read, test and argue with.

   ── THE TWO GATES ─────────────────────────────────────────────────────────
   An asset must pass BOTH, in this order, and the order matters.

     PUBLICATION   Has Sheetal approved this for anyone outside her own
                   workspace? Technically ready is not approved. A record with
                   a verified source file, a Drive URL and a clean transcript
                   is still private doctrine until she says otherwise. On
                   15 October 2026 none of the 22 catalogued assets had been
                   approved, so a correct Vault serves nothing. An empty Vault
                   is this gate working, not a bug to route around.

     ENTITLEMENT   Given that it IS published, does this particular viewer
                   hold what it asks for?

   Publication is checked first so that an unapproved asset is refused
   identically for everyone, including a signed-in member. Otherwise the error
   a member sees would differ from the one a stranger sees, and the difference
   would quietly report what exists.

   ── WHAT MEMBERSHIP IS NOT ────────────────────────────────────────────────
   Membership is NOT inferred from a payment. A woman who bought Dancing with
   Durga bought nine nights of Durga; she did not buy the library, and nothing
   in what she agreed to says she did. The Payments table is therefore not an
   input to this function at all — not as a fallback, not as a hint. Access
   beyond Free comes from an Access Grant record and from nothing else.

   On 15 October 2026 the Access Grants table held zero records, which is the
   correct state: no grant rule has been approved. This service only READS
   grants. Creating them is a founder decision with an approved rule behind
   it, and no code here writes one. */

/* Airtable "Content Entitlement" on Library Assets, field fldIkqPSce1LxA3bY.
   The strings are the option names as they exist in the base today. An
   unrecognised value is treated as the most restrictive case, never the most
   permissive — a renamed option must lock the Vault, not open it. */
export type ContentEntitlement =
  | "Free"
  | "Sri Shakti Shala"
  | "Purchased"
  | "Private"
  | "Internal"
  | "Needs Review";

export const CONTENT_ENTITLEMENTS: ContentEntitlement[] = [
  "Free",
  "Sri Shakti Shala",
  "Purchased",
  "Private",
  "Internal",
  "Needs Review",
];

/* Airtable "Publishing Status", field fldGZsqAtaQdk7dU3. Only these two mean
   the work may leave her workspace. */
const PUBLISHED_STATUSES = new Set(["Approved", "Published"]);

/* Airtable "Confidentiality", field fldB3rDoc2Mg7UJX5. Anything that is not
   plainly cleared blocks publication regardless of the other fields. */
const CONFIDENTIALITY_CLEARED = new Set(["Public", "Shareable", "Cleared"]);

export type VaultAsset = {
  /* The human asset id, e.g. ASSET-FULL-MOON-001. Used in URLs and logs. */
  assetId: string;
  title: string;
  publishingStatus: string | null;
  confidentiality: string | null;
  contentEntitlement: string | null;
  /* Present so delivery can find the file. NEVER returned to a browser; see
     vaultAssetDelivery.ts. */
  sourceUrl: string | null;
};

/* What the server knows about the person asking. Built only from a verified
   session and from Airtable; never from anything the browser asserts. */
export type ViewerIdentity =
  | { kind: "anonymous" }
  | {
      kind: "authenticated";
      subject: string;
      sessionId: string;
      /* Access Grant areas held by this woman, as read from Airtable. An
         empty array is the normal case today. */
      grantedAreas: string[];
    };

export type AccessDecision =
  | { allowed: true; reason: "free" | "granted" }
  | {
      allowed: false;
      /* Why, for the log and for Sheetal. Never for the browser: every
         refusal is rendered as the same sentence. */
      reason:
        | "not_approved_for_publication"
        | "confidentiality_not_cleared"
        | "entitlement_unset_or_unknown"
        | "internal_only"
        | "private_to_founder"
        | "authentication_required"
        | "grant_required";
    };

/* The Access Grant area each entitlement asks for. Free asks for none.
   Private and Internal are deliberately absent: no area can satisfy them,
   because they are never served through this surface at all. */
const REQUIRED_AREA: Partial<Record<ContentEntitlement, string>> = {
  "Sri Shakti Shala": "Sri Shakti Shala",
  Purchased: "Purchased",
};

function normaliseEntitlement(raw: string | null): ContentEntitlement | null {
  if (!raw) return null;
  const match = CONTENT_ENTITLEMENTS.find((value) => value.toLowerCase() === raw.trim().toLowerCase());
  return match ?? null;
}

export function decideAccess(asset: VaultAsset, viewer: ViewerIdentity): AccessDecision {
  /* ── Gate one: publication ─────────────────────────────────────────── */
  if (!asset.publishingStatus || !PUBLISHED_STATUSES.has(asset.publishingStatus.trim())) {
    return { allowed: false, reason: "not_approved_for_publication" };
  }
  if (!asset.confidentiality || !CONFIDENTIALITY_CLEARED.has(asset.confidentiality.trim())) {
    return { allowed: false, reason: "confidentiality_not_cleared" };
  }

  /* ── Gate two: entitlement ─────────────────────────────────────────── */
  const entitlement = normaliseEntitlement(asset.contentEntitlement);

  /* Blank, "Needs Review", or an option nobody here recognises. All three
     mean the same thing: no one has decided, so the answer is no. */
  if (entitlement === null || entitlement === "Needs Review") {
    return { allowed: false, reason: "entitlement_unset_or_unknown" };
  }
  if (entitlement === "Internal") return { allowed: false, reason: "internal_only" };
  if (entitlement === "Private") return { allowed: false, reason: "private_to_founder" };

  if (entitlement === "Free") return { allowed: true, reason: "free" };

  /* Everything past here needs a named person. */
  if (viewer.kind !== "authenticated") {
    return { allowed: false, reason: "authentication_required" };
  }

  const area = REQUIRED_AREA[entitlement];
  if (!area) return { allowed: false, reason: "grant_required" };

  const holds = viewer.grantedAreas.some((held) => held.trim().toLowerCase() === area.toLowerCase());
  return holds ? { allowed: true, reason: "granted" } : { allowed: false, reason: "grant_required" };
}

/* The single sentence every refusal shows. One wording for every reason, so
   the page cannot be used to enumerate what exists or to discover which tier
   an asset sits in. The real reason goes to the server log. */
export const REFUSAL_MESSAGE =
  "This teaching is not open to you yet. If you believe it should be, please write to sheetalkandola@gmail.com.";

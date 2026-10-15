/* Authorization checks for the Vault.

   These are written the way the signed-link checks are written: the happy
   path gets a line or two and the refusals get the rest, because a Vault
   that fails to open is an inconvenience and a Vault that opens wrongly is
   a breach of a woman's trust in a teacher.

   Run with `npm run check:vault-auth`, and as part of the build. */

import {
  getVaultConfig,
  getVaultReadiness,
} from "../server/vault/vaultConfig.js";
import {
  decideAccess,
  type VaultAsset,
  type ViewerIdentity,
} from "../server/vault/vaultEntitlement.js";
import {
  buildClearedSessionCookie,
  buildSessionCookie,
  readCookie,
  resolveViewer,
} from "../server/vault/vaultIdentity.js";
import { InMemoryVaultStore } from "../server/vault/vaultStore.js";
import { mintVaultToken, verifyVaultToken } from "../server/vault/vaultTokens.js";
import { completeSignIn, requestSignInLink } from "../server/vault/vaultAuth.js";
import {
  issueAssetPermit,
  listAvailableAssets,
  streamAsset,
  unconfiguredAssetSource,
  type VaultAssetSource,
} from "../server/vault/vaultAssetDelivery.js";
import type { VaultReadRepository } from "../server/vault/vaultRepository.js";
import { describeViewer, fingerprintSubject } from "../server/vault/vaultLogging.js";

const results: Array<{ name: string; pass: boolean; detail?: string }> = [];
const check = (name: string, pass: boolean, detail?: string) =>
  results.push({ name, pass, detail });

const ENV = {
  VAULT_MAGIC_SECRET: "magic_secret_not_real",
  VAULT_SESSION_SECRET: "session_secret_not_real",
  VAULT_ASSET_SECRET: "asset_secret_not_real",
  GUIDE_LINK_SECRET: "guide_secret_not_real",
  RESEND_API_KEY: "re_test_not_real",
  PUBLIC_SITE_URL: "https://example.test",
};

const at = (iso: string) => () => new Date(iso);
const NOW = at("2026-10-15T12:00:00Z");

/* An asset that passes both gates, used as the base for variations. */
const published = (overrides: Partial<VaultAsset> = {}): VaultAsset => ({
  assetId: "ASSET-TEST-001",
  title: "A teaching",
  publishingStatus: "Approved",
  confidentiality: "Public",
  contentEntitlement: "Free",
  sourceUrl: "https://drive.google.com/file/d/secret",
  ...overrides,
});

const anonymous: ViewerIdentity = { kind: "anonymous" };
const member = (areas: string[]): ViewerIdentity => ({
  kind: "authenticated",
  subject: "her@example.com",
  sessionId: "session-1",
  grantedAreas: areas,
});

function fakeRepository(overrides: Partial<VaultReadRepository> = {}): VaultReadRepository {
  return {
    listAssets: async () => [],
    getAsset: async () => null,
    listGrantedAreas: async () => [],
    isKnownSeeker: async () => true,
    ...overrides,
  };
}

/* A Resend stand-in. Returns what the real client expects from the API so
   nothing in these checks reaches the network. */
const acceptingFetch = (async () =>
  new Response(JSON.stringify({ id: "msg_test" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })) as unknown as typeof fetch;

const refusingFetch = (async () =>
  new Response(JSON.stringify({ message: "nope" }), {
    status: 422,
    headers: { "content-type": "application/json" },
  })) as unknown as typeof fetch;

async function main() {
  /* ───────────────────────── Token separation ───────────────────────── */

  const session = mintVaultToken(
    { purpose: "vault.session.v1", subject: "Her@Example.com", expiresInSeconds: 3600 },
    ENV.VAULT_SESSION_SECRET,
    NOW,
  );
  check("session: mints", Boolean(session?.token.includes(".")));
  check(
    "session: subject is normalised",
    verifyVaultToken(session!.token, "vault.session.v1", ENV.VAULT_SESSION_SECRET, NOW).valid &&
      session!.payload.s === "her@example.com",
  );

  const wrongPurpose = verifyVaultToken(
    session!.token,
    "vault.magic.v1",
    ENV.VAULT_SESSION_SECRET,
    NOW,
  );
  check(
    "separation: a session token presented as a magic link is refused",
    !wrongPurpose.valid,
    wrongPurpose.valid ? "" : wrongPurpose.reason,
  );

  /* The important one: even with the SAME secret, the domain prefix means a
     token minted for one purpose will not verify as another. */
  const sameSecret = mintVaultToken(
    { purpose: "vault.magic.v1", subject: "a@b.c", expiresInSeconds: 60 },
    "one_shared_secret",
    NOW,
  );
  check(
    "separation: identical secrets still do not let purposes cross",
    !verifyVaultToken(sameSecret!.token, "vault.session.v1", "one_shared_secret", NOW).valid,
  );

  check(
    "tokens: no secret FAILS CLOSED",
    !verifyVaultToken(session!.token, "vault.session.v1", undefined, NOW).valid,
  );
  check(
    "tokens: mint with no secret returns null, never an unsigned credential",
    mintVaultToken({ purpose: "vault.session.v1", subject: "a@b.c", expiresInSeconds: 60 }, undefined) ===
      null,
  );
  check(
    "tokens: a token signed with another key is refused",
    !verifyVaultToken(session!.token, "vault.session.v1", "a_different_secret", NOW).valid,
  );
  check(
    "tokens: expiry bites",
    !verifyVaultToken(session!.token, "vault.session.v1", ENV.VAULT_SESSION_SECRET, at("2026-10-16T12:00:00Z"))
      .valid,
  );

  for (const [label, bad] of [
    ["empty", ""],
    ["no dot", "justsomestring"],
    ["dot only", "."],
    ["garbage", "!!!!.aaaa"],
    ["undefined", undefined],
  ] as Array<[string, string | undefined]>) {
    let threw = false;
    let valid = true;
    try {
      valid = verifyVaultToken(bad, "vault.session.v1", ENV.VAULT_SESSION_SECRET, NOW).valid;
    } catch {
      threw = true;
    }
    check(`tokens: malformed (${label}) refused without throwing`, !threw && !valid);
  }

  /* ───────────────────────── Configuration ──────────────────────────── */

  check("config: a full set of distinct secrets is ready", getVaultReadiness(ENV).ready);
  check(
    "config: a missing secret is NOT ready",
    !getVaultReadiness({ ...ENV, VAULT_ASSET_SECRET: undefined }).ready,
  );
  check(
    "config: reusing GUIDE_LINK_SECRET as a vault secret is NOT ready",
    !getVaultReadiness({ ...ENV, VAULT_SESSION_SECRET: ENV.GUIDE_LINK_SECRET }).ready,
  );
  check(
    "config: two vault secrets sharing a value is NOT ready",
    !getVaultReadiness({ ...ENV, VAULT_ASSET_SECRET: ENV.VAULT_MAGIC_SECRET }).ready,
  );
  check("config: session lifetime defaults to twelve hours", getVaultConfig(ENV).sessionTtlSeconds === 43200);

  /* ───────────────────────── Entitlement ────────────────────────────── */

  check("entitlement: Free is open to a stranger", decideAccess(published(), anonymous).allowed);

  const notApproved = decideAccess(published({ publishingStatus: "Needs Review" }), member(["Sri Shakti Shala"]));
  check(
    "entitlement: an UNAPPROVED asset is refused even to a member",
    !notApproved.allowed && notApproved.reason === "not_approved_for_publication",
  );
  check(
    "entitlement: technically ready is not approved — a blank publishing status refuses",
    !decideAccess(published({ publishingStatus: null }), member(["Sri Shakti Shala"])).allowed,
  );
  check(
    "entitlement: confidentiality that is not cleared refuses",
    !decideAccess(published({ confidentiality: "Needs Review" }), member(["Sri Shakti Shala"])).allowed,
  );
  check(
    "entitlement: publication is checked BEFORE entitlement, so the refusal is identical for everyone",
    decideAccess(published({ publishingStatus: "Raw" }), anonymous).allowed === false &&
      decideAccess(published({ publishingStatus: "Raw" }), member(["Purchased"])).allowed === false,
  );

  const needsReview = decideAccess(published({ contentEntitlement: "Needs Review" }), member(["Sri Shakti Shala"]));
  check(
    "entitlement: Needs Review refuses",
    !needsReview.allowed && needsReview.reason === "entitlement_unset_or_unknown",
  );
  check(
    "entitlement: a blank entitlement refuses",
    !decideAccess(published({ contentEntitlement: null }), member(["Sri Shakti Shala"])).allowed,
  );
  check(
    "entitlement: an UNRECOGNISED option refuses rather than opening",
    !decideAccess(published({ contentEntitlement: "Something New" }), member(["Sri Shakti Shala"])).allowed,
  );
  check(
    "entitlement: Internal is never served, even to a member holding every area",
    !decideAccess(
      published({ contentEntitlement: "Internal" }),
      member(["Sri Shakti Shala", "Purchased", "Internal"]),
    ).allowed,
  );
  check(
    "entitlement: Private is never served",
    !decideAccess(published({ contentEntitlement: "Private" }), member(["Private"])).allowed,
  );

  const needsAuth = decideAccess(published({ contentEntitlement: "Sri Shakti Shala" }), anonymous);
  check(
    "entitlement: a member teaching refuses an anonymous viewer",
    !needsAuth.allowed && needsAuth.reason === "authentication_required",
  );
  const noGrant = decideAccess(published({ contentEntitlement: "Sri Shakti Shala" }), member([]));
  check(
    "entitlement: signed in but with NO GRANT is refused",
    !noGrant.allowed && noGrant.reason === "grant_required",
  );
  check(
    "entitlement: the wrong area does not satisfy a membership teaching",
    !decideAccess(published({ contentEntitlement: "Sri Shakti Shala" }), member(["Purchased"])).allowed,
  );
  check(
    "entitlement: the right grant opens it",
    decideAccess(published({ contentEntitlement: "Sri Shakti Shala" }), member(["sri shakti shala"])).allowed,
  );
  check(
    "entitlement: a Purchased teaching needs a Purchased grant",
    decideAccess(published({ contentEntitlement: "Purchased" }), member(["Purchased"])).allowed &&
      !decideAccess(published({ contentEntitlement: "Purchased" }), member(["Sri Shakti Shala"])).allowed,
  );

  /* The constraint that this whole service exists to hold. A buyer is a
     buyer; membership comes from a grant and from nothing else. There is
     deliberately no payment input to decideAccess, so this check asserts
     the shape of the function rather than a branch inside it. */
  check(
    "entitlement: a DWD buyer with no grant gets nothing beyond Free",
    !decideAccess(published({ contentEntitlement: "Sri Shakti Shala" }), member([])).allowed &&
      decideAccess(published({ contentEntitlement: "Free" }), member([])).allowed,
  );

  /* ───────────────────────── The real catalogue ─────────────────────── */

  /* Every one of the 22 records in Airtable on 15 October 2026 carries
     "Needs Review" or "Internal" in publishing status, confidentiality and
     content entitlement. The Vault must therefore serve nothing. */
  const realShaped: VaultAsset[] = [
    published({ assetId: "A1", publishingStatus: "Needs Review", confidentiality: "Needs Review", contentEntitlement: "Needs Review" }),
    published({ assetId: "A2", publishingStatus: "Needs Review", confidentiality: "Internal", contentEntitlement: "Internal" }),
  ];
  const realListing = await listAvailableAssets(
    member(["Sri Shakti Shala", "Purchased"]),
    fakeRepository({ listAssets: async () => realShaped }),
  );
  check(
    "catalogue: today's 22 records yield an EMPTY vault for a fully granted member",
    realListing.entries.length === 0,
  );

  const mixedListing = await listAvailableAssets(
    anonymous,
    fakeRepository({
      listAssets: async () => [published({ assetId: "OPEN" }), realShaped[0], realShaped[1]],
    }),
  );
  check(
    "listing: only openable assets are listed; the rest are absent, not shown locked",
    mixedListing.entries.length === 1 && mixedListing.entries[0].assetId === "OPEN",
  );
  check(
    "listing: no Drive URL is ever in a listing entry",
    !JSON.stringify(mixedListing).includes("drive.google.com"),
  );

  /* ───────────────────────── Identity boundary ──────────────────────── */

  const store = new InMemoryVaultStore();
  const identityDeps = { env: ENV, store, repository: fakeRepository(), now: NOW };

  check("cookie: parses the named value", readCookie("a=1; sss_vault=xyz; b=2", "sss_vault") === "xyz");
  check(
    "cookie: a duplicate name takes the FIRST, not the last",
    readCookie("sss_vault=real; sss_vault=injected", "sss_vault") === "real",
  );
  check("cookie: absent header is undefined", readCookie(undefined, "sss_vault") === undefined);

  const cookieValue = buildSessionCookie("abc", 3600, "sss_vault");
  check(
    "cookie: HttpOnly, Secure and SameSite are all set",
    cookieValue.includes("HttpOnly") &&
      cookieValue.includes("Secure") &&
      cookieValue.includes("SameSite=Lax"),
  );
  check("cookie: signing out expires it immediately", buildClearedSessionCookie("sss_vault").includes("Max-Age=0"));

  const noCookie = await resolveViewer(undefined, identityDeps);
  check("identity: no cookie is anonymous", noCookie.viewer.kind === "anonymous");

  const forged = await resolveViewer("sss_vault=not.a.real.token", identityDeps);
  check("identity: a forged cookie is anonymous, never an error", forged.viewer.kind === "anonymous");

  /* A session minted with the GUIDE secret must not open the Vault. */
  const guideShaped = mintVaultToken(
    { purpose: "vault.session.v1", subject: "her@example.com", expiresInSeconds: 3600 },
    ENV.GUIDE_LINK_SECRET,
    NOW,
  );
  const guideAttempt = await resolveViewer(`sss_vault=${guideShaped!.token}`, identityDeps);
  check(
    "identity: a token signed with GUIDE_LINK_SECRET is NOT a vault session",
    guideAttempt.viewer.kind === "anonymous",
  );

  const good = await resolveViewer(`sss_vault=${session!.token}`, identityDeps);
  check(
    "identity: a valid cookie resolves to the signed subject",
    good.viewer.kind === "authenticated" && good.viewer.subject === "her@example.com",
  );

  const withGrants = await resolveViewer(`sss_vault=${session!.token}`, {
    ...identityDeps,
    repository: fakeRepository({ listGrantedAreas: async () => ["Sri Shakti Shala"] }),
  });
  check(
    "identity: grants are read fresh from Airtable, not from the token",
    withGrants.viewer.kind === "authenticated" && withGrants.viewer.grantedAreas.length === 1,
  );

  const lookupDown = await resolveViewer(`sss_vault=${session!.token}`, {
    ...identityDeps,
    repository: fakeRepository({
      listGrantedAreas: async () => {
        throw new Error("airtable down");
      },
    }),
  });
  check(
    "identity: an Airtable failure FAILS CLOSED to anonymous",
    lookupDown.viewer.kind === "anonymous" && lookupDown.anonymousReason === "lookup_failed",
  );

  /* Revocation */
  await store.revoke({ subject: "her@example.com", sessionId: session!.payload.j, atUnix: 0 });
  const revoked = await resolveViewer(`sss_vault=${session!.token}`, identityDeps);
  check(
    "revocation: a revoked session is anonymous although its signature is still good",
    revoked.viewer.kind === "anonymous" && revoked.anonymousReason === "revoked",
  );

  const store2 = new InMemoryVaultStore();
  const laterSession = mintVaultToken(
    { purpose: "vault.session.v1", subject: "her@example.com", expiresInSeconds: 3600 },
    ENV.VAULT_SESSION_SECRET,
    NOW,
  );
  await store2.revoke({
    subject: "HER@example.com",
    atUnix: Math.floor(NOW().getTime() / 1000),
  });
  const everywhere = await resolveViewer(`sss_vault=${laterSession!.token}`, {
    ...identityDeps,
    store: store2,
  });
  check(
    "revocation: signing out EVERYWHERE kills a session it never named, matching case-insensitively",
    everywhere.viewer.kind === "anonymous",
  );

  /* ───────────────────────── Sign-in flow ───────────────────────────── */

  const freshStore = () => new InMemoryVaultStore();

  const unconfigured = await requestSignInLink(
    { email: "her@example.com", sourceKey: "1.2.3.4" },
    { env: { RESEND_API_KEY: "x" }, store: freshStore(), repository: fakeRepository(), now: NOW },
  );
  check("sign-in: no secrets means unconfigured, not an open door", unconfigured.status === "unconfigured");

  const malformed = await requestSignInLink(
    { email: "not-an-email", sourceKey: "1.2.3.4" },
    { env: ENV, store: freshStore(), repository: fakeRepository(), now: NOW },
  );
  check("sign-in: a request with no address is a plain 400 case", malformed.status === "invalid");

  const knownStore = freshStore();
  const sent = await requestSignInLink(
    { email: "Her@Example.com", sourceKey: "1.2.3.4" },
    { env: ENV, store: knownStore, repository: fakeRepository(), fetchImpl: acceptingFetch, now: NOW },
  );
  check("sign-in: a known address is sent a link", sent.internal === "sent");

  const unknown = await requestSignInLink(
    { email: "stranger@example.com", sourceKey: "1.2.3.4" },
    {
      env: ENV,
      store: freshStore(),
      repository: fakeRepository({ isKnownSeeker: async () => false }),
      fetchImpl: acceptingFetch,
      now: NOW,
    },
  );
  check("sign-in: an unknown address is NOT emailed", unknown.internal === "unknown_address");
  check(
    "sign-in: known and unknown are INDISTINGUISHABLE to the caller",
    sent.status === unknown.status && sent.status === "acknowledged",
  );

  const failed = await requestSignInLink(
    { email: "her@example.com", sourceKey: "1.2.3.4" },
    { env: ENV, store: freshStore(), repository: fakeRepository(), fetchImpl: refusingFetch, now: NOW },
  );
  check("sign-in: a Resend failure is recorded internally", failed.internal === "send_failed");
  check("sign-in: …and is STILL indistinguishable to the caller", failed.status === "acknowledged");

  /* Rate limiting: the sixth request from one address inside the window is
     refused, and the refusal still looks the same. */
  const limitStore = freshStore();
  const limitDeps = {
    env: ENV,
    store: limitStore,
    repository: fakeRepository(),
    fetchImpl: acceptingFetch,
    now: NOW,
  };
  const attempts: string[] = [];
  for (let i = 0; i < 6; i += 1) {
    attempts.push(
      (await requestSignInLink({ email: "her@example.com", sourceKey: "9.9.9.9" }, limitDeps)).internal,
    );
  }
  check(
    "rate limit: five links per address, then refused",
    attempts.slice(0, 5).every((a) => a === "sent") && attempts[5] === "rate_limited_email",
  );

  const sourceStore = freshStore();
  const sourceAttempts: string[] = [];
  for (let i = 0; i < 21; i += 1) {
    sourceAttempts.push(
      (
        await requestSignInLink(
          { email: `woman${i}@example.com`, sourceKey: "8.8.8.8" },
          { env: ENV, store: sourceStore, repository: fakeRepository(), fetchImpl: acceptingFetch, now: NOW },
        )
      ).internal,
    );
  }
  check(
    "rate limit: a single source working through a list is stopped",
    sourceAttempts[20] === "rate_limited_source",
  );

  /* Single use */
  const magic = mintVaultToken(
    { purpose: "vault.magic.v1", subject: "her@example.com", expiresInSeconds: 900 },
    ENV.VAULT_MAGIC_SECRET,
    NOW,
  );
  const callbackStore = freshStore();
  const callbackDeps = { env: ENV, store: callbackStore, repository: fakeRepository(), now: NOW };

  const first = await completeSignIn(magic!.token, callbackDeps);
  check("callback: a fresh link opens a session", first.ok);
  check(
    "callback: the session cookie is HttpOnly and Secure",
    first.ok && first.setCookie.includes("HttpOnly") && first.setCookie.includes("Secure"),
  );
  const second = await completeSignIn(magic!.token, callbackDeps);
  check(
    "callback: the SAME link a second time is refused — single use",
    !second.ok && second.reason === "already_used",
  );

  const expiredMagic = await completeSignIn(magic!.token, {
    ...callbackDeps,
    store: freshStore(),
    now: at("2026-10-15T23:00:00Z"),
  });
  check("callback: an expired link is refused", !expiredMagic.ok);

  const sessionAsMagic = await completeSignIn(session!.token, { ...callbackDeps, store: freshStore() });
  check(
    "callback: a SESSION token presented as a magic link is refused",
    !sessionAsMagic.ok && sessionAsMagic.reason === "invalid_or_expired",
  );

  /* ───────────────────────── Asset delivery ─────────────────────────── */

  const deliveryRepo = (asset: VaultAsset | null) =>
    fakeRepository({ getAsset: async () => asset, listAssets: async () => (asset ? [asset] : []) });

  const missing = await issueAssetPermit(
    { assetId: "NOPE", viewer: anonymous },
    { env: ENV, repository: deliveryRepo(null), now: NOW },
  );
  check("permit: an unknown asset is refused", !missing.ok);

  const unapproved = await issueAssetPermit(
    { assetId: "A1", viewer: member(["Sri Shakti Shala"]) },
    { env: ENV, repository: deliveryRepo(realShaped[0]), now: NOW },
  );
  check("permit: an unapproved asset yields no permit", !unapproved.ok);

  const openAsset = published({ assetId: "OPEN" });
  const granted = await issueAssetPermit(
    { assetId: "OPEN", viewer: member([]) },
    { env: ENV, repository: deliveryRepo(openAsset), now: NOW },
  );
  check("permit: a Free asset yields a permit", granted.ok);
  check(
    "permit: the permit does not contain the Drive URL",
    granted.ok && !Buffer.from(granted.permit.split(".")[0], "base64").toString().includes("drive"),
  );

  const servingSource: VaultAssetSource = {
    async open() {
      return {
        ok: true,
        body: new Uint8Array([1, 2, 3]),
        contentType: "application/pdf",
        filename: "teaching.pdf",
      };
    },
  };

  const streamDeps = {
    env: ENV,
    repository: deliveryRepo(openAsset),
    store: freshStore(),
    source: servingSource,
    now: NOW,
  };

  const streamed = await streamAsset(
    { permit: granted.ok ? granted.permit : "", viewer: member([]) },
    streamDeps,
  );
  check("stream: a good permit serves the bytes", streamed.ok);

  const noPermit = await streamAsset({ permit: undefined, viewer: member([]) }, streamDeps);
  check("stream: no permit is refused", !noPermit.ok);

  const guidePermit = mintVaultToken(
    { purpose: "vault.asset.v1", subject: "her@example.com", expiresInSeconds: 120, binding: "OPEN" },
    ENV.GUIDE_LINK_SECRET,
    NOW,
  );
  const guidePermitResult = await streamAsset(
    { permit: guidePermit!.token, viewer: member([]) },
    streamDeps,
  );
  check(
    "stream: a permit signed with the guide secret is refused",
    !guidePermitResult.ok,
  );

  /* A permit minted for one session must not work in another browser. */
  const boundPermit = mintVaultToken(
    {
      purpose: "vault.asset.v1",
      subject: "her@example.com",
      expiresInSeconds: 120,
      binding: "OPEN",
      sessionId: "session-1",
    },
    ENV.VAULT_ASSET_SECRET,
    NOW,
  );
  const otherBrowser = await streamAsset(
    {
      permit: boundPermit!.token,
      viewer: { kind: "authenticated", subject: "her@example.com", sessionId: "session-2", grantedAreas: [] },
    },
    streamDeps,
  );
  check("stream: a permit copied into another session is refused", !otherBrowser.ok);

  const liftedPermit = await streamAsset({ permit: boundPermit!.token, viewer: anonymous }, streamDeps);
  check("stream: a permit lifted out and replayed with no session is refused", !liftedPermit.ok);

  const revokedStore = freshStore();
  await revokedStore.revoke({ subject: "her@example.com", sessionId: "session-1", atUnix: 0 });
  const afterRevoke = await streamAsset(
    { permit: boundPermit!.token, viewer: member([]) },
    { ...streamDeps, store: revokedStore },
  );
  check(
    "stream: a permit minted BEFORE the session was revoked stops working",
    !afterRevoke.ok && afterRevoke.reason === "permit_session_revoked",
  );

  /* Entitlement is decided again at stream time, so a grant withdrawn in
     the two minutes a permit lives does not still open the file. */
  const withdrawn = await streamAsset(
    { permit: boundPermit!.token, viewer: member([]) },
    {
      ...streamDeps,
      repository: deliveryRepo(published({ assetId: "OPEN", contentEntitlement: "Sri Shakti Shala" })),
    },
  );
  check("stream: entitlement is re-decided, not trusted from the permit", !withdrawn.ok);

  const expiredPermit = await streamAsset(
    { permit: boundPermit!.token, viewer: member([]) },
    { ...streamDeps, now: at("2026-10-15T12:30:00Z") },
  );
  check("stream: a permit expires in minutes", !expiredPermit.ok);

  const noSource = await streamAsset(
    { permit: granted.ok ? granted.permit : "", viewer: member([]) },
    { ...streamDeps, source: unconfiguredAssetSource },
  );
  check(
    "stream: the default source REFUSES rather than falling back to the Drive URL",
    !noSource.ok && noSource.reason.startsWith("source_"),
  );

  /* ───────────────────────── Logging ────────────────────────────────── */

  const described = describeViewer("Her.Name@Example.com", ENV.VAULT_SESSION_SECRET);
  check(
    "logging: the plaintext address never appears in what is logged",
    !JSON.stringify(described).includes("her.name"),
  );
  check(
    "logging: the fingerprint is stable for the same woman, however she typed it",
    fingerprintSubject("HER.NAME@example.com", ENV.VAULT_SESSION_SECRET) ===
      fingerprintSubject(" her.name@Example.com ", ENV.VAULT_SESSION_SECRET),
  );
  check(
    "logging: two women do not share a fingerprint",
    fingerprintSubject("a@example.com", ENV.VAULT_SESSION_SECRET) !==
      fingerprintSubject("b@example.com", ENV.VAULT_SESSION_SECRET),
  );
  check(
    "logging: without a secret it degrades to a placeholder, not to the address",
    fingerprintSubject("a@example.com", undefined) === "unfingerprinted",
  );

  /* ───────────────────────── Report ─────────────────────────────────── */

  const failures = results.filter((r) => !r.pass);
  for (const r of results) {
    console.log(`${r.pass ? "  PASS" : "  FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
  }
  console.log(`\n  ${results.length - failures.length}/${results.length} passed`);
  if (failures.length) {
    console.error("\n  VAULT AUTHORIZATION CHECKS FAILED\n");
    (globalThis as { process?: { exit: (code: number) => void } }).process?.exit(1);
  }
}

void main();

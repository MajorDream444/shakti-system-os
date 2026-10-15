import { strict as assert } from "node:assert";
import {
  VAULT_LIBRARY_CONTRACT_VERSION,
  parseVaultLibraryResponse,
} from "../contracts/vaultLibraryContract";
import { vaultLibraryReviewFixtures } from "../data/vaultLibraryReviewFixtures";
import { fetchAuthorizedLibrary } from "../services/AuthorizedLibraryClient";

const authorized = {
  contractVersion: VAULT_LIBRARY_CONTRACT_VERSION,
  status: "ready",
  collections: [
    {
      id: "free",
      title: "Free collection",
      description: "Approved public practices.",
      access: "free",
      items: [{
        id: "practice-1",
        title: "Approved practice",
        description: "Approved description.",
        durationLabel: "12 min",
        categoryLabel: "Practice",
        deliveryUrl: "/api/vault/delivery/practice-1",
      }],
    },
    {
      id: "membership",
      title: "Membership collection",
      description: "Available with membership.",
      access: "membership_locked",
      items: [],
    },
  ],
} as const;

assert(parseVaultLibraryResponse(authorized), "accepts a valid authorized response");
assert.equal(
  parseVaultLibraryResponse({ ...authorized, collections: [{ ...authorized.collections[1], items: authorized.collections[0].items }] }),
  null,
  "rejects restricted item metadata inside a locked collection",
);
assert.equal(parseVaultLibraryResponse({ ...authorized, contractVersion: "unknown" }), null);
assert.equal(parseVaultLibraryResponse({ ...authorized, status: "empty" }), null);

const failed = await fetchAuthorizedLibrary(async () => new Response(null, { status: 503 }));
assert.equal(failed.status, "unavailable", "fails closed when the server is unavailable");

const invalid = await fetchAuthorizedLibrary(async () => Response.json({ status: "ready", collections: [] }));
assert.equal(invalid.status, "unavailable", "fails closed on an invalid contract");

assert.equal(vaultLibraryReviewFixtures.length, 3);
assert(vaultLibraryReviewFixtures.every((asset) => asset.contentEntitlement === "Needs Review"));
assert(vaultLibraryReviewFixtures.every((asset) => asset.driveUrl === "" && asset.applicationSafeReference === ""));

console.log("Vault Library contract checks passed.");

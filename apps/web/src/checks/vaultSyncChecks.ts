import { internalLibraryAssetSeedFixtures } from "../data/libraryAssetSeedFixtures";
import {
  sampleVaultIntakeFiles,
  templeLibraryInventorySnapshot,
  uploadInboxPrototypeInventorySnapshot,
} from "../data/vaultIntakeSamples";
import { VaultSyncService } from "../services/VaultSyncService";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const result = VaultSyncService.buildDrafts({
  files: sampleVaultIntakeFiles,
});

assert(result.drafts.length === 3, "Expected three sample Vault intake drafts.");
assert(
  templeLibraryInventorySnapshot.every((item) => item.itemCount === 0),
  "Expected first Temple Library lanes to remain marked empty.",
);
assert(
  uploadInboxPrototypeInventorySnapshot.every(
    (item) =>
      item.accessLevel === "Internal" &&
      item.publishingStatus === "Needs Review" &&
      item.confidentiality === "Internal",
  ),
  "Expected upload inbox prototype records to remain Internal / Needs Review.",
);

for (const draft of result.drafts) {
  assert(
    draft.metadata.accessLevel === "Internal",
    "Expected VaultSyncService metadata access level to stay Internal.",
  );
  assert(
    draft.metadata.publishingStatus === "Needs Review",
    "Expected VaultSyncService metadata publishing status to stay Needs Review.",
  );
  assert(
    draft.metadata.confidentiality === "Internal",
    "Expected VaultSyncService metadata confidentiality to stay Internal.",
  );
  assert(
    draft.airtableRecord.tableName === "Library Assets",
    "Expected Airtable fixture records to target Library Assets.",
  );
  assert(
    draft.airtableRecord.fields["Access Level"] === "Internal",
    "Expected Airtable fixture Access Level to stay Internal.",
  );
  assert(
    draft.airtableRecord.fields["Publishing Status"] === "Needs Review",
    "Expected Airtable fixture Publishing Status to stay Needs Review.",
  );
  assert(
    draft.airtableRecord.fields.Confidentiality === "Internal",
    "Expected Airtable fixture Confidentiality to stay Internal.",
  );
}

assert(
  internalLibraryAssetSeedFixtures.length === result.drafts.length,
  "Expected seed fixture count to match generated VaultSyncService drafts.",
);

console.log("Vault sync checks passed.");

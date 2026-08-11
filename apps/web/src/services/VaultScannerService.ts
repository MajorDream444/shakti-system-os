import type { DriveFileReference } from "../types/integrations";
import type { VaultScanInput } from "../types/vault";

export const VaultScannerService = {
  fromDriveReferences(input: VaultScanInput): DriveFileReference[] {
    return input.files;
  },
};

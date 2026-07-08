import { env } from "../config/env";
import type {
  DriveFileReference,
  DriveIntegrationStatus,
} from "../types/integrations";

export const DriveService = {
  getStatus(): DriveIntegrationStatus {
    return {
      configured: env.googleDriveRoot.length > 0,
      root: env.googleDriveRoot,
    };
  },

  getRootFolder() {
    return env.googleDriveRoot;
  },

  createFileReference(file: DriveFileReference): DriveFileReference {
    return {
      ...file,
      sourceFolder: file.sourceFolder ?? env.googleDriveRoot,
    };
  },

  async listLibraryAssets(): Promise<DriveFileReference[]> {
    return [];
  },
};

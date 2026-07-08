import type {
  DriveFileReference,
  DriveIntegrationStatus,
} from "../types/integrations";

const driveRoot = import.meta.env.VITE_GOOGLE_DRIVE_ROOT ?? "";

export const DriveService = {
  getStatus(): DriveIntegrationStatus {
    return {
      configured: driveRoot.length > 0,
      root: driveRoot,
    };
  },

  getRootFolder() {
    return driveRoot;
  },

  createFileReference(file: DriveFileReference): DriveFileReference {
    return {
      ...file,
      sourceFolder: file.sourceFolder ?? driveRoot,
    };
  },

  async listLibraryAssets(): Promise<DriveFileReference[]> {
    return [];
  },
};

import type {
  DriveFileReference,
  DriveInventoryRecord,
} from "../types/integrations";

const uploadInboxPath = "Shakti Legacy Vault / 10_UPLOAD_HERE_FIRST";
const templeLibraryPath = "Shakti Legacy Vault / 04_TEMPLE_LIBRARY";

export const templeLibraryInventorySnapshot: DriveInventoryRecord[] = [
  {
    id: "1OdcCvD5dBGeoUyd7F7DZqPsXaruIbHT_",
    name: "00_FOUNDATIONS",
    kind: "folder",
    sourcePath: `${templeLibraryPath} / 00_FOUNDATIONS`,
    parentFolderId: "1SJB7CsNiq7LQSEsFyZhM5ItmRGGuopnW",
    itemCount: 0,
    accessLevel: "Internal",
    publishingStatus: "Needs Review",
    confidentiality: "Internal",
    notes: "Priority lane confirmed empty in the 2026-07-08 Drive inventory snapshot.",
  },
  {
    id: "11eaklSlaLOlMDK7-3QEkRWZuOpoB14Yf",
    name: "01_PRACTICES",
    kind: "folder",
    sourcePath: `${templeLibraryPath} / 01_PRACTICES`,
    parentFolderId: "1SJB7CsNiq7LQSEsFyZhM5ItmRGGuopnW",
    itemCount: 0,
    accessLevel: "Internal",
    publishingStatus: "Needs Review",
    confidentiality: "Internal",
    notes: "Priority lane confirmed empty in the 2026-07-08 Drive inventory snapshot.",
  },
];

export const uploadInboxPrototypeInventorySnapshot: DriveInventoryRecord[] = [
  {
    id: "1NIKzJTmliEZ0o9EqWv6MPHmJwVnjYbri",
    name: "shakti-shala.zip",
    kind: "file",
    sourcePath: `${uploadInboxPath} / shakti-shala.zip`,
    parentFolderId: "1eOgB0S-Z6qcvNcXWANarQyZl65QDJhR2",
    driveUrl:
      "https://drive.google.com/file/d/1NIKzJTmliEZ0o9EqWv6MPHmJwVnjYbri/view",
    fileType: "zip",
    mediaType: "Other",
    accessLevel: "Internal",
    publishingStatus: "Needs Review",
    confidentiality: "Internal",
    notes: "Internal prototype archive. Do not classify as public teaching content.",
  },
  {
    id: "1tZRFP5pHsIz_XiQB37Dzy05tIlTZocZB",
    name: "Shakti V2 Walkthrough-7/8/2026, 11:47 AM.mp4",
    kind: "file",
    sourcePath: `${uploadInboxPath} / Shakti V2 Walkthrough-7/8/2026, 11:47 AM.mp4`,
    parentFolderId: "1eOgB0S-Z6qcvNcXWANarQyZl65QDJhR2",
    driveUrl:
      "https://drive.google.com/file/d/1tZRFP5pHsIz_XiQB37Dzy05tIlTZocZB/view",
    fileType: "mp4",
    mediaType: "Video",
    accessLevel: "Internal",
    publishingStatus: "Needs Review",
    confidentiality: "Internal",
    notes: "Internal product walkthrough. Requires review before any routing.",
  },
  {
    id: "1ApRoYe57gyeMZaGRdaHOAQJxINTEclL3",
    name: "shakti_vault_design_archive_full.zip",
    kind: "file",
    sourcePath: `${uploadInboxPath} / shakti_vault_design_archive_full.zip`,
    parentFolderId: "1eOgB0S-Z6qcvNcXWANarQyZl65QDJhR2",
    driveUrl:
      "https://drive.google.com/file/d/1ApRoYe57gyeMZaGRdaHOAQJxINTEclL3/view",
    fileType: "zip",
    mediaType: "Other",
    accessLevel: "Internal",
    publishingStatus: "Needs Review",
    confidentiality: "Internal",
    notes: "Internal design archive. Do not classify as public teaching content.",
  },
];

export const sampleVaultIntakeFiles: DriveFileReference[] =
  uploadInboxPrototypeInventorySnapshot.map((item) => ({
    id: item.id,
    name: item.name,
    url: item.driveUrl,
    sourceFolder: item.sourcePath,
    mediaType: item.mediaType,
    accessLevel: item.accessLevel,
    publishingStatus: item.publishingStatus,
    confidentiality: item.confidentiality,
    description: "Internal system/prototype asset for intake pipeline testing.",
    notes: item.notes,
  }));

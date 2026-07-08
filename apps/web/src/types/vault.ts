import type { AirtableRecordDraft, DriveFileReference } from "./integrations";

export type VaultMediaType =
  | "PDF"
  | "Audio"
  | "Video"
  | "Image"
  | "Document"
  | "Slide Deck"
  | "Transcript"
  | "Worksheet"
  | "Journal Prompt"
  | "Ceremony Guide"
  | "Retreat Guide"
  | "Other";

export type VaultPublishingStatus =
  | "Raw"
  | "Needs Review"
  | "Needs Transcript"
  | "Needs Summary"
  | "Ready To Tag"
  | "Approved"
  | "Published"
  | "Archived";

export type VaultAccessLevel =
  | "Visitor"
  | "Seeker"
  | "Practitioner"
  | "Initiate"
  | "Temple Circle"
  | "Guide"
  | "Teacher";

export type VaultAssetClassification = {
  mediaType: VaultMediaType;
  fileType: string;
  publishingStatus: VaultPublishingStatus;
  accessLevel: VaultAccessLevel;
  sourceFolder?: string;
};

export type VaultMetadataDraft = {
  title: string;
  description: string;
  driveUrl: string;
  sourceFolder: string;
  mediaType: VaultMediaType;
  fileType: string;
  theme: string[];
  keywords: string[];
  goddessArchetype: string;
  moonPhase: string;
  practiceType: string;
  accessLevel: VaultAccessLevel;
  readinessLevel: string;
  publishingStatus: VaultPublishingStatus;
  confidentiality: string;
  notes: string;
};

export type VaultScanInput = {
  files: DriveFileReference[];
};

export type VaultSyncDraft = {
  source: DriveFileReference;
  classification: VaultAssetClassification;
  metadata: VaultMetadataDraft;
  airtableRecord: AirtableRecordDraft;
  relationships: VaultRelationshipDraft[];
};

export type VaultSyncResult = {
  drafts: VaultSyncDraft[];
};

export type VaultRelationshipDraft = {
  from: string;
  to: string;
  type: "RELATED_TO" | "BELONGS_TO" | "PREPARES_FOR" | "EXPRESSES";
};

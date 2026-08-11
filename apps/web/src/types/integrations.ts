import type {
  VaultAccessLevel,
  VaultMediaType,
  VaultPublishingStatus,
} from "./vault";

export type AirtableTableConfig = {
  readonly name: string;
  readonly purpose: string;
  readonly fields: readonly string[];
  readonly options?: Readonly<Record<string, readonly string[]>>;
};

export type AirtableRecordDraft = {
  tableName: string;
  fields: Record<string, string | number | boolean | null | string[]>;
};

export type DriveFileReference = {
  id?: string;
  name: string;
  url?: string;
  sourceFolder?: string;
  mimeType?: string;
  createdTime?: string;
  modifiedTime?: string;
  mediaType?: VaultMediaType;
  accessLevel?: VaultAccessLevel;
  publishingStatus?: VaultPublishingStatus;
  confidentiality?: string;
  description?: string;
  notes?: string;
};

export type DriveInventoryRecordKind = "folder" | "file";

export type DriveInventoryRecord = {
  id: string;
  name: string;
  kind: DriveInventoryRecordKind;
  sourcePath: string;
  parentFolderId?: string;
  driveUrl?: string;
  mimeType?: string;
  fileType?: string;
  mediaType?: VaultMediaType;
  itemCount?: number;
  createdTime?: string;
  modifiedTime?: string;
  accessLevel: VaultAccessLevel;
  publishingStatus: VaultPublishingStatus;
  confidentiality: string;
  notes: string;
};

export type DriveIntegrationStatus = {
  configured: boolean;
  root: string;
};

export type AirtableIntegrationStatus = {
  configured: boolean;
  base: string;
};

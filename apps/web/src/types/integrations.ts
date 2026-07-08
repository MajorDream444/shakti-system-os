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
  mediaType?: string;
};

export type DriveIntegrationStatus = {
  configured: boolean;
  root: string;
};

export type AirtableIntegrationStatus = {
  configured: boolean;
  base: string;
};

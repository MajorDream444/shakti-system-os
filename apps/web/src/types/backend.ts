export type AirtableSelectValue = {
  id?: string;
  name: string;
  color?: string;
};

export type AirtableCellValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | AirtableSelectValue
  | AirtableSelectValue[];

export type AirtableApiRecord = {
  id: string;
  createdTime?: string;
  fields?: Record<string, AirtableCellValue>;
};

export type AirtableApiListResponse = {
  records: AirtableApiRecord[];
};

export type ReadOnlyBackendState = {
  source: "airtable" | "mock";
  reason?: string;
};

export type BackendErrorCode =
  | "backend_unavailable"
  | "invalid_schema"
  | "missing_env"
  | "missing_field"
  | "network_timeout"
  | "request_failed";

export type BackendErrorLog = {
  code: BackendErrorCode;
  message: string;
  context?: Record<string, string | number | boolean | undefined>;
};

export type CacheStatus = "hit" | "miss";

export type CachedRead<T> = {
  value: T;
  status: CacheStatus;
};

export type LibraryAssetRecord = {
  id: string;
  assetId: string;
  title: string;
  description: string;
  driveUrl: string;
  sourceFolder: string;
  mediaType: string;
  fileType: string;
  theme: string[];
  keywords: string;
  goddessArchetype: string;
  moonPhase: string;
  practiceType: string;
  accessLevel: string;
  publishingStatus: string;
  knowledgeMaturity: string;
  confidentiality: string;
  notes: string;
};

export type PracticeRecord = {
  id: string;
  practiceId: string;
  title: string;
  shortDescription: string;
  duration: string;
  practiceType: string;
  associatedGoddess: string;
  associatedMoonPhase: string;
  accessLevel: string;
  audioUrl: string;
  videoUrl: string;
  worksheetUrl: string;
  status: string;
  notes: string;
};

export type InitiationKeyRecord = {
  id: string;
  keyId: string;
  keyName: string;
  accessLevelGranted: string;
  offeringAmount: number;
  paymentType: string;
  physicalObjectIncluded: boolean;
  description: string;
  eligibilityNotes: string;
  stripeProductId: string;
  stripePriceId: string;
  active: boolean;
  notes: string;
};

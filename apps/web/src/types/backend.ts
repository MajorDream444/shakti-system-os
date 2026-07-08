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

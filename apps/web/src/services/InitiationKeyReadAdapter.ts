import {
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../constants/liveAirtable";
import { mockInitiationKeys } from "../data/mockBackend";
import { AirtableReadOnlyClient } from "./AirtableReadOnlyClient";
import type {
  AirtableApiRecord,
  AirtableCellValue,
  InitiationKeyRecord,
} from "../types/backend";

const fields = LIVE_AIRTABLE_FIELDS.initiationKeys;
const keyFieldIds = Object.values(fields);

function selectName(value: AirtableCellValue | undefined) {
  if (!value) {
    return "";
  }

  if (typeof value === "object" && !Array.isArray(value) && "name" in value) {
    return value.name;
  }

  return String(value);
}

function textValue(value: AirtableCellValue | undefined) {
  return typeof value === "string" ? value : selectName(value);
}

function numberValue(value: AirtableCellValue | undefined) {
  return typeof value === "number" ? value : 0;
}

function booleanValue(value: AirtableCellValue | undefined) {
  return typeof value === "boolean" ? value : false;
}

function mapInitiationKey(record: AirtableApiRecord): InitiationKeyRecord {
  const values = record.fields ?? {};

  return {
    id: record.id,
    keyId: textValue(values[fields.keyId]),
    keyName: selectName(values[fields.keyName]),
    accessLevelGranted: selectName(values[fields.accessLevelGranted]),
    offeringAmount: numberValue(values[fields.offeringAmount]),
    paymentType: selectName(values[fields.paymentType]),
    physicalObjectIncluded: booleanValue(values[fields.physicalObjectIncluded]),
    description: textValue(values[fields.description]),
    eligibilityNotes: textValue(values[fields.eligibilityNotes]),
    stripeProductId: textValue(values[fields.stripeProductId]),
    stripePriceId: textValue(values[fields.stripePriceId]),
    active: booleanValue(values[fields.active]),
    notes: textValue(values[fields.notes]),
  };
}

export const InitiationKeyReadAdapter = {
  async listInitiationKeys(): Promise<InitiationKeyRecord[]> {
    const records = await AirtableReadOnlyClient.listRecords(
      LIVE_AIRTABLE_TABLE_IDS.initiationKeys,
      keyFieldIds,
    );

    return records ? records.map(mapInitiationKey) : mockInitiationKeys;
  },
};

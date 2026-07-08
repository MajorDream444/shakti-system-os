import {
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../constants/liveAirtable";
import { mockPractices } from "../data/mockBackend";
import { AirtableReadOnlyClient } from "./AirtableReadOnlyClient";
import { selectName, textValue } from "./AirtableValueService";
import type { AirtableApiRecord, PracticeRecord } from "../types/backend";

const fields = LIVE_AIRTABLE_FIELDS.practices;
const practiceFieldIds = Object.values(fields);

function mapPractice(record: AirtableApiRecord): PracticeRecord {
  const values = record.fields ?? {};

  return {
    id: record.id,
    practiceId: textValue(values[fields.practiceId]),
    title: textValue(values[fields.title]),
    shortDescription: textValue(values[fields.shortDescription]),
    duration: textValue(values[fields.duration]),
    practiceType: selectName(values[fields.practiceType]),
    associatedGoddess: textValue(values[fields.associatedGoddess]),
    associatedMoonPhase: textValue(values[fields.associatedMoonPhase]),
    accessLevel: selectName(values[fields.accessLevel]),
    audioUrl: textValue(values[fields.audioUrl]),
    videoUrl: textValue(values[fields.videoUrl]),
    worksheetUrl: textValue(values[fields.worksheetUrl]),
    status: selectName(values[fields.status]),
    notes: textValue(values[fields.notes]),
  };
}

export const PracticeReadAdapter = {
  async listPractices(): Promise<PracticeRecord[]> {
    const records = await AirtableReadOnlyClient.listRecords(
      LIVE_AIRTABLE_TABLE_IDS.practices,
      practiceFieldIds,
    );

    return records ? records.map(mapPractice) : mockPractices;
  },
};

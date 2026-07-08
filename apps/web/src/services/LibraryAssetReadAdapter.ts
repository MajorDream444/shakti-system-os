import {
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../constants/liveAirtable";
import { mockLibraryAssets } from "../data/mockBackend";
import { AirtableReadOnlyClient } from "./AirtableReadOnlyClient";
import { ContentApprovalService } from "./ContentApprovalService";
import {
  multiSelectNames,
  selectName,
  textValue,
} from "./AirtableValueService";
import type {
  AirtableApiRecord,
  LibraryAssetRecord,
} from "../types/backend";

const fields = LIVE_AIRTABLE_FIELDS.libraryAssets;
const libraryAssetFieldIds = Object.values(fields);

function mapLibraryAsset(record: AirtableApiRecord): LibraryAssetRecord {
  const values = record.fields ?? {};

  return {
    id: record.id,
    assetId: textValue(values[fields.assetId]),
    title: textValue(values[fields.title]),
    description: textValue(values[fields.description]),
    driveUrl: textValue(values[fields.driveUrl]),
    sourceFolder: textValue(values[fields.sourceFolder]),
    mediaType: selectName(values[fields.mediaType]),
    fileType: textValue(values[fields.fileType]),
    theme: multiSelectNames(values[fields.theme]),
    keywords: textValue(values[fields.keywords]),
    goddessArchetype: textValue(values[fields.goddessArchetype]),
    moonPhase: textValue(values[fields.moonPhase]),
    practiceType: selectName(values[fields.practiceType]),
    accessLevel: selectName(values[fields.accessLevel]),
    publishingStatus: selectName(values[fields.publishingStatus]),
    confidentiality: selectName(values[fields.confidentiality]),
    notes: textValue(values[fields.notes]),
  };
}

export const LibraryAssetReadAdapter = {
  async listLibraryAssets(): Promise<LibraryAssetRecord[]> {
    const records = await AirtableReadOnlyClient.listRecords(
      LIVE_AIRTABLE_TABLE_IDS.libraryAssets,
      libraryAssetFieldIds,
    );

    const mappedRecords = records ? records.map(mapLibraryAsset) : mockLibraryAssets;
    return ContentApprovalService.filterLibraryAssets(mappedRecords);
  },
};

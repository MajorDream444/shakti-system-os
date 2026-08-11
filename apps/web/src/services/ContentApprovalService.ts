import type { LibraryAssetRecord, PracticeRecord } from "../types/backend";

const APPROVED_PUBLISHING_STATUSES = new Set(["Approved", "Published"]);

export const ContentApprovalService = {
  filterLibraryAssets(records: LibraryAssetRecord[]): LibraryAssetRecord[] {
    return records.filter((record) =>
      APPROVED_PUBLISHING_STATUSES.has(record.publishingStatus),
    );
  },

  filterPractices(records: PracticeRecord[]): PracticeRecord[] {
    return records.filter((record) =>
      APPROVED_PUBLISHING_STATUSES.has(record.status),
    );
  },
};

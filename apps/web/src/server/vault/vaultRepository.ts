/* Read-only Airtable access for the Vault.

   SEPARATE FROM AirtableWriteRepository ON PURPOSE. That class exists to
   create Seekers, Intake Responses and Progress. This one creates nothing:
   there is no write method on it, so no future edit to a request handler can
   accidentally mint an Access Grant. The October 15 brief is explicit that
   grants may not be created without an approved rule, and the cheapest way to
   honour that is to give this layer no way to do it.

   Field and table ids come from constants/liveAirtable.ts so that a renamed
   column in Airtable does not silently change what is served. */

import {
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../../constants/liveAirtable.js";
import type { VaultAsset } from "./vaultEntitlement.js";

const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";

/* Library Assets → Content Entitlement. Decoded from the base on 15 October
   2026 and recorded here rather than in liveAirtable.ts because that file is
   also read by the browser bundle, and nothing about entitlement should be
   shipped to a browser. */
export const CONTENT_ENTITLEMENT_FIELD_ID = "fldIkqPSce1LxA3bY";

export type VaultRepositoryConfig = { baseId: string; token: string };

export type VaultReadRepository = {
  /* Every catalogued asset. The caller filters; this returns the raw rows so
     the authorization decision is made in one place rather than smeared
     across a query string. */
  listAssets: () => Promise<VaultAsset[]>;
  getAsset: (assetId: string) => Promise<VaultAsset | null>;
  /* Access Grant areas held by this address. Returns [] when she has none,
     which is the expected answer for everyone today. */
  listGrantedAreas: (email: string) => Promise<string[]>;
  /* Whether this address is known to Sheetal at all — a Seeker record. Used
     only to decide whether a sign-in link is worth sending, never to grant
     anything. */
  isKnownSeeker: (email: string) => Promise<boolean>;
};

function escapeFormulaValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

type AirtableRecord = { id: string; fields: Record<string, unknown> };
type AirtableListResponse = { records: AirtableRecord[]; offset?: string };

const text = (value: unknown): string | null => {
  if (typeof value === "string") return value.trim() || null;
  /* A single select arrives as a string; a multiple select as an array. Take
     the first, because every field this reads is single-valued in the base
     and an array here means someone changed the field type. */
  if (Array.isArray(value) && typeof value[0] === "string") return value[0].trim() || null;
  return null;
};

export class AirtableVaultRepository implements VaultReadRepository {
  private readonly config: VaultRepositoryConfig;
  private readonly fetchImpl: typeof fetch;

  constructor(config: VaultRepositoryConfig, fetchImpl: typeof fetch = fetch) {
    this.config = config;
    this.fetchImpl = fetchImpl;
  }

  private async list(
    tableId: string,
    query: Record<string, string> = {},
  ): Promise<AirtableRecord[]> {
    const records: AirtableRecord[] = [];
    let offset: string | undefined;

    do {
      const url = new URL(`${AIRTABLE_API_ROOT}/${this.config.baseId}/${tableId}`);
      Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
      if (offset) url.searchParams.set("offset", offset);

      const response = await this.fetchImpl(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${this.config.token}` },
      });

      /* The status is included; the body is not. An Airtable error body can
         echo a formula, and a formula here contains a woman's email. */
      if (!response.ok) throw new Error(`Airtable read failed: ${response.status}`);

      const payload = (await response.json()) as AirtableListResponse;
      records.push(...payload.records);
      offset = payload.offset;
    } while (offset);

    return records;
  }

  private toAsset(record: AirtableRecord): VaultAsset {
    const f = LIVE_AIRTABLE_FIELDS.libraryAssets;
    return {
      assetId: text(record.fields[f.assetId]) ?? record.id,
      title: text(record.fields[f.title]) ?? "Untitled",
      publishingStatus: text(record.fields[f.publishingStatus]),
      confidentiality: text(record.fields[f.confidentiality]),
      /* Content Entitlement is not yet in the shared field map; it is read by
         id so this layer does not depend on the column's display name. */
      contentEntitlement: text(record.fields[CONTENT_ENTITLEMENT_FIELD_ID]),
      sourceUrl: text(record.fields[f.driveUrl]),
    };
  }

  async listAssets(): Promise<VaultAsset[]> {
    const records = await this.list(LIVE_AIRTABLE_TABLE_IDS.libraryAssets, {
      returnFieldsByFieldId: "true",
    });
    return records.map((record) => this.toAsset(record));
  }

  async getAsset(assetId: string): Promise<VaultAsset | null> {
    const records = await this.list(LIVE_AIRTABLE_TABLE_IDS.libraryAssets, {
      returnFieldsByFieldId: "true",
      filterByFormula: `{Asset ID} = "${escapeFormulaValue(assetId)}"`,
      maxRecords: "1",
    });
    return records[0] ? this.toAsset(records[0]) : null;
  }

  async listGrantedAreas(email: string): Promise<string[]> {
    const seekerRecords = await this.list(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      filterByFormula: `LOWER({Email}) = "${escapeFormulaValue(email.trim().toLowerCase())}"`,
      maxRecords: "1",
      returnFieldsByFieldId: "true",
    });
    const seeker = seekerRecords[0];
    if (!seeker) return [];

    const grants = await this.list(LIVE_AIRTABLE_TABLE_IDS.accessGrants, {
      returnFieldsByFieldId: "true",
    });

    const g = LIVE_AIRTABLE_FIELDS.accessGrants;
    const nowIso = new Date().toISOString();

    return grants
      .filter((record) => {
        const linked = record.fields[g.seeker];
        if (!Array.isArray(linked) || !linked.includes(seeker.id)) return false;

        /* Only a grant that is plainly active counts. Anything in review,
           paused or withdrawn is treated as absent. */
        const state = text(record.fields[g.internalAccessState]);
        if (!state || state.trim().toLowerCase() !== "active") return false;

        /* An expiry in the past is not a grant. A blank expiry is open-ended
           and allowed; that is a founder decision recorded in the row. */
        const expiresAt = text(record.fields[g.expiresAt]);
        if (expiresAt && expiresAt < nowIso) return false;

        return true;
      })
      .map((record) => text(record.fields[g.accessArea]))
      .filter((area): area is string => Boolean(area));
  }

  async isKnownSeeker(email: string): Promise<boolean> {
    const records = await this.list(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      filterByFormula: `LOWER({Email}) = "${escapeFormulaValue(email.trim().toLowerCase())}"`,
      maxRecords: "1",
    });
    return records.length > 0;
  }
}

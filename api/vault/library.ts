import {
  VAULT_LIBRARY_CONTRACT_VERSION,
  type VaultLibraryResponse,
} from "../../apps/web/src/contracts/vaultLibraryContract.js";

type ApiRequest = { method?: string };
type ApiResponse = {
  status: (code: number) => { json: (payload: VaultLibraryResponse | { message: string }) => void };
  setHeader?: (name: string, value: string) => void;
};

const unavailable: VaultLibraryResponse = {
  contractVersion: VAULT_LIBRARY_CONTRACT_VERSION,
  status: "unavailable",
  collections: [],
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader?.("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed." });
  }

  res.setHeader?.("Cache-Control", "private, no-store");
  return res.status(503).json(unavailable);
}

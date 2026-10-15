/* Vault configuration, read from the server environment and nowhere else.

   Every value here is a deliberate trade between a woman having to ask for
   another link and a stolen link staying useful. The lifetimes are short
   because the store that backs revocation is in process memory today (see
   vaultStore.ts); when a durable store lands, the session lifetime is the
   first number that may reasonably grow. */

export type VaultEnv = Record<string, string | undefined>;

export type VaultConfig = {
  /* Signs the emailed sign-in link. */
  magicSecret: string | undefined;
  /* Signs the session cookie. MUST differ from magicSecret. */
  sessionSecret: string | undefined;
  /* Signs a one-asset streaming permit. */
  assetSecret: string | undefined;
  magicTtlSeconds: number;
  sessionTtlSeconds: number;
  assetTtlSeconds: number;
  /* Per address, then per source address, inside the window. */
  requestsPerEmail: number;
  requestsPerSource: number;
  rateWindowSeconds: number;
  publicSiteUrl: string;
  cookieName: string;
};

export const VAULT_COOKIE_NAME = "sss_vault";

/* Fifteen minutes. Long enough to walk to a laptop, short enough that a link
   sitting in a shared inbox is usually already dead. */
const DEFAULT_MAGIC_TTL = 15 * 60;
/* Twelve hours. She signs in for a sitting, not for a season. */
const DEFAULT_SESSION_TTL = 12 * 60 * 60;
/* Two minutes. A permit exists only to carry one click from the listing to
   the stream; nothing legitimate needs it longer. */
const DEFAULT_ASSET_TTL = 120;

export function getVaultConfig(env: VaultEnv): VaultConfig {
  const num = (raw: string | undefined, fallback: number) => {
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : fallback;
  };

  return {
    magicSecret: env.VAULT_MAGIC_SECRET,
    sessionSecret: env.VAULT_SESSION_SECRET,
    assetSecret: env.VAULT_ASSET_SECRET,
    magicTtlSeconds: num(env.VAULT_MAGIC_TTL_SECONDS, DEFAULT_MAGIC_TTL),
    sessionTtlSeconds: num(env.VAULT_SESSION_TTL_SECONDS, DEFAULT_SESSION_TTL),
    assetTtlSeconds: num(env.VAULT_ASSET_TTL_SECONDS, DEFAULT_ASSET_TTL),
    requestsPerEmail: num(env.VAULT_REQUESTS_PER_EMAIL, 5),
    requestsPerSource: num(env.VAULT_REQUESTS_PER_SOURCE, 20),
    rateWindowSeconds: num(env.VAULT_RATE_WINDOW_SECONDS, 15 * 60),
    publicSiteUrl: env.PUBLIC_SITE_URL || "https://www.srishaktishala.com",
    cookieName: VAULT_COOKIE_NAME,
  };
}

export type VaultReadiness =
  | { ready: true }
  | { ready: false; reason: string };

/* Whether the Vault may serve anything at all.

   Three separate secrets are required, and they must differ from each other
   and from GUIDE_LINK_SECRET. Sharing one would collapse the purpose
   separation that vaultTokens.ts depends on — the domain prefix would still
   make the signatures differ, but a single leaked value would then be enough
   to mint a session, and a session is the keys to everything. */
export function getVaultReadiness(env: VaultEnv): VaultReadiness {
  const config = getVaultConfig(env);
  const required: Array<[string, string | undefined]> = [
    ["VAULT_MAGIC_SECRET", config.magicSecret],
    ["VAULT_SESSION_SECRET", config.sessionSecret],
    ["VAULT_ASSET_SECRET", config.assetSecret],
  ];

  const missing = required.filter(([, value]) => !value).map(([name]) => name);
  if (missing.length) return { ready: false, reason: `Missing: ${missing.join(", ")}` };

  const values = required.map(([, value]) => value as string).concat(env.GUIDE_LINK_SECRET ?? []);
  if (new Set(values).size !== values.length) {
    return { ready: false, reason: "Vault secrets must all differ from each other and from GUIDE_LINK_SECRET" };
  }

  return { ready: true };
}

const viteEnv = import.meta.env ?? {};

export const env = {
  airtableBase: viteEnv.VITE_AIRTABLE_BASE ?? "",
  airtableToken: viteEnv.VITE_AIRTABLE_TOKEN ?? "",
  stripePublicKey: viteEnv.VITE_STRIPE_PUBLIC_KEY ?? "",
  googleDriveRoot: viteEnv.VITE_GOOGLE_DRIVE_ROOT ?? "",
  sheetEndpoint: viteEnv.VITE_SHEET_ENDPOINT ?? "",
  appEnv: viteEnv.VITE_APP_ENV ?? "development",
} as const;

export type AppEnv = typeof env;

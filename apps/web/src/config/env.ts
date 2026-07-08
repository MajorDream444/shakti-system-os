export const env = {
  airtableBase: import.meta.env.VITE_AIRTABLE_BASE ?? "",
  airtableToken: import.meta.env.VITE_AIRTABLE_TOKEN ?? "",
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? "",
  googleDriveRoot: import.meta.env.VITE_GOOGLE_DRIVE_ROOT ?? "",
  appEnv: import.meta.env.VITE_APP_ENV ?? "development",
} as const;

export type AppEnv = typeof env;

const viteEnv = import.meta.env ?? {};

export const env = {
  stripePublicKey: viteEnv.VITE_STRIPE_PUBLIC_KEY ?? "",
  googleDriveRoot: viteEnv.VITE_GOOGLE_DRIVE_ROOT ?? "",
  sheetEndpoint: viteEnv.VITE_SHEET_ENDPOINT ?? "",
  appEnv: viteEnv.VITE_APP_ENV ?? "development",
  analyticsEnabled: viteEnv.VITE_VERCEL_ANALYTICS_ENABLED === "true",
} as const;

export type AppEnv = typeof env;

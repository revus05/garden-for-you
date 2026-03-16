import Medusa from "@medusajs/js-sdk";

function requiredEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

const MEDUSA_URL = requiredEnv(
  "NEXT_PUBLIC_MEDUSA_URL",
  process.env.NEXT_PUBLIC_MEDUSA_URL,
);
const MEDUSA_PUBLISHABLE_KEY = requiredEnv(
  "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
);

export function createSdk({ token }: { token?: string } = {}) {
  const client = new Medusa({
    baseUrl: MEDUSA_URL,
    publishableKey: MEDUSA_PUBLISHABLE_KEY,
    debug: process.env.NODE_ENV === "development",
  });

  if (token) client.client.setToken(token);

  return client;
}

// Backward-compatible default instance (avoid mutating token on this in SSR).
export const sdk = createSdk();

import type { auth } from "@repo/auth";
import {
  adminClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/env";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: `${clientEnv.VITE_ROOT_DOMAIN}`,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient(),
    organizationClient(),
  ],
});

export type Session = typeof authClient.$Infer.Session;

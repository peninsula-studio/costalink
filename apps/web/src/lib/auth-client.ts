import type { auth } from "@repo/auth";
import { clientEnv } from "@repo/env/client";
import {
  adminClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: process.env.SERVER_URL, // Base URL of your Better Auth backend.
  // baseURL: serverEnv(process.env).SERVER_URL, // Base URL of your Better Auth backend.
  baseURL: clientEnv.VITE_API_URL, // Base URL of your Better Auth backend.
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient(),
    organizationClient(),
  ],
});

export type Session = typeof authClient.$Infer.Session;

import { expoClient } from "@better-auth/expo/client";
import type { auth } from "@repo/auth";
import {
  adminClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8787", // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: "myapp",
      storagePrefix: "myapp",
      storage: SecureStore,
    }),
    inferAdditionalFields<typeof auth>(),
    adminClient(),
    organizationClient(),
  ],
});

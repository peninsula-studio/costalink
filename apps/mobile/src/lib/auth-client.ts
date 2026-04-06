import { expoClient } from "@better-auth/expo/client";
import type { auth } from "@repo/auth";
import {
  adminClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const authClient = createAuthClient({
  baseURL:
  Platform.select({
    android: "http://10.0.2.2:8787",
    ios: "http://localhost:8787",
    default: "http://localhost:8787",
  }),
  // (process.env.EXPO_PUBLIC_SERVER_URL as string), // Base URL of your Better Auth backend.
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

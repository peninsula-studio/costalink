import { hcWithType } from "@repo/api/hc";
import { Platform } from "react-native";

export const honoClient = hcWithType(
  Platform.select({
    android: "http://10.0.2.2:8787",
    ios: "http://localhost:8787",
    default: "http://localhost:8787",
  }),
  // (process.env.EXPO_PUBLIC_SERVER_URL as string), // Base URL of your Better Auth backend.
  {
    init: { credentials: "include" },
  },
);

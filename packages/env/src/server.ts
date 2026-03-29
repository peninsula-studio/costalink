import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Validate server environment
export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .refine(
        (str) => !str.includes("YOUR_POSTGRESQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    SERVER_URL: z.url().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  runtimeEnv: process.env,
});

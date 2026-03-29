import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Validate server environment
export const clientEnv = createEnv({
  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_ROOT_DOMAIN: z.string().min(1).optional(),
  },
  clientPrefix: "VITE_",
  runtimeEnv: (import.meta as any).env,
  emptyStringAsUndefined: true,
});

// // Validate client environment
// export const clientEnv = clientEnvSchema.parse(import.meta.env);

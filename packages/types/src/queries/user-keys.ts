import type { z } from "zod";
import type { organizationSelectSchema } from "@/schemas/organization";
import type { userSelectSchema } from "@/schemas/user";

export const userKeys = {
  all: () => ["user"] as const,
  session: () => [...userKeys.all(), "session"] as const,
  list: () => [...userKeys.all(), "list"] as const,
  // signUp: () => ["signUp"] as const,
};

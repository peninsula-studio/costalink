import * as z from "zod";

export const organizationSlug = z
  .string()
  .slugify()
  .min(4, { error: "Mínimo 4 caracteres" });

export const organizationPlan = z
  .enum(["free", "pro", "enterprise"])
  .default("free");

import * as z from "zod";

export const organizationSlugSchema = z
  .string()
  .slugify()
  .min(4, { error: "Mínimo 4 caracteres" });

export const organizationPlanSchema = z
  .enum(["free", "pro", "enterprise"])
  .default("free");

export const organizationSelectSchema = z
  .object({
    organizationId: z.string().optional(),
    organizationSlug: z.string().optional(),
  })
  .partial()
  .refine((o) => Object.values(o).length > 0, {
    message: "❌ You must provide either organizationId or organizationSlug!",
  });

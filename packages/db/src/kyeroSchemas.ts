import { i18nStringSchema } from "@repo/i18n/schemas";
import { z } from "zod";

// --- Helper Schemas (Dependencies) ---

export const kyeroImageDbType = z.object({
  id: z.string(),
  url: z.url(), // Enforces valid URL format
});

export const kyeroSurfaceAreaDbType = z.object({
  built: z.number().optional(),
  plot: z.number().optional(),
});

export const kyeroEnergyRatingDbType = z.object({
  consumption: z.string().optional(),
  emissions: z.string().optional(),
});

// --- Main KyeroProperty Schema ---

export const kyeroPropertyDbType = z.object({
  // -- Mandatory Fields --
  // id: z.string(),
  date: z.string(), // You could refine this with .regex() if you want to strictly validate "YYYY-MM-DD HH:MM:SS"
  ref: z.string(),
  price: z.number(),
  type: z.string(),
  town: z.string(),
  province: z.string(),

  organization_id: z.string(),

  // -- Optional / Conditional Fields --
  currency: z.string().default("eur"), // Defaults to EUR in logic, but optional here
  price_freq: z.string().default("sale"),
  part_ownership: z.boolean().optional(),
  leasehold: z.boolean().optional(),
  new_build: z.boolean().optional(),

  location_detail: z.string().optional(),
  beds: z.number(),
  baths: z.number(),
  pool: z.boolean(),

  surface_area: kyeroSurfaceAreaDbType.optional(),
  energy_rating: kyeroEnergyRatingDbType.optional(),

  url: z.url().optional(),

  // Description and Features
  desc: i18nStringSchema,
  features: i18nStringSchema.optional(),

  images: z.array(kyeroImageDbType),

  notes: z.string().optional(),

  // -- V3.5+ Additions --
  video_url: z.url().optional(),
  virtual_tour_url: z.url().optional(),
  catastral: z.string().optional(),

  // -- V3.7+ Additions --
  email: z.email().optional(), // added .email() validator for safety

  // -- V3.8+ Additions --
  prime: z.boolean().optional(),

  // -- V3.9+ Additions --
  contact_number: z.string().optional(),
  whatsapp_number: z.string().optional(),
});

export const kyeroFeedDbType = z.object({
  root: z.object({
    kyero: z.object({
      feed_version: z.string().optional(),
    }),
    property: z.array(kyeroPropertyDbType),
  }),
});

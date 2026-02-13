import { z } from "zod";

// --- Helper Schemas (Dependencies) ---

export const kyeroImageSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  url: z.url(), // Enforces valid URL format
});

export const kyeroSurfaceAreaSchema = z.object({
  built: z.number().optional(),
  plot: z.number().optional(),
});

export const kyeroEnergyRatingSchema = z.object({
  consumption: z.string().optional(),
  emissions: z.string().optional(),
});

// Matches Record<string, string> for multi-language nodes (e.g. { en: "...", es: "..." })
export const kyeroMultiLanguageStringSchema = z.record(z.string(), z.string());

// --- Main KyeroProperty Schema ---

export const kyeroPropertySchema = z.object({
  // -- Mandatory Fields --
  id: z.string(),
  date: z.string(), // You could refine this with .regex() if you want to strictly validate "YYYY-MM-DD HH:MM:SS"
  ref: z.string(),
  price: z.number(),
  type: z.string(),
  town: z.string(),
  province: z.string(),

  // -- Optional / Conditional Fields --
  currency: z.string().optional(), // Defaults to EUR in logic, but optional here
  price_freq: z.string().optional(),
  part_ownership: z.boolean().optional(),
  leasehold: z.boolean().optional(),
  new_build: z.boolean().optional(),

  location_detail: z.string().optional(),
  beds: z.number().optional(),
  baths: z.number().optional(),
  pool: z.boolean().optional(),

  surface_area: kyeroSurfaceAreaSchema.optional(),
  energy_rating: kyeroEnergyRatingSchema.optional(),

  url: z.url().optional(),

  // Description and Features
  desc: kyeroMultiLanguageStringSchema.optional(),
  features: kyeroMultiLanguageStringSchema.optional(),

  images: z.array(kyeroImageSchema).optional(),

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

export const kyeroFeedSchema = z.object({
  root: z.object({
    kyero: z.object({
      feed_version: z.string().optional(),
    }),
    property: z.array(kyeroPropertySchema),
  }),
});

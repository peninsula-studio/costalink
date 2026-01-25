import type z from "zod";
import type {
  kyeroPropertySchema,
  kyeroEnergyRatingSchema,
  kyeroFeedSchema,
  kyeroImageSchema,
  kyeroMultiLanguageStringSchema,
  kyeroSurfaceAreaSchema,
} from "@/lib/fn/kyero/schemas";

// --- Interfaces defining the Kyero V3 Schema ---

export type KyeroImage = z.infer<typeof kyeroImageSchema>;

export type KyeroSurfaceArea = z.infer<typeof kyeroSurfaceAreaSchema>;

export type KyeroEnergyRating = z.infer<typeof kyeroEnergyRatingSchema>;

// Kyero supports multi-language fields for descriptions and features
// e.g., <en>...</en>, <es>...</es>, <de>...</de>
// export type MultiLanguageString = Record<string, string>;
export type MultiLanguageString = z.infer<
  typeof kyeroMultiLanguageStringSchema
>;

// export interface KyeroProperty {
//   // -- Mandatory Fields --
//   id: string; // Unique ID for the property
//   date: string; // Last update: YYYY-MM-DD HH:MM:SS
//   ref: string; // Agent's reference
//   price: number; // Numeric price
//   type: string; // Property type (e.g., "Villa", "Apartment")
//   town: string; // Town name
//   province: string; // Province name
//
//   // -- Optional / Conditional Fields --
//   currency?: string; // Defaults to EUR if omitted
//   price_freq?: string; // e.g., "sale", "month", "week" (mainly for rentals)
//   part_ownership?: boolean; // "1" or "0" or "true"/"false"
//   leasehold?: boolean; // "1" or "0"
//   new_build?: boolean; // "1" or "0"
//
//   location_detail?: string; // Additional location info
//   beds?: number; // Number of bedrooms
//   baths?: number; // Number of bathrooms
//   pool?: boolean; // "1" or "0" indicating if pool exists
//
//   surface_area?: KyeroSurfaceArea;
//   energy_rating?: KyeroEnergyRating;
//
//   url?: string; // Link to property on agent's site
//
//   // Description and Features are often multi-language nodes
//   desc?: MultiLanguageString;
//   features?: MultiLanguageString; // Often contains comma-separated lists inside language tags
//
//   images?: KyeroImage[];
//
//   notes?: string; // Internal notes (not usually displayed publicly)
//
//   // -- V3.5+ Additions --
//   video_url?: string;
//   virtual_tour_url?: string;
//   catastral?: string; // Catastral reference number
//
//   // -- V3.7+ Additions --
//   email?: string; // Specific enquiry email for this property
//
//   // -- V3.8+ Additions --
//   prime?: boolean; // "1" or "0" for Prime listing status
//
//   // -- V3.9+ Additions --
//   contact_number?: string;
//   whatsapp_number?: string;
// }

// Export the inferred type to ensure it matches your interface
export type KyeroProperty = z.infer<typeof kyeroPropertySchema>;

// export interface KyeroFeed {
//   root: {
//     kyero: {
//       feed_version?: string;
//     };
//     property: KyeroProperty[];
//   };
// }

export type KyeroFeed = z.infer<typeof kyeroFeedSchema>

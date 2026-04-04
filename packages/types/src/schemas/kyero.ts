import {
  kyeroEnergyRatingDbType,
  kyeroFeedDbType,
  kyeroImageDbType,
  kyeroPropertyDbType,
  kyeroSurfaceAreaDbType,
} from "@repo/db/kyeroSchemas";
// import { z } from "zod";

// --- Helper Schemas (Dependencies) ---

export const kyeroImageSchema = kyeroImageDbType.safeExtend({});

export const kyeroSurfaceAreaSchema = kyeroSurfaceArea.safeExtend({});

export const kyeroEnergyRatingSchema = kyeroEnergyRating.safeExtend({});

// --- Main KyeroProperty Schema ---

export const kyeroPropertySchema = kyeroProperty.safeExtend({});

export const kyeroFeedSchema = kyeroFeed.safeExtend({});

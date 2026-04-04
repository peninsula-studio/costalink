import { z } from "zod";
import { LOCALES } from ".";

export const localeSchema = z.enum(LOCALES);

// Matches Record<string, string> for multi-language nodes (e.g. { en: "...", es: "..." })
export const i18nStringSchema = z.record(localeSchema, z.string());

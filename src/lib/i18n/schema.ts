import { z } from "zod";

export const LOCALES = [
  "es",
  "en",
  "de",
  "fr",
  "nl",
  "no",
  "sv",
  "ru",
] as const

export const localeSchema = z.enum(LOCALES);

// Matches Record<string, string> for multi-language nodes (e.g. { en: "...", es: "..." })
export const i18nStringSchema = z.record(localeSchema, z.string());

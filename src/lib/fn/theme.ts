import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import z from "zod";

const themeValidator = z.union([
  z.literal("dark"),
  z.literal("light"),
  z.literal("system"),
]);

// export type Theme = "dark" | "light" | "system";
export type Theme = z.infer<typeof themeValidator>;

export const THEME_STORAGE_KEY = "_preferred-theme" as const;


export const getThemeServerFn = createServerFn().handler(
  async () => (getCookie(THEME_STORAGE_KEY) || "light") as Theme,
);

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(themeValidator)
  .handler(async ({ data }) => setCookie(THEME_STORAGE_KEY, data));

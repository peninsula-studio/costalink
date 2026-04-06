import { auth } from "@repo/auth";
import { Hono } from "hono";
import type { AppEnv } from ".";

export const authRoutes = new Hono<AppEnv>().on(["POST", "GET"], "*", (c) =>
  auth.handler(c.req.raw.clone()),
);

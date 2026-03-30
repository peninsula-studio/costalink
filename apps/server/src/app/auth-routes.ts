import { auth } from "@repo/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AppEnv } from ".";

export const authRoutes = new Hono<AppEnv>();

authRoutes.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3001", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

authRoutes.on(["POST", "GET"], "*", (c) => auth.handler(c.req.raw));

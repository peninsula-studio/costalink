import { zValidator } from "@hono/zod-validator";
import { auth } from "@repo/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { authRoutes } from "./auth-routes";
import { organizationRoutes } from "./organization";

export type AppEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export const app = new Hono<AppEnv>()
  .use(
    "*", // or replace with "*" to enable cors for all routes
    cors({
      origin: ["http://localhost:5173", "*"], // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )

  .use("*", async (c, next) => {
    const session = await auth.api.getSession({
      headers: new Headers(c.req.raw.headers),
    });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  })

  .get("/", async (c) => {
    // const { SERVER_URL } = env(c);
    // return new Response("Hi!", { headers: new Headers() });
    if (c.var.user) {
      return c.text(`Hello ${c.var.user.name}`);
    } else {
      return c.text("Hello unauthenticated user!");
    }
  })

  .get(
    "/get-session",
    // zValidator(
    //   "json",
    //   z.object({
    //     email: z.string(),
    //     password: z.string(),
    //     rememberMe: z.boolean(),
    //   }),
    // ),
    async (c) => {
      const session = await auth.api.getSession({
        headers: new Headers(c.req.raw.headers),
      });
      return c.json(session);
      // return new Response("session");
      // const kek = new Response(, { headers: c.req.raw.headers });
    },
  )

  .route("/api/auth", authRoutes)
  .route("/", organizationRoutes);

// .use(
//   "/api/auth/*", // or replace with "*" to enable cors for all routes
//   cors({
//     origin: "http://localhost:3001", // replace with your origin
//     allowHeaders: ["Content-Type", "Authorization"],
//     allowMethods: ["POST", "GET", "OPTIONS"],
//     exposeHeaders: ["Content-Length"],
//     maxAge: 600,
//     credentials: true,
//   }),
// )

// .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

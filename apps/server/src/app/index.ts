import { auth } from "@repo/auth";
import { Hono } from "hono";
import { authRoutes } from "./auth-routes";

export type AppEnv = {
  // Bindings: typeof serverEnv;
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export const app = new Hono<AppEnv>();

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

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

app.get("/", async (c) => {
  // const { SERVER_URL } = env(c);
  if (c.var.user) {
    return c.text(`Hello ${c.var.user.name}`);
  } else {
    return c.text("Hello unauthenticated user!");
  }
});

authRoutes.get("/session", async (c) => {
  return c.text("Auth session");
  // const session = await auth.api.getSession({ headers: c.req.raw.headers });
});

app.route("/", authRoutes);

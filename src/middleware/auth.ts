import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getSessionCookie } from "better-auth/cookies";

export const sessionCookieMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    console.log(
      `Getting session cookie from middleware... ${(new Date()).toLocaleTimeString()}`,
    );
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      throw redirect({ to: "/sign-in" });
    }
    return await next();
  },
);

// export const adminMiddleware = createMiddleware({ type: "function" })
//   // .inputValidator(
//   //   (data: { context: { session: typeof auth.$Infer.Session } }) => data,
//   // )
//   .server(async ({ next, context }) => {
//     console.log("Checking if user is Admin...");
//     const session = await getSessionFn();
//     if (context?.session.user.role !== "admin") {
//       throw redirect({ to: "/dashboard" });
//     }
//     return await next({ context: { session } });
//   });

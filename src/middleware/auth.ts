import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getSessionFn } from "@/lib/fn/auth";

export const authMiddleware = createMiddleware().server(
  async ({ next }) => {
    console.log(`Getting session from middleware... ${(new Date()).toLocaleTimeString()}`);
    const session = await getSessionFn();
    if (!session) {
      throw redirect({ to: "/sign-in" });
    }
    return await next({ context: { session } });
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

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "@/env";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: schema,
    provider: "pg", // or "pg" or "mysql"
  }),
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    advanced: {
      //   // disableCSRFCheck: true,
      //   // disableOriginCheck: true,
      disableCSRFCheck: env.NODE_ENV === "development",
      disableOriginCheck: env.NODE_ENV === "development",
    },
  },
  plugins: [
    tanstackStartCookies(),
    admin(),
    organization({
      // ac: createAccessControl(defaultStatements),
      // roles: defaultRoles,
      allowUserToCreateOrganization: async (user) => {
        // const subscription = await getSubscription(user.id);
        return user.role === "admin";
      },
    }),
  ],
});

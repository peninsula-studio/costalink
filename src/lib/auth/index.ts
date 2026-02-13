import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";
import { env } from "@/env";
import { db } from "@/lib/db";
import { getInitialOrganization } from "@/lib/db/get-initial-organization";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: schema,
    provider: "pg", // or "pg" or "mysql"
  }),
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          // Implement your custom logic to set initial active organization
          const initialOrganizationId = await getInitialOrganization(
            session.userId,
          );
          return {
            data: {
              ...session,
              activeOrganizationId: initialOrganizationId,
            },
          };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
      defaultOrganizationId: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true, // don't allow user to set role
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    advanced: {
      disableCSRFCheck: env.NODE_ENV === "development",
      disableOriginCheck: env.NODE_ENV === "development",
    },
  },
  plugins: [
    nextCookies(),
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

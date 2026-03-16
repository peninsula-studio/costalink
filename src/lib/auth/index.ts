import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { serverEnv } from "@/env.server";
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
          let initialOrganizationId = null;
          const user = await db.query.user.findFirst({
            where: { id: { eq: session.userId } },
          });
          initialOrganizationId = user?.defaultOrganizationId || null;
          if (!initialOrganizationId) {
            const member = await db.query.member.findFirst({
              where: { userId: { eq: session.userId } },
            });
            initialOrganizationId = member?.organizationId || null;
          }
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
      //   // disableCSRFCheck: true,
      //   // disableOriginCheck: true,
      disableCSRFCheck: serverEnv.NODE_ENV === "development",
      disableOriginCheck: serverEnv.NODE_ENV === "development",
    },
  },
  plugins: [
    tanstackStartCookies(),
    admin(),
    organization({
      schema: {
        organization: {
          additionalFields: {
            plan: {
              type: [...schema.ORGANIZATION_PLAN_ENUM],
              required: true,
              defaultValue: "free",
              input: false, // don't allow user to set role
            },
          },
        },
      },
      // ac: createAccessControl(defaultStatements),
      // roles: defaultRoles,
      allowUserToCreateOrganization: async (user) => {
        // const subscription = await getSubscription(user.id);
        return user.role === "admin";
      },
    }),
  ],
});

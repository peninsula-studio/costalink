import { expo } from "@better-auth/expo";
import { db } from "@repo/db";
import * as schema from "@repo/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI, organization } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.SERVER_URL,
  // basePath: "/api/auth",
  database: drizzleAdapter(db, {
    schema: schema,
    provider: "pg",
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
    // advanced: {
    //   //   // disableCSRFCheck: true,
    //   //   // disableOriginCheck: true,
    //   disableCSRFCheck: process.env.NODE_ENV === "development",
    //   disableOriginCheck: process.env.NODE_ENV === "development",
    // },
  },
  plugins: [
    admin(),
    expo(),
    openAPI(),
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
  trustedOrigins: [
    // Basic scheme
    "myapp://",
    "myapp://**",
    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(process.env.NODE_ENV === "development"
      ? [
          "*",
          "exp://", // Trust all Expo URLs (prefix matching)
          "exp://**", // Trust all Expo URLs (wildcard matching)
          "exp://192.168.*.*:*/**", // Trust 192.168.x.x IP range with any port and path
        ]
      : []),
  ],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});

import { betterAuth } from "better-auth";
import { admin, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
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
  emailAndPassword: {
    enabled: true,
    // advanced: {
    //   // disableCSRFCheck: true,
    //   // disableOriginCheck: true,
    //   disableCSRFCheck: env.NODE_ENV === "development",
    //   disableOriginCheck: env.NODE_ENV === "development",
    // },
  },
});

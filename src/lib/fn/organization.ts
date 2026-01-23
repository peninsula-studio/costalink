import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth/client";
import {
  type ActiveOrganizationSelect,
  type FullOrganizationSelect,
  organizationKeys,
} from "@/lib/fn/keys";
import { authMiddleware } from "@/middleware/auth";

export const getListOrganizationsFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async () => {
    console.info(
      "[ 󰊕]:getListOrganizationFn ",
      "Getting Organization list...",
    );
    return auth.api.listOrganizations({ headers: getRequestHeaders() });
  });

export const listOrganizationsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [...organizationKeys.listOrganizations(userId)],
    queryFn: () => getListOrganizationsFn(),
  });

export const setActiveOrganizationFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator((data: ActiveOrganizationSelect) => data)
  .handler(async ({ data: { organizationId, organizationSlug } }) => {
    try {
      const data = await auth.api.setActiveOrganization({
        body: { organizationId, organizationSlug },
        headers: await getRequestHeaders(),
      });
      console.info(
        "[ 󰊕]:setActiveOrganizationFn ",
        "Setting active Organization...",
      );
      return data;
    } catch (e) {
      console.error(
        `Error setting active Organization: ${(e as Error).message}`,
      );
      throw redirect({ to: "/dashboard" });
    }
  });

export const getActiveOrganizationFn = createServerFn().handler(async () => {
  try {
    const data = await auth.api.getFullOrganization({
      headers: await getRequestHeaders(),
    });
    console.info(
      "[ 󰊕]:getActiveOrganizationFn ",
      "Getting active Organization...",
    );
    return data;
  } catch (e) {
    console.error(
      `Error getting current organization: ${(e as Error).message}`,
    );
    throw redirect({ to: "/dashboard" });
  }
});

export const getActiveOrganizationQueryOptions = (userId: string) =>
  queryOptions({
    // queryKey: [organizationKeys.getActiveOrganization(userId)],
    queryKey: ["kek"],
    queryFn: async () => await getActiveOrganizationFn(),
  });

export const setActiveOrganizationQueryOptions = ({
  organizationSlug,
  organizationId,
}: ActiveOrganizationSelect) =>
  queryOptions({
    queryKey: [
      ...organizationKeys.setActiveOrganization({
        organizationSlug,
        organizationId,
      }),
    ],
    queryFn: async () =>
      await setActiveOrganizationFn({
        data: { organizationId, organizationSlug },
      }),
  });

export const getActiveMember = createServerFn()
  .middleware([authMiddleware])
  .handler(async () => {
    const member = await auth.api.getActiveMember({
      headers: await getRequestHeaders(),
    });
    return { member };
  });

export const getFullOrganizationFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(
    (data?: {
      organizationId?: string;
      organizationSlug?: string;
      membersLimit?: string | number;
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const organization = await auth.api.getFullOrganization({
        query: data,
        headers: getRequestHeaders(),
      });
      console.info(`Getting info for organization: ${organization?.name}`);
      return organization;
    } catch (e) {
      console.error(`Error getting organization info: ${(e as Error).message}`);
      throw redirect({ to: "/dashboard" });
    }
  });

export const fullOrganizationQueryOptions = ({
  organizationSlug,
  organizationId,
}: FullOrganizationSelect) =>
  queryOptions({
    queryKey: [
      ...organizationKeys.getFullOrganization({
        organizationId,
        organizationSlug,
      }),
    ],
    queryFn: async () => {
      const { data, error } = await authClient.organization.getFullOrganization(
        { query: { organizationId, organizationSlug } },
      );
      if (error) {
        console.error(
          `Error getting full organization ${organizationId || organizationSlug}: ${error.message}`,
        );
      }
      return data;
    },
  });

// export const setActiveOrganizationIsomorphic = createIsomorphicFn()
//   .server(
//     async ({ organizationId, organizationSlug }: ActiveOrganizationSelect) =>
//       setActiveOrganizationFn({
//         data: { organizationId, organizationSlug },
//       }),
//   )
//   .client(
//     async ({ organizationId, organizationSlug }: ActiveOrganizationSelect) =>
//       setActiveOrganizationFn({
//         data: { organizationId, organizationSlug },
//       }),
//   );

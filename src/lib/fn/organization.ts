import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import {
  type ActiveOrganizationSelect,
  type OrganizationSelect,
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
    try {
      const organizationList = await auth.api.listOrganizations({
        headers: getRequestHeaders(),
      });
      return organizationList;
    } catch (e) {
      console.error(
        `Error getting list of organizations: ${(e as Error).message}`,
      );
      throw new Error("kek");
    }
  });

export const listOrganizationsQueryOptions = queryOptions({
  queryKey: organizationKeys.list(),
  queryFn: () => getListOrganizationsFn(),
});

export const setActiveOrganizationFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: ActiveOrganizationSelect) => data)
  .handler(async ({ data: { organizationId, organizationSlug } }) => {
    try {
      const data = await auth.api.setActiveOrganization({
        body: { organizationId, organizationSlug },
        headers: getRequestHeaders(),
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
      // throw new Error("kek");
    }
  });

export const setActiveOrganizationQueryOptions = (
  props: ActiveOrganizationSelect,
) =>
  queryOptions({
    queryKey: organizationKeys.setActive(props),
    queryFn: () => setActiveOrganizationFn({ data: props }),
  });

export const getFullOrganizationQueryOptions = (
  opts: OrganizationSelect = {},
) =>
  queryOptions({
    queryKey: organizationKeys.fullOrganization(opts),
    queryFn: () => getFullOrganizationFn({ data: opts }),
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

export const fullOrganizationQueryOptions = (props: OrganizationSelect) =>
  queryOptions({
    queryKey: organizationKeys.fullOrganization(props),
    queryFn: () => getFullOrganizationFn({ data: props }),
  });

export const getActiveOrganizationFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async () => {
    try {
      const organization = await auth.api.getFullOrganization({
        headers: getRequestHeaders(),
      });
      console.info(`Getting info for organization: ${organization?.name}`);
      return organization;
    } catch (e) {
      console.error(`Error getting organization info: ${(e as Error).message}`);
      throw redirect({ to: "/dashboard" });
    }
  });

export const getActiveOrganizationQueryOptions = queryOptions({
  queryKey: organizationKeys.active(),
  queryFn: async () => await getFullOrganizationFn(),
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

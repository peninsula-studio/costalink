import { queryOptions } from "@tanstack/react-query";
import { isRedirect, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import {
  type ActiveOrganizationSelect,
  type OrganizationSelect,
  organizationKeys,
} from "@/lib/fn/keys";

export const getListOrganizationsFn = createServerFn().handler(async () => {
  try {
    const organizationList = await auth.api.listOrganizations({
      headers: getRequestHeaders(),
    });
    return organizationList;
  } catch (error) {
    // Re-throw redirects (they're intentional, not errors)
    if (isRedirect(error)) throw error;
    // Setting active Organization failed (network error, etc.) - redirect to dashboard
    console.error(
      `Error getting Organization list: ${(error as Error).message}`,
    );
    throw redirect({ to: "/" });
  }
});

export const listOrganizationsQueryOptions = () =>
  queryOptions({
    queryKey: organizationKeys.list(),
    queryFn: () => getListOrganizationsFn(),
  });

export const setActiveOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator((data: ActiveOrganizationSelect) => data)
  .handler(async ({ data: { organizationId, organizationSlug } }) => {
    try {
      const data = await auth.api.setActiveOrganization({
        body: { organizationId, organizationSlug },
        headers: getRequestHeaders(),
      });
      if (organizationId === null) return null;
      return data;
    } catch (error) {
      // Re-throw redirects (they're intentional, not errors)
      if (isRedirect(error)) throw error;
      // Setting active Organization failed (network error, etc.) - redirect to dashboard
      console.error(
        `fn: Error setting active Organization: ${(error as Error).message}`,
      );
      throw redirect({ to: "/app" });
    }
  });

export const setActiveOrganizationQueryOptions = (
  props: ActiveOrganizationSelect,
) =>
  queryOptions({
    queryKey: organizationKeys.setActive(props),
    queryFn: async () => await setActiveOrganizationFn({ data: props }),
  });

export const getFullOrganizationQueryOptions = (
  opts: OrganizationSelect = {},
) =>
  queryOptions({
    queryKey: organizationKeys.fullOrganization(opts),
    queryFn: () => getFullOrganizationFn({ data: opts }),
  });

export const getFullOrganizationFn = createServerFn()
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
      return organization;
    } catch (e) {
      console.error(`Error getting organization info: ${(e as Error).message}`);
      throw redirect({ to: "/app" });
    }
  });

export const fullOrganizationQueryOptions = (props: OrganizationSelect) =>
  queryOptions({
    queryKey: organizationKeys.fullOrganization(props),
    queryFn: () => getFullOrganizationFn({ data: props }),
  });

export const getActiveOrganizationFn = createServerFn().handler(async () => {
  try {
    const organization = await auth.api.getFullOrganization({
      headers: getRequestHeaders(),
    });
    return organization;
  } catch (e) {
    console.error(`Error getting organization info: ${(e as Error).message}`);
    throw redirect({ to: "/app" });
  }
});

export const getActiveOrganizationQueryOptions = queryOptions({
  queryKey: organizationKeys.active(),
  queryFn: async () => await getActiveOrganizationFn(),
});

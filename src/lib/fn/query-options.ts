import { queryOptions } from "@tanstack/react-query";
import { authClient } from "@/lib/auth/client";
import { $getSession } from "@/lib/fn/auth";
import {
  type ActiveOrganizationSelect,
  organizationKeys,
  userKeys,
} from "@/lib/fn/keys";
import {
  $getActiveOrganization,
  $getListOrganizations,
  $setActiveOrganization,
} from "@/lib/fn/organization";

export const listOrganizationsQueryOptions = () =>
  queryOptions({
    queryKey: organizationKeys.list(),
    queryFn: () => $getListOrganizations(),
  });

export const setActiveOrganizationQueryOptions = (
  props: ActiveOrganizationSelect &
    Parameters<typeof organizationKeys.active>[0],
) =>
  queryOptions({
    queryKey: organizationKeys.setActive(props),
    queryFn: () => $setActiveOrganization(props),
  });

export const getActiveOrganizationQueryOptions = (
  props: Parameters<typeof organizationKeys.active>[0],
) =>
  queryOptions({
    queryKey: organizationKeys.active(props),
    queryFn: () => $getActiveOrganization(),
  });

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.session(),
    queryFn: $getSession,
  });

export const getFullOrganizationQueryOptions = (
  props: Parameters<typeof organizationKeys.fullOrganization>[0],
) =>
  queryOptions({
    queryKey: organizationKeys.fullOrganization(props),
    queryFn: async () => {
      try {
        const { data } = await authClient.organization.getFullOrganization({
          query: props,
        });
        return data;
      } catch (e) {
        throw e;
      }
    },
  });

import { organizationKeys } from "@repo/types/queries/organization-keys";
import type { organizationSelectSchema } from "@repo/types/schemas/organization";
import { queryOptions } from "@tanstack/react-query";
import type { z } from "zod";
import { authClient } from "@/lib/auth-client";

export const getListOrganizationsQueryOptions = () =>
  queryOptions({
    queryKey: organizationKeys.list(),
    queryFn: async () => {
      try {
        const { data, error } = await authClient.organization.list();
        if (error) {
          console.error(error);
          throw new Error(error.message);
        }
        return data;
      } catch (e) {
        // Setting active Organization failed (network error, etc.) - redirect to dashboard
        console.error(`Error getting Organization list: ${e}`);
        throw new Error(`Error getting Organization list: ${e}`);
      }
    },
  });

export const getFullOrganizationQueryOptions = ({
  organizationId,
  organizationSlug,
}: z.infer<typeof organizationSelectSchema>) =>
  queryOptions({
    queryKey: ["organization", organizationId || organizationSlug],
    queryFn: async () => {
      try {
        const { data, error } =
          await authClient.organization.getFullOrganization({
            query: { organizationId, organizationSlug },
          });
        if (error) {
          console.error(error);
          throw new Error(error.message);
        }
        return data;
      } catch (e) {
        // Setting active Organization failed (network error, etc.) - redirect to dashboard
        console.error(
          `Error getting Full Organization ${organizationId || organizationSlug}: ${e}`,
        );
        throw new Error(
          `Error getting Full Organization ${organizationId || organizationSlug}: ${e}`,
        );
      }
    },
  });

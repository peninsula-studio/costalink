import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { isRedirect, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { createOrganizationFormSchema } from "@/components/create-organization-form";
import { auth } from "@/lib/auth";
import { organizationKeys } from "@/lib/fn/keys";
import { adminRequiredMiddleware, sessionRequiredMiddleware } from "@/middleware/auth";
import { organizationSelectSchema } from "../zod/schemas/organization";

export const getListOrganizationsFn = createServerFn({ method: "GET" }).handler(
  async () => {
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
  },
);

export const organizationListQueryOptions = (
  props: Parameters<typeof organizationKeys.list>[0],
) =>
  queryOptions({
    queryKey: organizationKeys.list(props),
    queryFn: getListOrganizationsFn,
  });

export const setActiveOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator(organizationSelectSchema)
  .handler(async ({ data }) => {
    try {
      const result = await auth.api.setActiveOrganization({
        body: data,
        headers: getRequestHeaders(),
      });
      if (data.organizationId === null) {
        return null;
      } else {
        if (result === null) throw new Error("Data should not be null");
        result.logo = result.logo || null;
        return result;
      }
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
  data: z.infer<typeof organizationSelectSchema> &
    Parameters<typeof organizationKeys.active>[0],
) =>
  queryOptions({
    queryKey: organizationKeys.setActive(data),
    queryFn: () => setActiveOrganizationFn({ data }),
  });

export const getFullOrganizationFn = createServerFn()
  .inputValidator(organizationSelectSchema)
  .handler(async ({ data }) => {
    try {
      const result = await auth.api.getFullOrganization({
        query: data,
        headers: getRequestHeaders(),
      });
      if (!result) throw new Error("Organization not found");
      result.logo = result.logo || null;
      return result;
    } catch (e) {
      console.error(`Error getting organization: ${(e as Error).message}`);
      throw new Error("Organization not found");
      // throw redirect({ to: "/app" });
    }
  });

export const getFullOrganizationQueryOptions = (
  data: Parameters<typeof getFullOrganizationFn>[0]["data"],
) =>
  queryOptions({
    queryKey: organizationKeys.fullOrganization({ data }),
    queryFn: () => getFullOrganizationFn({ data }),
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

export const getActiveOrganizationQueryOptions = (
  props: Parameters<typeof organizationKeys.active>[0],
) =>
  queryOptions({
    queryKey: organizationKeys.active(props),
    queryFn: () => getActiveOrganizationFn(),
  });

export const createOrganizationFn = createServerFn({ method: "POST" })
  .middleware([adminRequiredMiddleware])
  .inputValidator(createOrganizationFormSchema)
  .handler(async ({ data, context }) => {
    try {
      const createdOrganization = await auth.api.createOrganization({
        body: data,
        headers: getRequestHeaders(),
      });
      return { ...createdOrganization, user: context.session.user };
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error("Error creating organization");
      throw new Error(`${(error as Error).message}`);
    }
  });

export const createOrganizationMutationOptions = () =>
  mutationOptions({
    mutationKey: [...organizationKeys.all(), "create"],
    mutationFn: createOrganizationFn,
    onSuccess: async (data, _variables, _onMutateResult, { client }) => {
      await client.resetQueries({
        queryKey: organizationKeys.list({ userId: data.user.id }),
      });
      await client.refetchQueries({
        queryKey: organizationKeys.list({ userId: data.user.id }),
      });
    },
  });

// Function to delete an organization (stub implementation)
export const deleteOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ organizationId: z.string() }))
  .middleware([adminRequiredMiddleware])
  .handler(async ({ data, context }) => {
    try {
      const deletedOrg = await auth.api.deleteOrganization({
        body: data,
        headers: getRequestHeaders(),
      });
      return { ...deletedOrg, user: context.session.user };
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error(`Error deleting organization: ${(error as Error).message}`);
      throw new Error("Failed to delete organization");
    }
  });

export const deleteOrganizationMutationOptions = () =>
  mutationOptions({
    mutationKey: [...organizationKeys.all(), "delete"],
    mutationFn: deleteOrganizationFn,
    onSuccess: async (data, _variables, _onMutateResult, { client }) => {
      await client.resetQueries({
        queryKey: organizationKeys.list({ userId: data.user.id }),
      });
      await client.refetchQueries({
        queryKey: organizationKeys.list({ userId: data.user.id }),
      });
    },
  });

export const getOrganizationPermissionFn = createServerFn()
  .inputValidator(
    z.object({
      organization: z.array(z.enum(["delete", "update"])),
    }),
  )
  .middleware([sessionRequiredMiddleware])
  .handler(async ({ data }) => {
    const result = await auth.api.hasPermission({
      headers: getRequestHeaders(),
      // body: { permissions: { organization: ["update"] } },
      body: { permissions: data },
    });
    return result;
  });

export const getOrganizationPermissionQueryOptions = ({
  memberId,
  ...data
}: Parameters<typeof getOrganizationPermissionFn>[0]["data"] & {
  memberId: string;
}) =>
  queryOptions({
    queryKey: ["permissions", memberId, "organization"],
    queryFn: () => getOrganizationPermissionFn({ data }),
  });

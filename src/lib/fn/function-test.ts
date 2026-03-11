import { queryOptions } from "@tanstack/react-query";
import { isRedirect, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// Function to invite a member to an organization (stub implementation)
export const inviteMemberToOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { organizationId: string; email: string; role?: string }) => data,
  )
  .handler(async ({ data }) => {
    try {
      // For now, we'll return a mock response
      return {
        success: true,
        message: `Member ${data.email} invited to organization ${data.organizationId}`,
        data: {
          organizationId: data.organizationId,
          email: data.email,
          role: data.role,
        },
      };
    } catch (error) {
      // Re-throw redirects (they're intentional, not errors)
      if (isRedirect(error)) throw error;
      // Invitation failed - log error and re-throw
      console.error(
        `Error inviting member to organization: ${(error as Error).message}`,
      );
      throw new Error("Failed to invite member to organization");
    }
  });

// Query options for inviting a member
export const inviteMemberToOrganizationQueryOptions = (props: {
  organizationId: string;
  email: string;
  role?: string;
}) =>
  queryOptions({
    queryKey: ["organization", "invite", props.organizationId, props.email],
    queryFn: () => inviteMemberToOrganizationFn({ data: props }),
  });

// Function to get organization members list (stub implementation)
export const getOrganizationMembersFn = createServerFn()
  .inputValidator(
    (data: { organizationId?: string; organizationSlug?: string }) => data,
  )
  .handler(async ({ data }) => {
    try {
      // For now, we'll return a mock response
      return {
        members: [],
        totalCount: 0,
      };
    } catch (error) {
      // Re-throw redirects (they're intentional, not errors)
      if (isRedirect(error)) throw error;
      console.error(
        `Error getting organization members: ${(error as Error).message}`,
      );
      throw redirect({ to: "/app" });
    }
  });

// Query options for organization members
export const organizationMembersQueryOptions = (props: {
  organizationId?: string;
  organizationSlug?: string;
}) =>
  queryOptions({
    queryKey: [
      "organization",
      "members",
      props.organizationId || props.organizationSlug,
    ],
    queryFn: () => getOrganizationMembersFn({ data: props }),
  });

// Additional utility functions for organization management
export const createOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; description?: string }) => data)
  .handler(async ({ data }) => {
    try {
      // For now, we'll return a mock response
      return {
        success: true,
        organization: {
          name: data.name,
          description: data.description,
          id: "mock-id",
        },
      };
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error(`Error creating organization: ${(error as Error).message}`);
      throw new Error("Failed to create organization");
    }
  });

export const updateOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { organizationId: string; name?: string; description?: string }) =>
      data,
  )
  .handler(async ({ data }) => {
    try {
      // For now, we'll return a mock response
      return {
        success: true,
        organization: {
          id: data.organizationId,
          name: data.name,
          description: data.description,
        },
      };
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error(`Error updating organization: ${(error as Error).message}`);
      throw new Error("Failed to update organization");
    }
  });

// Function to delete an organization (stub implementation)
export const deleteOrganizationFn = createServerFn({ method: "POST" })
  .inputValidator((data: { organizationId: string }) => data)
  .handler(async ({ data }) => {
    try {
      // For now, we'll return a mock response
      return {
        success: true,
        message: `Organization ${data.organizationId} deleted successfully`,
      };
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error(`Error deleting organization: ${(error as Error).message}`);
      throw new Error("Failed to delete organization");
    }
  });

import { queryOptions } from "@tanstack/react-query";
import { isRedirect, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { auth } from "@/lib/auth";
import { MEMBER_ROLE_ENUM } from "@/lib/db/schema";
import { memberKeys, type OrganizationSelect } from "@/lib/fn/keys";
// import { authMiddleware } from "@/middleware/auth";

export const getActiveMemberFn = createServerFn()
  // .middleware([authMiddleware])
  .handler(async () => {
    try {
      const member = await auth.api.getActiveMember({
        headers: getRequestHeaders(),
      });
      if (!member) {
        console.error("Not a member of the organization");
        throw redirect({ to: "/app" });
      }
      console.info(`Getting active member for user: ${member.user.name}`);
      return member;
    } catch (error) {
      // Re-throw redirects (they're intentional, not errors)
      if (isRedirect(error)) throw error;
      // Setting active Organization failed (network error, etc.) - redirect to dashboard
      console.error(
        `fn: Error getting active member: ${(error as Error).message}`,
      );
      throw redirect({ to: "/app" });
    }
  });

export const getActiveMemberQueryOptions = (
  props: Parameters<typeof memberKeys.active>[0],
) =>
  queryOptions({
    queryKey: memberKeys.active(props),
    queryFn: () => getActiveMemberFn(),
  });

export const listMembersFn = createServerFn()
  // .middleware([authMiddleware])
  .inputValidator(
    zodValidator(
      z.object({
        organizationId: z.string().optional(),
        organizationSlug: z.string().optional(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    try {
      const member = await auth.api.listMembers({
        query: {
          organizationId: data.organizationId,
          organizationSlug: data.organizationSlug,
        },
        headers: getRequestHeaders(),
      });
      console.info(
        "[ 󰊕]:removeMemberFn",
        "Removing member to Organization...",
      );
      return member;
    } catch (e) {
      console.error(
        `Error removing member from Organization: ${(e as Error).message}`,
      );
      // throw e;
      throw new Error("kek");
    }
  });

export const listMembersQueryOptions = (props: OrganizationSelect) =>
  queryOptions({
    queryKey: memberKeys.list(props),
    queryFn: () => listMembersFn({ data: { ...props } }),
  });

export const addMemberFn = createServerFn()
  // .middleware([authMiddleware])
  .inputValidator(
    zodValidator(
      z.object({
        userId: z.string(),
        role: z.enum(MEMBER_ROLE_ENUM),
        organizationId: z.string(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    try {
      const member = await auth.api.addMember({
        body: {
          userId: data.userId,
          role: data.role,
          organizationId: data.organizationId,
        },
        headers: getRequestHeaders(),
      });
      console.info("[ 󰊕]:addMemberFn", "Adding member to Organization...");
      return member;
    } catch (e) {
      console.error(
        `Error adding member to Organization: ${(e as Error).message}`,
      );
      // throw e;
      throw new Error("kek");
    }
  });

export const removeMemberFn = createServerFn()
  // .middleware([authMiddleware])
  .inputValidator(
    zodValidator(
      z.object({
        memberIdOrEmail: z.string(),
        organizationId: z.string(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    try {
      const member = await auth.api.removeMember({
        body: {
          memberIdOrEmail: data.memberIdOrEmail,
          organizationId: data.organizationId,
        },
        headers: getRequestHeaders(),
      });
      console.info(
        "[ 󰊕]:removeMemberFn",
        "Removing member to Organization...",
      );
      return member;
    } catch (e) {
      console.error(
        `Error removing member from Organization: ${(e as Error).message}`,
      );
      // throw e;
      throw new Error("kek");
    }
  });

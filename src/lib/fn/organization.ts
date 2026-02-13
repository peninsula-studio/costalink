"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { ActiveOrganizationSelect } from "@/lib/fn/keys";

export async function $getListOrganizations() {
  try {
    const organizationList = await auth.api.listOrganizations({
      headers: await headers(),
    });
    return organizationList;
  } catch (error) {
    // Setting active Organization failed (network error, etc.) - redirect to dashboard
    console.error(
      `Error getting Organization list: ${(error as Error).message}`,
    );
    throw redirect("/");
  }
}

export async function $setActiveOrganization({
  organizationId,
  organizationSlug,
}: ActiveOrganizationSelect) {
  try {
    const data = await auth.api.setActiveOrganization({
      body: { organizationId, organizationSlug },
      headers: await headers(),
    });
    if (organizationId === null) {
      return null;
    } else {
      if (data === null) throw new Error("Data should not be null");
      return data;
    }
  } catch (error) {
    // Setting active Organization failed (network error, etc.) - redirect to dashboard
    console.error(
      `fn: Error setting active Organization: ${(error as Error).message}`,
    );
    throw redirect("/dashboard");
  }
}

export async function $getFullOrganization(props: {
  organizationId?: string;
  organizationSlug?: string;
  membersLimit?: string | number;
}) {
  try {
    const organization = await auth.api.getFullOrganization({
      query: props,
      headers: await headers(),
    });
    return organization;
  } catch (e) {
    console.error(`Error getting organization info: ${(e as Error).message}`);
    throw redirect("/dashboard");
  }
}

export async function $getActiveOrganization() {
  try {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });
    return organization;
  } catch (e) {
    console.error(`Error getting organization info: ${(e as Error).message}`);
    throw redirect("/dashboard");
  }
}

"use server";

import { db } from "@/lib/db";

export const $getAgencyProperties = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  try {
    const propertyList = await db.query.property.findMany({
      where: { organizationId: { eq: organizationId } },
    });
    return propertyList;
  } catch (error) {
    console.error(
      `Error getting list of organizations: ${(error as Error).message}`,
    );
    throw new Error("Error getting organizations");
  }
};

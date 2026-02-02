import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { QueryBuilder } from "drizzle-orm/pg-core";
import { db } from "@/lib/db";

export const getOrganizationPropertiesFn = createServerFn()
  .inputValidator((data: { organizationId: string }) => data)
  // .inputValidator(
  //   (data: Parameters<typeof db.query.property.findMany>["0"]) => data,
  // )
  .handler(async ({ data }) => {
    try {
      const propertyList = await db.query.property.findMany({
        where: { organizationId: { eq: data.organizationId } },
      });
      return propertyList;
    } catch (error) {
      console.error(
        `Error getting list of organizations: ${(error as Error).message}`,
      );
      throw new Error("Error getting organizations");
    }
  });

export const getPropertiesQueryOptions = ({
  organizationId,
}: {
  organizationId: string;
}) =>
  queryOptions({
    queryKey: ["property", "list", organizationId],
    queryFn: async () =>
      await getOrganizationPropertiesFn({ data: { organizationId } }),
  });

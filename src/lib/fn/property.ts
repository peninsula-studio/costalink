import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import type { z } from "zod";
import { db } from "@/lib/db";
import { adminMiddleware, authMiddleware } from "@/middleware/auth";
import { property } from "../db/schema";
import { propertyKeys } from "./keys";
import { extractKyeroProperties } from "./kyero/extract-kyero-property";
import type { kyeroPropertySchema } from "./kyero/schemas";
import { getActiveOrganizationFn } from "./organization";

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

export const checkPropertyReferenceFn = createServerFn()
  .inputValidator((data: { ref: string }) => data)
  .handler(async ({ data }) => {
    try {
      const property = await db.query.property.findFirst({
        where: { ref: { eq: data.ref } },
      });
      return !property;
    } catch (error) {
      console.error(
        `Error getting list of organizations: ${(error as Error).message}`,
      );
      throw new Error("Error getting organizations");
    }
  });

export const createPropertyFn = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof kyeroPropertySchema>) => data)
  .handler(async ({ data }) => {
    const orgId = await getActiveOrganizationFn();
    if (!orgId) throw new Error("There is no valid active Organization");

    try {
      const result = await db
        .insert(property)
        .values({
          beds: data.beds,
          baths: data.baths,
          ref: data.ref,
          price: data.price,
          organizationId: orgId.id,
          province: data.province,
          town: data.town,
          type: data.type,
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error(
        `Error getting list of organizations: ${(error as Error).message}`,
      );
      throw new Error("Error getting organizations");
    }
  });

export const createPropertyMutationOptions = () =>
  mutationOptions({
    mutationKey: propertyKeys.create(),
    mutationFn: async (data: z.infer<typeof kyeroPropertySchema>) =>
      await createPropertyFn({ data }),
    onSuccess: async (result, data, _, { client }) => {
      console.info(`✅ Property with reference ${data.ref} created.`);
      await client.resetQueries({
        queryKey: propertyKeys.list({ organizationId: result.organizationId }),
      });
      return;
    },
  });

export const extractPropertiesFromKyeroXMLFn = createServerFn()
  .inputValidator((data: { url: string }) => data)
  .middleware([authMiddleware, adminMiddleware])
  .handler(async ({ data: { url } }) => {
    const orgId = await getActiveOrganizationFn();
    if (!orgId) throw new Error("There is no valid active Organization");

    try {
      const rawXmlData = await fetch(url);
      const blob = await rawXmlData.blob();
      const extracted = extractKyeroProperties(await blob.text());
      return extracted;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching the Kyero XML");
    }
  });

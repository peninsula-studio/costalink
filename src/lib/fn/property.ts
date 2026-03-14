import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { adminRequiredMiddleware, authMiddleware } from "@/middleware/auth";
import { property } from "../db/schema";
import { propertyKeys } from "./keys";
import { extractKyeroProperties } from "./kyero/extract-kyero-property";
import type { kyeroPropertySchema } from "./kyero/schemas";
import { getActiveOrganizationFn } from "./organization";

export const getOrganizationProperyListFn = createServerFn()
  .inputValidator(
    z.object({
      organizationId: z.string(),
      pageSize: z.number().optional().default(5),
      page: z.number().optional().default(1),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data: { organizationId, page, pageSize } }) => {
    try {
      const propertyList = await db.query.property.findMany({
        where: { organizationId: { eq: organizationId } },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      return propertyList;
    } catch (error) {
      console.error(
        `Error getting list of organizations: ${(error as Error).message}`,
      );
      throw new Error("Error getting organizations");
    }
  });

export const getOrganizationPropertyListQueryOptions = (
  data: Parameters<typeof getOrganizationProperyListFn>[0]["data"],
) =>
  queryOptions({
    queryKey: propertyKeys.list(data),
    queryFn: async () => await getOrganizationProperyListFn({ data }),
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
      const dbData: typeof property.$inferInsert = {
        organizationId: orgId.id,
        beds: data.beds,
        baths: data.baths,
        ref: data.ref,
        price: data.price,
        desc: data.desc,
        images: data.images,
        features: data.features,
        province: data.province,
        town: data.town,
        type: data.type,
        priceFreq: data.price_freq,
        currency: data.currency.toLowerCase(),
        partOwnership: data.part_ownership,
        leasehold: data.leasehold,
        newBuild: data.new_build,
        locationDetail: data.location_detail,
        pool: data.pool,
        surfaceArea: data.surface_area,
        energyRating: data.energy_rating,
        url: data.url,
        notes: data.notes,
        videoUrl: data.video_url,
        virtualTourUrl: data.virtual_tour_url,
        catastral: data.catastral,
        email: data.email,
        prime: data.prime,
        contactNumber: data.contact_number,
        whatsappNumber: data.whatsapp_number,
      };

      const result = await db.insert(property).values([dbData]).returning();
      return result[0];
    } catch (e) {
      if (e instanceof Error) {
        console.error(`❌ Error creating property: ${(e as Error).message}`);
      }
      throw e;
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

export const extractAndSavePropertiesFromKyeroXMLFn = createServerFn()
  .inputValidator((data: { url: string }) => data)
  .middleware([adminRequiredMiddleware])
  .handler(async ({ data: { url } }) => {
    const orgId = await getActiveOrganizationFn();
    if (!orgId) throw new Error("There is no valid active Organization");

    try {
      const rawXmlData = await fetch(url);
      const blob = await rawXmlData.blob();
      const extracted = extractKyeroProperties(await blob.text());

      // Create all properties in the database
      const results = [];
      for (const property of extracted) {
        try {
          // // Transform property data to match database schema
          // const dbPropertyData = {
          //   ...property,
          //   priceFreq: property.price_freq,
          //   partOwnership: property.part_ownership,
          //   leasehold: property.leasehold,
          //   newBuild: property.new_build,
          //   locationDetail: property.location_detail,
          //   surfaceArea: property.surface_area,
          //   energyRating: property.energy_rating,
          //   videoUrl: property.video_url,
          //   virtualTourUrl: property.virtual_tour_url,
          //   contactNumber: property.contact_number,
          //   whatsappNumber: property.whatsapp_number,
          // };

          // const result = await createPropertyFn({ data: dbPropertyData });
          const result = await createPropertyFn({ data: property });
          results.push(result);
        } catch (error) {
          console.error(`Error creating property ${property.ref}:`, error);
          // Continue with other properties instead of failing completely
        }
      }

      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching the Kyero XML");
    }
  });

export const extractPropertiesFromKyeroXMLFn = createServerFn()
  .inputValidator((data: { url: string }) => data)
  .middleware([adminRequiredMiddleware])
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

export const updatePropertyFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: Partial<z.infer<typeof kyeroPropertySchema>> & { id: string }) =>
      data,
  )
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;

      const result = await db
        .update(property)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(property.id, id))
        .returning();

      return result[0];
    } catch (e) {
      if (e instanceof Error) {
        console.error(`❌ Error updating property: ${(e as Error).message}`);
      }
      throw e;
    }
  });

export const deletePropertyFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      await db.delete(property).where(eq(property.id, data.id));
      return { success: true };
    } catch (e) {
      if (e instanceof Error) {
        console.error(`❌ Error deleting property: ${(e as Error).message}`);
      }
      throw e;
    }
  });

export const getPropertyFn = createServerFn({ method: "GET" })
  .inputValidator((data: { propertyId: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { propertyId } }) => {
    try {
      const result = await db.query.property.findFirst({
        where: { id: { eq: propertyId } },
      });

      // TODO: Manage role based information return

      return result;
    } catch (e) {
      if (e instanceof Error) {
        console.error(`❌ Error getting property: ${(e as Error).message}`);
      }
      throw e;
    }
  });

export const getPropertiesFn = createServerFn({ method: "GET" })
  .inputValidator(
    (data: typeof db.query.property.findMany.arguments.where) => data,
  )
  .middleware([authMiddleware])
  .handler(async ({ data: { propertyId } }) => {
    try {
      const result = await db.query.property.findFirst({
        where: { id: { eq: propertyId } },
      });

      // TODO: Manage role based information return

      return result;
    } catch (e) {
      if (e instanceof Error) {
        console.error(`❌ Error getting property: ${(e as Error).message}`);
      }
      throw e;
    }
  });

export const getPropertyQueryOptions = ({
  propertyId,
}: {
  propertyId: string;
  userId: string;
}) =>
  queryOptions({
    queryKey: ["property", "detail", propertyId],
    queryFn: async () => await getPropertyFn({ data: { propertyId } }),
  });

export const updatePropertyMutationOptions = () =>
  mutationOptions({
    mutationKey: ["property", "update"],
    mutationFn: async (
      data: Partial<z.infer<typeof kyeroPropertySchema>> & { id: string },
    ) => await updatePropertyFn({ data }),
    onSuccess: async () => {
      console.info(`✅ Property updated successfully.`);
    },
  });

export const deletePropertyMutationOptions = () =>
  mutationOptions({
    mutationKey: ["property", "delete"],
    mutationFn: async (data: { id: string }) =>
      await deletePropertyFn({ data }),
    onSuccess: async (_result, data, _context, { client }) => {
      console.info(`✅ Property with ID ${data.id} deleted.`);
      await client.resetQueries({ queryKey: ["property", "list"] });
    },
  });

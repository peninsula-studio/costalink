import { createServerFn } from "@tanstack/react-start";
import { db } from "@/lib/db";

export const getPropertiesFn = createServerFn()
  // .inputValidator((data: typeof db.query.property.findMany.arguments) => data)
  .inputValidator(
    (data: Parameters<typeof db.query.property.findMany>["0"]) => data,
  )
  .handler(async ({ data }) => {
    try {
      const propertyList = await db.query.property.findMany(data);
      return propertyList;
    } catch (error) {
      console.error(
        `Error getting list of organizations: ${(error as Error).message}`,
      );
      throw new Error("Error getting organizations");
    }
  });

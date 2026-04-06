import { zValidator } from "@hono/zod-validator";
import { db } from "@repo/db";
import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from ".";

export const organizationRoutes = new Hono<AppEnv>().get(
  "/organization/:id/properties/:pageSize?:page?",
  zValidator(
    "param",
    z.object({
      id: z.string(),
      pageSize: z.number().optional().default(10),
      page: z.number().optional().default(1),
    }),
  ),
  async (c) => {
    const { id, pageSize = 10, page = 1 } = c.req.valid("param");
    const propertyList = await db.query.property.findMany({
      where: { organizationId: { eq: id } },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return c.json(propertyList);
    // return new Response("session");
    // const kek = new Response(, { headers: c.req.raw.headers });
  },
);
// propertyRoutes.get(
//   "/:id",
//   zValidator(
//     "param",
//     z.object({
//       id: z.string(),
//     }),
//   ),
//   async (c) => {
//       const propertyList = await db.query.property.findMany({
//         where: { organizationId: { eq: organizationId } },
//         limit: pageSize,
//         offset: (page - 1) * pageSize,
//       });
//     return c.json(session);
//     // return new Response("session");
//     // const kek = new Response(, { headers: c.req.raw.headers });
//   },
// )

import { neon } from "@neondatabase/serverless";
import { relations } from "@repo/db/relations";
import * as schema from "@repo/db/schema";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL as string);

export const db = drizzle({
  // connection: serverEnv.DATABASE_URL,
  client: sql,
  schema: schema,
  relations: relations,
});

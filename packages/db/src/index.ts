import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "./relations";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL as string);

export const db = drizzle({
  // connection: serverEnv.DATABASE_URL,
  client: sql,
  schema: schema,
  relations: relations,
});

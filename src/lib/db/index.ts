import "@tanstack/react-start/server-only";
// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/node-postgres";
import { serverEnv } from "@/env.server";
import { relations } from "@/lib/db/relations";
import * as schema from "@/lib/db/schema";

// const sql = neon(serverEnv.DATABASE_URL);

export const db = drizzle({
  connection: serverEnv.DATABASE_URL,
  // client: sql,
  schema: schema,
  relations: relations,
});

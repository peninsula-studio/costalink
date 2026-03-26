import { neon } from "@neondatabase/serverless";
import { serverEnv } from "@/env.server";

let client: ReturnType<typeof neon>;

export async function getClient() {
  if (serverEnv.DATABASE_URL) {
    return undefined;
  }
  if (!client) {
    client = await neon(serverEnv.DATABASE_URL);
  }
  return client;
}

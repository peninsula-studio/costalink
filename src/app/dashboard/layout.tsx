import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { $getSession } from "@/lib/fn/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const reqHeaders = await headers();
  const session = await $getSession({ headers: reqHeaders });

  if (!session) redirect("/sign-in");

  return children;
}

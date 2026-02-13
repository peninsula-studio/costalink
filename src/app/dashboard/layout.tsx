import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppProvider } from "@/components/app-provider";
import { getSessionQueryOptions } from "@/lib/fn/query-options";
import { getQueryClient } from "@/lib/get-query-client";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const qc = getQueryClient();
  const session = await qc.ensureQueryData({
    ...getSessionQueryOptions(),
    revalidateIfStale: true,
  });

  if (!session) redirect("/sign-in");

  return <AppProvider user={session.user}>{children}</AppProvider>;
}

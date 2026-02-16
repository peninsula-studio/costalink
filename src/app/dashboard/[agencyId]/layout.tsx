import type { ReactNode } from "react";
import { $setActiveOrganization } from "@/lib/fn/organization";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;

  $setActiveOrganization({
    organizationId: agencyId,
  });

  return children;
}

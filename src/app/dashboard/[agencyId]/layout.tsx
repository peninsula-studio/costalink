import { Separator } from "@base-ui/react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { type ReactNode, Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { $setActiveOrganization } from "@/lib/fn/organization";
import {
  getFullOrganizationQueryOptions,
  getSessionQueryOptions,
} from "@/lib/fn/query-options";
import { getQueryClient } from "@/lib/get-query-client";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;

  await connection();
  const qc = getQueryClient();

  const session = await qc.ensureQueryData(getSessionQueryOptions());

  if (session?.session.activeOrganizationId !== agencyId) {
    $setActiveOrganization({ organizationId: agencyId });
  }

  void qc.prefetchQuery(
    getFullOrganizationQueryOptions({ organizationId: agencyId }),
  );

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-col gap-y-6 p-6">
          <Suspense fallback={<div>Loading agency page stuff...</div>}>
            <HydrationBoundary state={dehydrate(qc)}>
              {children}
            </HydrationBoundary>
          </Suspense>
        </main>
      </SidebarInset>
    </>
  );
}

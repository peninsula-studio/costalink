import { Separator } from "@base-ui/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppProvider } from "@/components/app-provider";
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
import { $getSession } from "@/lib/fn/auth";
import {
  $getFullOrganization,
  $getListOrganizations,
  $setActiveOrganization,
} from "@/lib/fn/organization";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  const reqHeaders = await headers();

  const session = await $getSession({ headers: reqHeaders });

  if (!session) redirect("/sign-in");

  const activeOrgPromise = $getFullOrganization({
    organizationId: agencyId,
  });

  const orgListPromise = $getListOrganizations({ headers: reqHeaders });

  await $setActiveOrganization({
    organizationId: agencyId,
    headers: reqHeaders,
  });

  return (
    <AppProvider
      activeOrgPromise={activeOrgPromise}
      orgListPromise={orgListPromise}
      user={session.user}
    >
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
        <main className="flex flex-col gap-y-6 p-6">{children}</main>
      </SidebarInset>
    </AppProvider>
  );
}

import { Separator } from "@base-ui/react";
import { redirect } from "next/navigation";
import { type ReactNode, Suspense } from "react";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { $getSession } from "@/lib/fn/auth";
import {
  $getFullOrganization,
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

  const session = await $getSession();

  if (!session) redirect("/sign-in");

  if (session?.session.activeOrganizationId !== agencyId) {
    $setActiveOrganization({ organizationId: agencyId });
  }

  const fullOrganization = await $getFullOrganization({
    organizationId: agencyId,
  });

  if (!fullOrganization) redirect("/dashboard");

  return (
    <AppProvider activeOrganization={fullOrganization} user={session.user}>
      <Suspense
        fallback={
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <Skeleton className="h-12 w-full" />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup className="mt-6 gap-y-4">
                <Skeleton className="mb-2 h-6 w-4/5" />
                <Skeleton className="h-4 w-2/5 rounded-sm" />
                <Skeleton className="h-4 w-2/3 rounded-sm" />
                <Skeleton className="h-4 w-3/5 rounded-sm" />

                {/* <Skeleton className="h-4 w-2/3" /> */}
                {/* <Skeleton className="h-4 w-2/3" /> */}
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Skeleton className="h-12 w-full" />
            </SidebarFooter>
          </Sidebar>
        }
      >
        <AppSidebar agencyId={agencyId} />
      </Suspense>
      <SidebarInset>
        {/* <div>Agency: {search?.agency}</div> */}
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
          <Suspense fallback={<div>LOADING AGENCYID PAGE!!!</div>}>
            {children}
          </Suspense>
        </main>
      </SidebarInset>
    </AppProvider>
  );
}

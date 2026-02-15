import { Separator } from "@base-ui/react";
import { Building2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { $getSession } from "@/lib/fn/auth";
import { $getListOrganizations } from "@/lib/fn/organization";

export default async function DashboardPage() {
  const reqHeaders = await headers();
  const session = await $getSession({ headers: reqHeaders });

  if (!session) redirect("/sign-in");

  const listOrganizations = await $getListOrganizations({
    headers: reqHeaders,
  });

  const orgListPromise = $getListOrganizations({ headers: reqHeaders });

  const activeOrgPromise = async () => null;

  return (
    <AppProvider
      activeOrgPromise={activeOrgPromise()}
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
        <main className="flex flex-col gap-y-6 p-6">
          <h1 className="font-extrabold text-5xl tracking-tight">DASHBOARD</h1>

          <div className="flex w-fit gap-4">
            {listOrganizations.map((o, i) => (
              <Button
                key={o.id}
                nativeButton={false}
                render={
                  <Link href={`/dashboard/${o.id}`}>
                    <Building2 /> {o.name}
                  </Link>
                }
              ></Button>
            ))}
          </div>
        </main>
      </SidebarInset>
    </AppProvider>
  );
}

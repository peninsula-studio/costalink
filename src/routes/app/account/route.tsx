import { Separator } from "@base-ui/react";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import React from "react";
import { AccountSidebar } from "@/components/dashboard/account-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/app/account")({
  // server: {
  //   middleware: [sessionCookieMiddleware],
  // },
  component: AppLayout,
});

function AppLayout() {
  const matches = useRouterState({ select: (s) => s.matches });

  const breadcrumbs = matches
    .filter((match) => match.context.breadcrumbs)
    .at(-1)?.context.breadcrumbs;

  return (
    <>
      <AccountSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:h-14">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-vertical:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map(({ label, href }, i) => (
                  <React.Fragment key={href}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        render={<Link to={href}>{label}</Link>}
                      ></BreadcrumbLink>
                    </BreadcrumbItem>
                    {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </>
  );
}

import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useRouteContext, useRouterState } from "@tanstack/react-router";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { auth } from "@/lib/auth";
import { organizationKeys } from "@/lib/fn/keys";
import { getActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { session, organizations } = useRouteContext({
    from: "/app",
  });

  // const { data: activeOrganization } = useQuery(
  //   getActiveOrganizationQueryOptions,
  // );

  const qc = useQueryClient();
  const activeOrganization = qc.getQueryData(organizationKeys.active()) as
    | typeof auth.$Infer.ActiveOrganization
    | null;
  const isFetching = useIsFetching({ queryKey: organizationKeys.active() });
  const routerState = useRouterState();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
            size="lg"
          >
            {routerState.status !== "idle" || isFetching ? (
              <>
                <Skeleton className="aspect-square size-8" />
                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-3 w-full max-w-14" />
                  <Skeleton className="h-3 w-full max-w-32" />
                </div>
              </>
            ) : (
              <>
                <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeOrganization?.name || session.user.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </>
            )}
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        className="w-(--anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            // aria-selected={!activeOrganization}
            className="gap-2 p-2"
            render={
              <Link preload={false} to="/app">
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <UserIcon className="size-3.5 shrink-0" />
                </div>
                {session.user.name}
                <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
              </Link>
            }
          ></DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs">
            Organizations
          </DropdownMenuLabel>
          {organizations?.map((o, index) => (
            <DropdownMenuItem
              // aria-selected={o.id === activeOrganization?.id}
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              render={
                <Link
                  // onClick={() => mutate(o.id)}
                  params={{ tenant: o.slug }}
                  preload={false}
                  to="/app/s/$tenant"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Building2 className="size-3.5 shrink-0" />
                  </div>
                  {o.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
              }
            ></DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        {/*   <OrgList /> */}
        {/* </React.Suspense> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// const CurrentOrg = () => {
//   const { session } = useRouteContext({
//     from: "/app",
//   });
//
//   const { data: activeOrganization } = useSuspenseQuery(
//     getActiveOrganizationQueryOptions,
//   );
//
//   return (
//     <>
//       <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
//         <UserIcon className="size-4" />
//       </div>
//       <div className="grid flex-1 text-left text-sm leading-tight">
//         <span className="truncate font-medium">
//           {activeOrganization?.name || session.user.name}
//         </span>
//       </div>
//       <ChevronsUpDown className="ml-auto" />
//     </>
//   );
// };

// const OrgList = () => {
//   const { organizations } = useRouteContext({ from: "/app" });
//
//   const { data: activeOrganization } = useSuspenseQuery(
//     getActiveOrganizationQueryOptions,
//   );
//
//   return (
//     <DropdownMenuGroup>
//       <DropdownMenuLabel className="text-muted-foreground text-xs">
//         Organizations
//       </DropdownMenuLabel>
//       {organizations?.map((o, index) => (
//         <DropdownMenuItem
//           // aria-selected={o.id === activeOrganization?.id}
//           aria-selected={o.id === activeOrganization?.id}
//           className="gap-2 p-2"
//           key={o.name}
//           render={
//             <Link
//               // onClick={() => mutate(o.id)}
//               params={{ tenant: o.slug }}
//               preload={false}
//               to="/app/s/$tenant"
//             >
//               <div className="flex size-6 items-center justify-center rounded-md border">
//                 <Building2 className="size-3.5 shrink-0" />
//               </div>
//               {o.name}
//               <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
//             </Link>
//           }
//         ></DropdownMenuItem>
//       ))}
//     </DropdownMenuGroup>
//   );
// };

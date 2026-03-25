import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { EyeIcon } from "lucide-react";
import { FlexContainer } from "@/components/container";
import { RouteSkeleton } from "@/components/route-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2 } from "@/components/ui/typography";
import { PLACEHOLDER_AGENCY_LOGO } from "@/lib/constants";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";
import { setDefaultOrganizationFn } from "@/lib/fn/user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(app)/account/")({
  component: RouteComponent,
  pendingComponent: RouteSkeleton,
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    const organizationList = await context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: session.user.id }),
    );
    return { organizationList };
  },
});

function RouteComponent() {
  const router = useRouter();
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());
  const { user } = session;
  const { organizationList } = Route.useLoaderData();
  const qc = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: setDefaultOrganizationFn,
    onSuccess: async () => {
      await qc.resetQueries(getSessionQueryOptions());
      await router.invalidate();
    },
  });

  return (
    <FlexContainer
      className="items-center *:w-full *:max-w-4xl"
      render={<main></main>}
    >
      <section className="flex flex-col gap-4">
        <TypographyH2 className="flex-1">Organizations</TypographyH2>
        <ItemGroup>
          {organizationList.map((org) => (
            <Item
              className={cn("relative outline", {
                "bg-primary/5 outline-primary":
                  user.defaultOrganizationId === org.id,
              })}
              key={org.id}
              variant="outline"
            >
              {user.defaultOrganizationId === org.id && (
                <Badge className="absolute -top-2 right-0 left-0 mx-auto">
                  Default
                </Badge>
              )}
              <ItemMedia variant="image">
                <img
                  alt={PLACEHOLDER_AGENCY_LOGO.alt}
                  src={PLACEHOLDER_AGENCY_LOGO.src}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-lg!">{org.name}</ItemTitle>
                <span className="text-xs">{org.id}</span>
              </ItemContent>
              <ItemActions>
                {user.defaultOrganizationId !== org.id && (
                  <Button
                    className="cursor-pointer"
                    disabled={user.defaultOrganizationId === org.id}
                    onClick={async () => {
                      await mutateAsync({
                        data: { organizationId: org.id, userId: user.id },
                      });
                    }}
                  >
                    {isPending ? (
                      <>
                        <Spinner data-icon="inline-start" /> Setting
                      </>
                    ) : (
                      "Make default"
                    )}
                  </Button>
                )}
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      params={{ organizationId: org.id }}
                      preload={false}
                      to={"/$organizationId"}
                    >
                      <EyeIcon />
                    </Link>
                  }
                  size="icon"
                ></Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </section>

      {/* <section className="flex flex-col gap-4"> */}
      {/*   <TypographyH5>Default Organization</TypographyH5> */}
      {/*   <ItemGroup> */}
      {/*     {organizationList.map((org) => ( */}
      {/*       <Item */}
      {/*         className={cn("relative outline", { */}
      {/*           "bg-primary/5 outline-primary": */}
      {/*             user.defaultOrganizationId === org.id, */}
      {/*         })} */}
      {/*         key={org.id} */}
      {/*         variant="outline" */}
      {/*       > */}
      {/*         {user.defaultOrganizationId === org.id && ( */}
      {/*           <Badge className="absolute -top-2 right-0 left-0 mx-auto"> */}
      {/*             Default */}
      {/*           </Badge> */}
      {/*         )} */}
      {/*         <ItemContent> */}
      {/*           <ItemTitle className="text-base!">{org.name}</ItemTitle> */}
      {/*           <ItemDescription className="text-xs!">{org.id}</ItemDescription> */}
      {/*         </ItemContent> */}
      {/*         <ItemFooter className="justify-center"> */}
      {/*           {user.defaultOrganizationId !== org.id && ( */}
      {/*             <Button */}
      {/*               className="cursor-pointer" */}
      {/*               disabled={user.defaultOrganizationId === org.id} */}
      {/*               onClick={async () => { */}
      {/*                 await mutateAsync({ */}
      {/*                   data: { organizationId: org.id, userId: user.id }, */}
      {/*                 }); */}
      {/*               }} */}
      {/*             > */}
      {/*               {isPending ? ( */}
      {/*                 <> */}
      {/*                   <Spinner data-icon="inline-start" /> Setting */}
      {/*                 </> */}
      {/*               ) : ( */}
      {/*                 "Set default" */}
      {/*               )} */}
      {/*             </Button> */}
      {/*           )} */}
      {/*         </ItemFooter> */}
      {/*       </Item> */}
      {/*     ))} */}
      {/*   </ItemGroup> */}
      {/* </section> */}
    </FlexContainer>
  );
}

import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Building2, CogIcon, UserIcon } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";
import { FlexContainer } from "@/components/container";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@repo/ui/components/item";
import { Skeleton } from "@repo/ui/components/skeleton";
import { TypographyH5 } from "@repo/ui/components/typography";
import type { auth } from "@/lib/auth";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import {
  getFullOrganizationQueryOptions,
  organizationListQueryOptions,
} from "@/lib/fn/organization";
import { getOrganizationPropertyListQueryOptions } from "@/lib/fn/property";
import { formatPrice } from "@/lib/i18n/format";

export const Route = createFileRoute("/(app)/")({
  beforeLoad: async ({ context }) => {
    const { session, user } = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );

    if (session.activeOrganizationId) {
      console.info("Active Organization ID: ", session.activeOrganizationId);
      throw redirect({
        to: "/$organizationId",
        params: { organizationId: session.activeOrganizationId },
      });
    }
    if (user.defaultOrganizationId) {
      throw redirect({
        to: "/$organizationId",
        params: { organizationId: user.defaultOrganizationId },
      });
    }
  },
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    const organizationList = await context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: session.user.id }),
    );
    return { session, organizationList };
  },
  pendingComponent: () => (
    <div className="flex size-full min-h-lvh p-6">
      <Skeleton className="h-10 w-full" />
    </div>
  ),
  component: AppIndexPage,
});

function AppIndexPage() {
  const {
    organizationList,
    session: { user },
  } = Route.useLoaderData();

  return (
    <FlexContainer>
      {user.role === "admin" && (
        <Item className="w-fit" variant="secondary">
          <ItemHeader>
            <ItemTitle>
              <UserIcon />
              <TypographyH5>{user.name}</TypographyH5>
            </ItemTitle>
          </ItemHeader>
          <ItemContent>
            <ul>
              <li>
                <span className="text-muted-foreground">id:</span> {user.id}
              </li>
              <li>
                <span className="text-muted-foreground">Email:</span>{" "}
                {user.email}
              </li>
            </ul>
          </ItemContent>
          <ItemFooter>
            <ItemActions>
              <Button
                onClick={() => toast.success("Success toast")}
                render={<Link to="/admin" />}
                variant="default"
              >
                <CogIcon data-icon="inline-start" />
                Settings
              </Button>
              <Button
                onClick={() => toast.error("Error toast")}
                variant="destructive"
              >
                Toast error
              </Button>
            </ItemActions>
          </ItemFooter>
        </Item>
      )}

      <div className="flex flex-col gap-6">
        {organizationList?.map((org) => (
          <Suspense fallback={<div>Loading...</div>} key={org.id}>
            <OrganizationPreview data={org} />
          </Suspense>
        ))}
      </div>
    </FlexContainer>
  );
}

function OrganizationPreview({
  data,
}: {
  data: typeof auth.$Infer.Organization;
}) {
  const { data: fullOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: data.id }),
  );

  const { data: properties } = useSuspenseQuery(
    getOrganizationPropertyListQueryOptions({ organizationId: data.id }),
  );

  return (
    <div className="flex flex-col gap-4">
      <Item className="p-0">
        <Building2 className="size-[1em] stroke-foreground/75" />
        <TypographyH5>{fullOrganization.name}</TypographyH5>
        <Badge className="capitalize" variant="success">
          {fullOrganization.plan}
        </Badge>
        <Button>Go to Agency</Button>
      </Item>

      {properties.length > 1 ? (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(12rem,auto))] gap-3">
          {properties.map((p) => (
            <Card
              className="overflow-hidden pt-0! transition-shadow duration-150 hover:shadow-lg"
              key={p.id}
              size="sm"
            >
              <CardHeader className="aspect-video w-full overflow-hidden p-0!">
                <img
                  alt={p.images?.[0].id}
                  className="size-full object-cover"
                  src={p.images?.[0].url}
                />
              </CardHeader>

              <CardContent className="flex flex-col">
                <CardTitle className="flex justify-between pb-1 text-base">
                  {p.ref}
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-2 text-primary">
                    {formatPrice(p.price, p.currency, "es")}
                  </span>
                  {/* <Badge variant="success"> */}
                  {/*   {formatPrice(p.price, p.currency, "es")} */}
                  {/* </Badge> */}
                </CardTitle>
                <CardDescription className="line-clamp-2 leading-tight">
                  {p.desc?.en}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>NO PROPERTIES</div>
      )}
    </div>
  );
}

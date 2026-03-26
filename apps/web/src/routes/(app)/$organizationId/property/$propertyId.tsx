import { createFileRoute, redirect } from "@tanstack/react-router";
import { MailIcon } from "lucide-react";
import { PageContainer } from "@/components/container";
import { RouteSkeleton } from "@/components/route-skeleton";
import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/ui/components/card";
import { Item, ItemGroup } from "@repo/ui/components/item";
import {
  TypographyH1,
  TypographyLarge,
  TypographyP,
} from "@repo/ui/components/typography";
import { getPropertyQueryOptions } from "@/lib/fn/property";
import { formatPrice } from "@/lib/i18n/format";
import { cn } from "@repo/ui/lib/utils";

export const Route = createFileRoute(
  "/(app)/$organizationId/property/$propertyId",
)({
  beforeLoad: async ({ context, params, location }) => {
    const property = await context.queryClient.ensureQueryData(
      getPropertyQueryOptions({
        propertyId: params.propertyId,
        userId: params.organizationId,
      }),
    );

    if (!property) throw redirect({ to: ".." });

    return {
      property,
      breadcrumbs: [
        ...context.breadcrumbs,
        { label: property.ref, href: location.pathname },
      ],
    };
  },
  pendingComponent: RouteSkeleton,
  component: RouteComponent,
});

function RouteComponent() {
  const { property } = Route.useRouteContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "sold":
        return "bg-red-100 text-red-800 border-red-200";
      case "rented":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <PageContainer>
      <Card className="bg-muted">
        <CardHeader className="grid grid-cols-8 gap-y-sm">
          <section className="col-span-full flex flex-col gap-1">
            <TypographyH1 className="col-span-full">
              {property.ref}
            </TypographyH1>
            <TypographyP className="col-span-full">
              {property.type} in {property.town}, {property.province}
            </TypographyP>
          </section>

          <section className="col-span-full grid grid-cols-subgrid gap-xs">
            <TypographyLarge className="col-span-full">
              Property Details
            </TypographyLarge>
            <ul className="col-span-full grid grid-cols-subgrid gap-2xs *:[li]:col-span-2 *:[li]:flex *:[li]:gap-x-xs">
              <li>
                <span className="text-muted-foreground">Price:</span>
                <span>
                  {formatPrice(property.price, property.currency, "es")}
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">Type:</span>
                <span>{property.type}</span>
              </li>
              <li>
                <span className="text-muted-foreground">Location:</span>
                <span>
                  {property.town}, {property.province}
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">Bedrooms:</span>
                <span>{property.beds}</span>
              </li>
              <li>
                <span className="text-muted-foreground">Bathrooms:</span>
                <span>{property.baths}</span>
              </li>
              <li>
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  className={cn("capitalize", getStatusColor(property.status))}
                >
                  {property.status}
                </Badge>
              </li>
              {property.surfaceArea && (
                <li>
                  <span className="text-muted-foreground">Surface Area:</span>
                  <span>
                    {property.surfaceArea.built}m² (built)
                    {property.surfaceArea.plot &&
                      `/ ${property.surfaceArea.plot} m² (plot)`}
                  </span>
                </li>
              )}
              {property.energyRating && (
                <li>
                  <span className="text-muted-foreground">Energy Rating:</span>
                  <span>{property.energyRating.consumption || "N/A"}</span>
                </li>
              )}
            </ul>
          </section>

          <section className="col-span-full grid grid-cols-subgrid">
            <TypographyLarge className="col-span-full">
              Features
            </TypographyLarge>
            <ul
              className={cn(
                "col-span-full grid grid-cols-subgrid gap-2xs",
                "*:[li]:col-span-2 *:[li]:flex *:[li]:items-center *:[li]:gap-x-xs",
                "**:[span]:flex **:[span]:items-center **:[span]:gap-2xs",
              )}
            >
              <li>
                <span>
                  <MailIcon className="size-[1em]" /> Email:
                </span>
                <span>{property.email}</span>
              </li>
              {property.contactNumber && (
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{property.contactNumber}</span>
                </li>
              )}
              {property.whatsappNumber && (
                <li className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp:</span>
                  <span>{property.whatsappNumber}</span>
                </li>
              )}
              {property.catastral && (
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Catastral:</span>
                  <span>{property.catastral}</span>
                </li>
              )}

              {property.features &&
                Object.keys(property.features).length > 0 &&
                Object.entries(property.features).map(([lang, feature]) => (
                  <li key={lang}>{feature}</li>
                ))}
            </ul>
          </section>
        </CardHeader>

        <CardContent>
          {property.desc && (
            <CardDescription className="line-clamp-5">
              <TypographyP className="whitespace-pre-wrap">
                {Object.values(property.desc).join("\n")}
              </TypographyP>
            </CardDescription>
          )}
        </CardContent>

        <CardContent>
          {property.images && property.images.length > 0 && (
            <div className="flex flex-col gap-xs">
              <TypographyLarge>Images</TypographyLarge>
              <ItemGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {property.images.map((img) => (
                  <Item
                    className="aspect-video overflow-hidden rounded-lg bg-gray-100 p-0"
                    key={img.id}
                  >
                    <img
                      alt={img.id}
                      className="h-full w-full object-cover"
                      src={img.url}
                    />
                  </Item>
                ))}
              </ItemGroup>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}

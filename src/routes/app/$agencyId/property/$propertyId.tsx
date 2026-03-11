import { createFileRoute, redirect } from "@tanstack/react-router";
import { FlexContainer } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { getPropertyQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/$agencyId/property/$propertyId")({
  beforeLoad: async ({ context, params, routeId }) => {
    const property = await context.queryClient.ensureQueryData(
      getPropertyQueryOptions({ id: params.propertyId }),
    );
    if (!property) throw redirect({ to: "/app/$agencyId/property", params });
    return {
      property,
      breadcrumbs: [
        ...context.breadcrumbs,
        { label: property.ref, href: routeId },
      ],
    };
  },
  pendingComponent: () => (
    <FlexContainer className="min-h-lvh">
      <Skeleton className="h-12 w-full max-w-xs" />
    </FlexContainer>
  ),
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
    <FlexContainer className="min-h-lvh">
      {property ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <TypographyH1>{property.ref}</TypographyH1>
              <TypographyP className="mt-2 text-lg">
                {property.type} in {property.town}, {property.province}
              </TypographyP>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span>
                      {property.currency.toUpperCase()}{" "}
                      {property.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>
                      {property.town}, {property.province}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedrooms:</span>
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bathrooms:</span>
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                  </div>
                  {property.surfaceArea && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Surface Area:
                      </span>
                      <span>
                        {property.surfaceArea.built}m² (built) /{" "}
                        {property.surfaceArea.plot}m² (plot)
                      </span>
                    </div>
                  )}
                  {property.energyRating && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Energy Rating:
                      </span>
                      <span>{property.energyRating.consumption || "N/A"}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">
                  Contact & Features
                </h3>
                <div className="space-y-2">
                  {property.email && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{property.email}</span>
                    </div>
                  )}
                  {property.contactNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{property.contactNumber}</span>
                    </div>
                  )}
                  {property.whatsappNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">WhatsApp:</span>
                      <span>{property.whatsappNumber}</span>
                    </div>
                  )}
                  {property.catastral && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Catastral:</span>
                      <span>{property.catastral}</span>
                    </div>
                  )}
                </div>

                {property.features &&
                  Object.keys(property.features).length > 0 && (
                    <div className="mt-6">
                      <h4 className="mb-2 font-medium">Features</h4>
                      <ul className="list-inside list-disc">
                        {Object.entries(property.features).map(
                          ([lang, feature]) => (
                            <li key={lang}>{feature}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          {property.images && property.images.length > 0 && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">Images</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {property.images.map((img) => (
                    <div
                      className="aspect-video overflow-hidden rounded-lg bg-gray-100"
                      key={img.id}
                    >
                      <img
                        alt={img.id}
                        className="h-full w-full object-cover"
                        src={img.url}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {property.desc && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">Description</h3>
                <TypographyP className="whitespace-pre-wrap">
                  {Object.values(property.desc).join("\n")}
                </TypographyP>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <TypographyP className="text-lg">Property not found</TypographyP>
      )}
    </FlexContainer>
  );
}

import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { HouseIcon } from "lucide-react";
import * as React from "react";
import { useAppSidebarCtx } from "@/components/app-sidebar/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TypographyH2,
  TypographyH3,
  TypographyH5,
} from "@/components/ui/typography";
import { getPropertiesFn } from "@/lib/fn/property";

const BOLSAS = [
  {
    id: "019bae07-bc9e-7109-8542-2f61f385d1b3",
    name: "Bolsa TAG",
    plazaId: "019bae07-f5ac-76c8-ba2c-f15a07c3355d",
  },
];

const NOMBRAMIENTOS = [
  {
    id: "019bae07-9734-7425-8957-8edc474f6f42",
    denominacion: "Programa TAG",
    clase: "programa",
    aspirantId: "019bae07-8049-723c-b8ee-c25f2460b98c",
    plazaId: "019bae07-6ba1-7197-8ca1-76cba196c008",
  },
];

export const Route = createFileRoute("/_authed/s/$tenant/")({
  component: TenantPage,
});

function TenantPage() {
  const { activeOrganizationPromise } = Route.useRouteContext();
  const activeOrganization = React.use(activeOrganizationPromise);

  const { setActiveOrganization } = useAppSidebarCtx();

  React.useEffect(() => {
    setActiveOrganization(activeOrganization);
  }, [setActiveOrganization, activeOrganization]);

  return (
    <>
      <TypographyH2>{activeOrganization?.name}</TypographyH2>

      <section>
        <TypographyH3 className="inline-flex">
          <HouseIcon className="inline-flex" /> Properties
        </TypographyH3>
        <PropertySection />
      </section>

      <div>
        <TypographyH3>Bolsas</TypographyH3>
        <div className="flex gap-y-4 py-4">
          {BOLSAS.map((bolsa) => (
            <Card className="w-full max-w-md" key={`bolsa-${bolsa.id}`}>
              <CardHeader>
                <CardTitle>{bolsa.name}</CardTitle>
              </CardHeader>
              <CardContent>Aspirantes: 21341234</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

const PropertySection = () => {
  const { data: properties } = useSuspenseQuery({
    queryKey: ["kek"],
    queryFn: () => getPropertiesFn({ data: { where: { price: { gt: 0 } } } }),
  });

  return (
    <div className="bg-amber-300">
      {properties.map((property) => (
        <div key={property.id}>{property.id}</div>
      ))}
    </div>
  );
};

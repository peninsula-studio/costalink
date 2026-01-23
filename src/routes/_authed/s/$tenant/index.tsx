import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH2,
  TypographyH3,
  TypographyH5,
} from "@/components/ui/typography";
import { organizationKeys } from "@/lib/fn/keys";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

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
  // loader: async ({ context, params }) => {
  //   await context.queryClient.refetchQueries({
  //     queryKey: organizationKeys.setActiveOrganization({
  //       organizationSlug: params.tenant,
  //     }),
  //     type: "all",
  //     stale: true,
  //   });
  // },
});

function TenantPage() {
  const { tenant } = Route.useParams();

  // INFO: Then we await the activeOrganization data that will be cached by the queryClient
  const { data: activeOrganization } = useSuspenseQuery(
    setActiveOrganizationQueryOptions({ organizationSlug: tenant }),
  );

  // const qc = useQueryClient();
  // qc.refetchQueries({
  //   queryKey: organizationKeys.setActiveOrganization({
  //     organizationSlug: tenant,
  //   }),
  //   type: "all",
  //   stale: true,
  // });

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className="bg-lime-200 p-2">
          <table>
            <tbody className="divide-y divide-foreground border border-foreground **:px-2 *:[tr]:divide-x *:[tr]:divide-foreground">
              <tr>
                <td>path:</td>
                <td> _authed/s/$tenant</td>
              </tr>
              <tr>
                <td>params:</td>
                <td> {tenant}</td>
              </tr>
              <tr>
                <td>Organization ID:</td>
                <td> {activeOrganization?.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Suspense>

      <React.Suspense
        fallback={
          <section>
            <Skeleton className="h-lh w-[15ch] text-5xl" />
            <Skeleton className="h-lh w-[15ch] text-base" />
          </section>
        }
      >
        <TypographyH2>{activeOrganization?.name}</TypographyH2>
        <TypographyH5>{activeOrganization?.id}</TypographyH5>
      </React.Suspense>

      {/* <OrganizationHeader tenantSlug={tenantSlug} /> */}

      <section>
        <TypographyH3>Nombramientos</TypographyH3>
        <div className="flex gap-y-4 py-4">
          {NOMBRAMIENTOS.map((nombramiento) => (
            <Card className="w-full max-w-md" key={`bolsa-${nombramiento.id}`}>
              <CardHeader>
                <CardTitle>{nombramiento.denominacion}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
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
      </section>
    </>
  );
}

import { TypographyH1 } from "@repo/ui/components/typography";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageContainer } from "@/components/container";
import {
  SearchPropertyForm,
  searchPropertySchema,
} from "@/components/search-property-form";

const routeParamSchema = searchPropertySchema.extend({
  sortBy: z
    .enum(["price", "createdAt", "ref", "status", "province", "town"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
});

export const Route = createFileRoute("/(app)/$organizationId/property/search")({
  validateSearch: routeParamSchema,
  beforeLoad: async ({ context, routeId }) => {
    return {
      breadcrumbs: [...context.breadcrumbs, { label: "Search", href: routeId }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <TypographyH1>Search Property</TypographyH1>
      <SearchPropertyForm />
    </PageContainer>
  );
}

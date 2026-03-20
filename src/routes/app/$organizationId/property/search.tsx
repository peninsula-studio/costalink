import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { FlexContainer, PageContainer } from "@/components/container";
import {
  SearchPropertyForm,
  searchPropertySchema,
} from "@/components/search-property-form";
import { TypographyH1 } from "@/components/ui/typography";

const routeParamSchema = searchPropertySchema.extend({
  sortBy: z
    .enum(["price", "createdAt", "ref", "status", "province", "town"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
});

export const Route = createFileRoute("/app/$organizationId/property/search")({
  validateSearch: routeParamSchema,
  beforeLoad: async ({ context, routeId }) => {
    return {
      breadcrumbs: [...context.breadcrumbs, { label: "Search", href: routeId }],
    };
  },
  // loader: async ({ context }) => {
  //   const propertyCount = await db
  //     .select({ count: count() })
  //     .from(property)
  //     .where(eq(property.organizationId, context.activeOrganization.id));
  //   console.log(propertyCount);
  // },
  component: RouteComponent,
});

function RouteComponent() {
  // const { organizationId } = Route.useParams();
  // const { type, sortBy, sortOrder, page, pageSize } = Route.useSearch();
  //
  // const navigate = useNavigate();
  //
  // const allTypes: ComponentProps<typeof Select>["items"] = [
  //   { label: "Select type", value: "" },
  //   { label: "Detached", value: "detached" },
  //   { label: "Townhouse", value: "townhouse" },
  // ];
  //
  // const allStatus: ComponentProps<typeof Select>["items"] = [
  //   { label: "Select status", value: "" },
  //   ...PROPERTY_STATUS_ENUM.map((s) => ({ label: s, value: s })),
  // ];

  return (
    <PageContainer>
      <TypographyH1>Search Property</TypographyH1>
      <SearchPropertyForm />
    </PageContainer>
  );
}

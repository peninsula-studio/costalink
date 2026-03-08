import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  CheckIcon,
  EditIcon,
  EyeIcon,
  HousePlusIcon,
  StopCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { Suspense } from "react";
import { z } from "zod";
import { FlexContainer } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { PROPERTY_STATUS_ENUM } from "@/lib/db/schema";
import {
  deletePropertyMutationOptions,
  getPropertiesQueryOptions,
} from "@/lib/fn/property";
import { cn } from "@/lib/utils";

const routeParamSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  status: z.enum(PROPERTY_STATUS_ENUM).optional(),
  // status: property.$inferSelect.status,
  sortBy: z
    .enum(["price", "createdAt", "ref", "status", "province", "town"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/app/$agencyId/property/")({
  validateSearch: routeParamSchema,
  component: RouteComponent,
});

const ITEMS_PER_PAGE = 20;

function RouteComponent() {
  const { agencyId } = Route.useParams();
  const { search, type, status, sortBy, sortOrder, page } = Route.useSearch();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    navigate({
      to: ".",
      search: {
        search: value,
        type,
        status,
        sortBy,
        sortOrder,
        page,
      },
    });
  };

  const handleTypeFilter = (typeValue: string) => {
    const newType = type === typeValue ? undefined : typeValue;
    navigate({
      to: ".",
      search: {
        search,
        type: newType,
        status,
        sortBy,
        sortOrder,
        page,
      },
    });
  };

  const handleStatusFilter = (statusValue: string) => {
    const newStatus = status === statusValue ? undefined : statusValue;
    navigate({
      to: ".",
      search: {
        search,
        type,
        status: newStatus as
          | "active"
          | "pending"
          | "sold"
          | "rented"
          | undefined,
        sortBy,
        sortOrder,
        page,
      },
    });
  };

  return (
    <FlexContainer className="space-y-6">
      <FlexContainer className="" padding="none">
        <TypographyH1>Properties</TypographyH1>
        <Button
          className="w-fit"
          nativeButton={false}
          render={
            <Link params={{ agencyId }} to="/app/$agencyId/property/create">
              <HousePlusIcon /> Add Property
            </Link>
          }
        ></Button>
      </FlexContainer>

      <FlexContainer padding="none" spacing="sm">
        <FlexContainer className="*:max-w-xl md:flex-row" padding="none">
          <div className="flex-1">
            <Label className="mb-1 block font-medium text-sm leading-none">
              Search
            </Label>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by ref, town, province..."
              value={search || ""}
            />
          </div>

          <div>
            <Label className="mb-1 block font-medium text-sm leading-none">
              Type
            </Label>
            <Input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-0 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleTypeFilter(e.target.value)}
              placeholder="Type"
              value={type || ""}
            />
          </div>

          <div>
            <Label className="mb-1 block font-medium text-sm leading-none">
              Status
            </Label>
            <Input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-0 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleStatusFilter(e.target.value)}
              placeholder="Status"
              value={status || ""}
            />
          </div>
        </FlexContainer>

        <Suspense fallback={<Skeleton className="h-20 w-full" />}>
          <ResultTable />
        </Suspense>
      </FlexContainer>
    </FlexContainer>
  );
}

function ResultTable() {
  const { agencyId } = Route.useParams();
  const { search, type, status, sortBy, sortOrder, page } = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data: organizationProperties } = useSuspenseQuery(
    getPropertiesQueryOptions({
      organizationId: agencyId,
    }),
  );

  const filteredProperties = organizationProperties.filter((property) => {
    const matchesSearch =
      search &&
      (property.ref?.toLowerCase().includes(search.toLowerCase()) ||
        property.town.toLowerCase().includes(search.toLowerCase()) ||
        property.province.toLowerCase().includes(search.toLowerCase()));
    const matchesType = type ? property.type === type : true;
    const matchesStatus = status ? property.status === status : true;
    return (
      (!search || matchesSearch) &&
      (!type || matchesType) &&
      (!status || matchesStatus)
    );
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const sortField = sortBy || "createdAt";
    const order = sortOrder || "desc";
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    if (aValue < bValue) return order === "asc" ? -1 : 1;
    return order === "asc" ? 1 : -1;
  });

  // Pagination
  const currentPage = page || 1;
  const totalPages = Math.ceil(sortedProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = sortedProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const deleteMutation = useMutation(deletePropertyMutationOptions());

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      deleteMutation.mutate({ id });
    }
  };

  const getStatusColor = (
    status: z.infer<typeof routeParamSchema>["status"],
  ) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground border";
      case "inactive":
        return "bg-destructive text-destructive-foreground border";
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

  const getStatusIcon = (
    status: z.infer<typeof routeParamSchema>["status"],
  ) => {
    switch (status) {
      case "active":
        return <CheckIcon />;
      case "inactive":
        return <StopCircleIcon />;
      case "pending":
        return <CheckIcon />;
      case "sold":
        return <CheckIcon />;
      case "rented":
        return <CheckIcon />;
      default:
        return <CheckIcon />;
    }
  };

  const handleSort = (field: string) => {
    const currentSort = sortOrder || "desc";
    const newSort = sortBy === field && currentSort === "desc" ? "asc" : "desc";
    navigate({
      to: ".",
      search: {
        search,
        type,
        status,
        sortBy: field as "price" | "createdAt" | "ref",
        sortOrder: newSort,
        page: 1,
      },
    });
  };

  const arrowDirection = (dir?: "asc" | "desc") =>
    dir === "asc" ? (
      <ArrowUp className="size-[1em]" />
    ) : dir === "desc" ? (
      <ArrowDown className="size-[1em]" />
    ) : (
      ""
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="*:transition-colors *:hover:bg-accent/80">
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "ref",
              })}
              onClick={() => handleSort("ref")}
            >
              <span className="flex items-center gap-1">
                Ref {sortBy === "ref" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "price",
              })}
              onClick={() => handleSort("price")}
            >
              <span className="flex items-center gap-1">
                Price {sortBy === "price" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "town",
              })}
              onClick={() => handleSort("town")}
            >
              <span className="flex items-center gap-1">
                Town {sortBy === "town" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "province",
              })}
              onClick={() => handleSort("province")}
            >
              <span className="flex items-center gap-1">
                Province {sortBy === "province" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "createdAt",
              })}
              onClick={() => handleSort("createdAt")}
            >
              <span className="flex items-center gap-1">
                Date {sortBy === "createdAt" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "status",
              })}
              onClick={() => handleSort("status")}
            >
              <span className="flex items-center gap-1">
                Status {sortBy === "status" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border">
          {paginatedProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.ref}</TableCell>
              <TableCell>
                {property.currency.toUpperCase()}{" "}
                {property.price.toLocaleString()}
              </TableCell>
              <TableCell>{property.town}</TableCell>
              <TableCell>{property.province}</TableCell>
              <TableCell>
                {new Date(property.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn("capitalize", getStatusColor(property.status))}
                >
                  {getStatusIcon(property.status)}
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-x-2">
                <Button
                  // nativeButton={false}
                  render={
                    <Link
                      params={{ agencyId, propertyId: property.id }}
                      to={"/app/$agencyId/property/$propertyId"}
                    >
                      <EyeIcon data-icon="inline-start" /> View
                    </Link>
                  }
                  size="sm"
                  variant="outline"
                ></Button>
                <Button
                  onClick={() => console.log("Edit", property.id)}
                  size="sm"
                  variant="default"
                >
                  <EditIcon data-icon="inline-start" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(property.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2Icon data-icon="inline-start" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <TypographyP className="text-gray-500 text-sm">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, sortedProperties.length)} of{" "}
            {sortedProperties.length} properties
          </TypographyP>
          <div className="flex gap-2">
            <Button
              disabled={currentPage === 1}
              onClick={() =>
                navigate({
                  to: ".",
                  search: {
                    search,
                    type,
                    status,
                    sortBy,
                    sortOrder,
                    page: currentPage - 1,
                  },
                })
              }
              size="sm"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                navigate({
                  to: ".",
                  search: {
                    search,
                    type,
                    status,
                    sortBy,
                    sortOrder,
                    page: currentPage + 1,
                  },
                })
              }
              size="sm"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

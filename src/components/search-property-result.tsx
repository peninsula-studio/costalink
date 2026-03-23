import {
  Link,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  EditIcon,
  EyeIcon,
  SearchXIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { searchPropertyFn } from "@/lib/fn/property";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export function SearchPropertyResult({
  data,
  isLoading,
  className,
  ...props
}: ComponentProps<typeof Table> & {
  data?: Awaited<ReturnType<typeof searchPropertyFn>>;
  isLoading: boolean;
}) {
  const { organizationId } = useParams({
    from: "/app/$organizationId",
  });

  const searchParams = useSearch({
    from: "/app/$organizationId/property/search",
  });

  const navigate = useNavigate();

  const handleSort = (field: string) => {
    const currentSort = searchParams.sortOrder || "desc";
    const newSort =
      searchParams.sortBy === field && currentSort === "desc" ? "asc" : "desc";
    navigate({
      to: ".",
      search: {
        type: searchParams.type,
        sortBy: field as "price" | "createdAt" | "ref",
        sortOrder: newSort,
        page: searchParams.page,
        pageSize: searchParams.pageSize,
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

  if (isLoading)
    return (
      <div className="divide-y divide-border">
        <div className="flex h-12 w-full items-center">
          <Skeleton className="h-5 w-full" />
        </div>

        {[...new Array(searchParams.pageSize)].map((_, i) => (
          <div
            className="flex h-12 w-full items-center"
            key={`filler-row-${i}`}
          >
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-2xs">
      <Table {...props}>
        <TableHeader>
          <TableRow className="*:transition-colors *:hover:bg-accent/80">
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": searchParams.sortBy === "ref",
              })}
              onClick={() => handleSort("ref")}
            >
              <span className="flex items-center gap-1">
                Ref{" "}
                {searchParams.sortBy === "ref" &&
                  arrowDirection(searchParams.sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": searchParams.sortBy === "price",
              })}
              onClick={() => handleSort("price")}
            >
              <span className="flex items-center gap-1">
                Price{" "}
                {searchParams.sortBy === "price" &&
                  arrowDirection(searchParams.sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": searchParams.sortBy === "town",
              })}
              onClick={() => handleSort("town")}
            >
              <span className="flex items-center gap-1">
                Town{" "}
                {searchParams.sortBy === "town" &&
                  arrowDirection(searchParams.sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": searchParams.sortBy === "province",
              })}
              onClick={() => handleSort("province")}
            >
              <span className="flex items-center gap-1">
                Province{" "}
                {searchParams.sortBy === "province" &&
                  arrowDirection(searchParams.sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": searchParams.sortBy === "createdAt",
              })}
              onClick={() => handleSort("createdAt")}
            >
              <span className="flex items-center gap-1">
                Date{" "}
                {searchParams.sortBy === "createdAt" &&
                  arrowDirection(searchParams.sortOrder)}
              </span>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {data && data.result.length > 0 ? (
          <TableBody className="relative divide-y divide-border">
            {data.result.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.ref}</TableCell>
                <TableCell>
                  {property.currency.toUpperCase()}{" "}
                  {property.price.toLocaleString()}
                </TableCell>
                <TableCell>{property.town}</TableCell>
                <TableCell>{property.province}</TableCell>
                <TableCell>{property.province}</TableCell>
                <TableCell className="flex gap-x-2">
                  <Button
                    nativeButton={false}
                    render={
                      <Link
                        params={{
                          organizationId: organizationId,
                          propertyId: property.id,
                        }}
                        to={"/app/$organizationId/property/$propertyId"}
                      >
                        <EyeIcon data-icon="inline-start" /> View
                      </Link>
                    }
                    size="sm"
                    variant="outline"
                  ></Button>
                  {property.organizationId === organizationId && (
                    <Button
                      nativeButton={false}
                      render={
                        <Link
                          params={{
                            organizationId: organizationId,
                            propertyId: property.id,
                          }}
                          to={"/app/$organizationId/property/$propertyId"}
                        >
                          <EditIcon data-icon="inline-start" /> Edit
                        </Link>
                      }
                      size="sm"
                      variant="default"
                    ></Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody className="relative w-full flex-1 divide-y divide-border/70">
            {[...new Array(searchParams.pageSize)].map((_, i) => (
              <TableRow key={`filler-row-${i}`}>
                <TableCell className="h-12"></TableCell>
              </TableRow>
            ))}
            <TableRow className="absolute inset-0 flex items-center justify-center">
              <TableCell>
                <Empty className="size-fit flex-none bg-muted">
                  <EmptyHeader>
                    <EmptyMedia className="bg-background" variant="icon">
                      <SearchXIcon />
                    </EmptyMedia>
                  </EmptyHeader>
                  <EmptyContent className="min-w-fit">
                    <EmptyTitle>No results</EmptyTitle>
                    <EmptyDescription>
                      No properties matching the search
                    </EmptyDescription>
                  </EmptyContent>
                </Empty>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={searchParams.page <= 1}
              // @ts-expect-error: BUG: search types don't match
              search={(s) => ({ ...s, page: s.page - 1 })}
              to="."
            />
          </PaginationItem>
          {data?.count && (
            <>
              {[
                ...new Array(Math.ceil(data.count / searchParams.pageSize)),
              ].map((_, i) => (
                <PaginationItem key={`page-link-${i + 1}`}>
                  <PaginationLink
                    isActive={searchParams.page === i + 1}
                    // @ts-expect-error: BUG: search types don't match
                    search={(s) => ({ ...s, page: i + 1 })}
                    to="."
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* <PaginationEllipsis /> */}
            </>
          )}
          <PaginationItem>
            <PaginationNext
              // className="aria-disabled:pointer-events-none"
              disabled={
                searchParams.page >=
                Math.ceil(Number(data?.count) / searchParams.pageSize)
              }
              // @ts-expect-error: BUG: search types don't match
              search={(s) => ({ ...s, page: s.page + 1 })}
              to="."
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

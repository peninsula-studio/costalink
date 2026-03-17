import { Link, useParams } from "@tanstack/react-router";
import { EditIcon, EyeIcon, SearchXIcon } from "lucide-react";
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
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { searchPropertyFn } from "@/lib/fn/property";
import { cn } from "@/lib/utils";

export function PropertySearchResultTableBody({
  data,
  className,
  ...props
}: ComponentProps<typeof TableBody> & {
  data: Awaited<ReturnType<typeof searchPropertyFn>>;
}) {
  const { organizationId } = useParams({
    from: "/app/$organizationId",
  });

  return (
    <TableBody
      className={cn("relative divide-y divide-border", className)}
      {...props}
    >
      {data && data.length > 0 ? (
        data.map((property) => (
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
        ))
      ) : (
        <TableRow className="relative h-40 w-full">
          <Empty className="absolute inset-0 size-full bg-muted">
            <EmptyHeader>
              <EmptyMedia className="bg-background" variant="icon">
                <SearchXIcon />
              </EmptyMedia>
              <EmptyTitle>No results</EmptyTitle>
            </EmptyHeader>
            <EmptyContent>
              <EmptyDescription>
                No properties matching the search
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        </TableRow>
      )}
    </TableBody>
  );
}

import { Skeleton } from "@repo/ui/components/skeleton";

export function RouteSkeleton() {
  return (
    <div className="flex flex-col gap-y-md p-md">
      <Skeleton className="h-12 w-60" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

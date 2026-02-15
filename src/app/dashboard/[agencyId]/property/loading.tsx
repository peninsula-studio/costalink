import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <Skeleton className="h-12 w-full max-w-md" />
      <Skeleton className="h-12 w-full max-w-md" />
    </>
  );
}

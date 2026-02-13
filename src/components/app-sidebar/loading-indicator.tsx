import { useIsFetching } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export function LoadingIndicator() {
  const isFetching = useIsFetching();
  return (
    <div
      className={cn(
        "absolute inset-0 top-full h-1 w-full bg-primary opacity-0 duration-750",
        // [isFetching > 0 ? "animate-in opacity-1 slide-in-from-left" : "animate-out fade-out-0"]
      )}
    ></div>
  );
}

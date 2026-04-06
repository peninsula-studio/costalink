import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // INFO: Default stale time for queries
      refetchOnWindowFocus: false, // INFO: Disable refetching on window focus to avoid unexpected loaders
    },
  },
});

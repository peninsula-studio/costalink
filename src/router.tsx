import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { DefaultCatchBoundary } from "./components/default-catch-boundary";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

export interface MyRouterContext {
  queryClient: QueryClient;
  breadcrumbs?: { label: string; href: string }[];
}

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2, // INFO: Default stale time for queries
        refetchOnWindowFocus: false, // INFO: Disable refetching on window focus to avoid unexpected loaders
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: "intent",
    defaultPendingMs: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    // defaultPendingComponent: () => null,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};

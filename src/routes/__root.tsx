import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getThemeServerFn } from "@/lib/fn/theme";
import appCss from "@/styles/globals.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData({
      ...getSessionQueryOptions(),
      revalidateIfStale: true,
    });
    return { session };
  },
  loader: () => getThemeServerFn(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const theme = Route.useLoaderData();
  return (
    <html className={theme} lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers theme={theme}>
          {children}
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

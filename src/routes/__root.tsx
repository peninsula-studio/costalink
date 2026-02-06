import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getThemeServerFn } from "@/lib/fn/theme";
import type { MyRouterContext } from "@/router";
import appCss from "@/styles/globals.css?url";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    context.queryClient.ensureQueryData(getSessionQueryOptions());
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
    return <DefaultCatchBoundary {...props} />;
  },
  notFoundComponent: () => <NotFound />,
  shellComponent: RootComponent,
});

function RootComponent() {
  const theme = Route.useLoaderData();
  return (
    <RootDocument>
      <Providers theme={theme}>
        <Outlet />
      </Providers>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const theme = Route.useLoaderData();
  return (
    <html className={theme} lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH5 } from "@/components/ui/typography";
import { setDefaultOrganizationFn } from "@/lib/fn/user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/account/")({
  component: RouteComponent,
  // loader: async ({ context }) => {
  //   const organizations = await context.queryClient.ensureQueryData(
  //     organizationListQueryOptions(),
  //   );
  //   return { organizations };
  // },
});

function RouteComponent() {
  const router = useRouter();
  const { user, organizationList } = Route.useRouteContext();

  return (
    <div className="flex flex-col gap-6">
      <TypographyH5>Default Organization</TypographyH5>
      <div className="flex flex-wrap gap-4">
        {organizationList.map((org) => (
          <Card
            className={cn("max-w-md", {
              "ring-green-500": user.defaultOrganizationId === org.id,
            })}
            key={org.id}
          >
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <span className="text-xs">{org.id}</span>
              <Button
                disabled={user.defaultOrganizationId === org.id}
                onClick={async () => {
                  await setDefaultOrganizationFn({
                    data: { organizationId: org.id, userId: user.id },
                  });
                  await router.invalidate();
                }}
              >
                {user.defaultOrganizationId === org.id
                  ? "Is default"
                  : "Set default"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

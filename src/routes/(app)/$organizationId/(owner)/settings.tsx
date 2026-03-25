import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/$organizationId/(owner)/settings")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <div>Hello "/$organizationId/(owner)/settings"!</div>;
}

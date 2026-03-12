import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationId/property/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/$organizationId/property/edit"!</div>;
}

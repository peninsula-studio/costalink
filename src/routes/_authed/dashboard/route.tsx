import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <main className="p-6">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </React.Suspense>
    </main>
  );
}

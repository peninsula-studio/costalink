import React from "react";
import { OrganizationTabs } from "@/components/navigators/organization-tabs";
import { TabScreenSkeleton } from "@/components/skeletons/tab-screen-skeleton";

export default function OrganizationLayout() {
  return (
    <React.Suspense fallback={<TabScreenSkeleton />}>
      <OrganizationTabs />
    </React.Suspense>
  );
}

import { organizationKeys } from "@repo/types/queries/organization-keys";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  // Tabs as ExpoTabNavigator,
  Redirect,
  useLocalSearchParams,
} from "expo-router";
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import React, { type ComponentProps } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrganizationTabBar from "@/components/dashboard/organization-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { authClient } from "@/lib/auth-client";

export function OrganizationTabs() {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  const { data: activeOrganization } = useSuspenseQuery({
    queryKey: organizationKeys.setActive({ organizationId }),
    staleTime: 0,
    gcTime: 0,
    queryFn: async () => {
      try {
        const { data, error } = await authClient.organization.setActive({
          organizationId,
        });
        if (error) {
          console.error(error);
          throw new Error(error.message);
        }
        return data;
      } catch (e) {
        console.error(`Error setting organization to ${organizationId}: ${e}`);
        throw e;
      }
    },
  });

  if (!activeOrganization) {
    return <Redirect href={{ pathname: "/(dashboard)" }} />;
  }

  const tabTriggerData: ComponentProps<typeof OrganizationTabBar>["triggerData"] = [
    {
      name: "index",
      href: {
        pathname: "/(dashboard)/[organizationId]",
        params: { organizationId },
      },
      iconName: "LayoutGrid",
    },
    {
      name: "properties",
      href: {
        pathname: "/(dashboard)/[organizationId]/properties",
        params: { organizationId },
      },
      iconName: "Building2",
    },
    {
      name: "search",
      href: {
        pathname: "/(dashboard)/[organizationId]/search",
        params: { organizationId },
      },
      iconName: "Search",
    },
  ];

  return (
    <Tabs>
      <TabList style={{ display: "none" }}>
        {tabTriggerData.map((triggerData, i) => (
          <TabTrigger key={i} {...triggerData}></TabTrigger>
        ))}
      </TabList>

      <OrganizationTabBar triggerData={tabTriggerData} />

      <React.Suspense
        fallback={
          <SafeAreaView style={{ flex: 1, paddingTop: 120 }}>
            <ThemedText>Loading organization Index</ThemedText>
          </SafeAreaView>
        }
      >
        <TabSlot />
      </React.Suspense>
    </Tabs>
  );
}

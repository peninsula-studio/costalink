import { organizationKeys } from "@repo/types/queries/organization-keys";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  Redirect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  TabList,
  TabSlot,
  Tabs,
  TabTrigger,
  type TabTriggerProps,
} from "expo-router/ui";
import React from "react";
import type { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import OrganizationTabBar from "@/components/dashboard/organization-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { authClient } from "@/lib/auth-client";

export default function TabLayout() {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  const insets = useSafeAreaInsets();

  const indicatorRef = React.useRef<View>(null);

  const router = useRouter();
  const navigation = useNavigation();

  const {
    data: activeOrganization,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: organizationKeys.setActive({ organizationId }),
    staleTime: 0,
    gcTime: 0,
    // mutationKey: organizationKeys.setActive({ organizationId }),
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

  if (isPending || isFetching) {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 120 }}>
        <ThemedText>Loading /[organizationId]...</ThemedText>
      </SafeAreaView>
    );
  }

  if (!activeOrganization) {
    return <Redirect href={{ pathname: "/(dashboard)" }} />;
  }

  // return (
  //   <NativeTabs backgroundColor="transparent" blurEffect="light">
  //     <NativeTabs.Trigger name="index">
  //       <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
  //       {/* <NativeTabs.Trigger.Label hidden /> */}
  //       <NativeTabs.Trigger.Icon md="home" sf="person.2.fill" />
  //     </NativeTabs.Trigger>
  //     <NativeTabs.Trigger disableAutomaticContentInsets name="properties">
  //       <NativeTabs.Trigger.Label>Properties</NativeTabs.Trigger.Label>
  //       {/* <NativeTabs.Trigger.Label hidden /> */}
  //       <NativeTabs.Trigger.Icon md="home" sf="building.2.fill" />
  //     </NativeTabs.Trigger>
  //   </NativeTabs>
  // );

  const tabTriggerData: TabTriggerProps[] = [
    {
      name: "index",
      href: {
        pathname: "/(dashboard)/[organizationId]",
        params: { organizationId },
      },
    },
    {
      name: "properties",
      href: {
        pathname: "/(dashboard)/[organizationId]/properties",
        params: { organizationId },
      },
    },
    {
      name: "search",
      href: {
        pathname: "/(dashboard)/[organizationId]/search",
        params: { organizationId },
      },
    },
  ];

  return (
    <Tabs>
      <TabList style={{ display: "none" }}>
        {tabTriggerData.map((triggerData, i) => (
          <TabTrigger key={i} {...triggerData}></TabTrigger>
        ))}
        {/* <TabTrigger */}
        {/*   href={{ */}
        {/*     pathname: "/(dashboard)/[organizationId]", */}
        {/*     params: { organizationId }, */}
        {/*   }} */}
        {/*   name="index" */}
        {/* ></TabTrigger> */}
        {/* <TabTrigger */}
        {/*   href={{ */}
        {/*     pathname: "/(dashboard)/[organizationId]/properties", */}
        {/*     params: { organizationId }, */}
        {/*   }} */}
        {/*   name="properties" */}
        {/* ></TabTrigger> */}
        {/* <TabTrigger */}
        {/*   href={{ */}
        {/*     pathname: "/(dashboard)/[organizationId]/search", */}
        {/*     params: { organizationId }, */}
        {/*   }} */}
        {/*   name="search" */}
        {/* ></TabTrigger> */}
      </TabList>

      <OrganizationTabBar data={tabTriggerData} />

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

import {
  Redirect,
  Stack,
  // Tabs,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { HomeIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DashboardHeader } from "@/components/dashboard-header";
import GradientMaskedBlurHeader from "@/components/gradient-masked-blur-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { Spacing } from "@/constants/theme";
import { authClient } from "@/lib/auth-client";

export default function TabLayout() {
  const { organizationId } = useGlobalSearchParams<{
    organizationId: string;
  }>();

  const insets = useSafeAreaInsets();

  if (!organizationId) {
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

  return (
    <Tabs>
      <TabList asChild>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: Spacing.md,
            paddingHorizontal: Spacing.md,
            justifyContent: "center",
            gap: Spacing.xxs,
            zIndex: 100,
          }}
        >
          <GradientMaskedBlurHeader
            style={{
              transform: [{ rotate: "180deg" }],
              bottom: 0,
              height: insets.bottom + 50,
              top: "auto",
            }}
          />
          <TabTrigger
            asChild
            href={{
              pathname: "/(dashboard)/[organizationId]",
              params: { organizationId },
            }}
            name="index"
          >
            <ThemedButton raised size="sm" variant="glass">
              <ThemedIcon name="House" size={30} />
            </ThemedButton>
          </TabTrigger>
          <TabTrigger
            asChild
            href={{
              pathname: "/(dashboard)/[organizationId]/properties",
              params: { organizationId },
            }}
            name="properties"
          >
            <ThemedButton raised size="sm" variant="glass">
              <ThemedIcon name="Building2" size={30} />
            </ThemedButton>
          </TabTrigger>
        </View>
      </TabList>

      <TabSlot />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

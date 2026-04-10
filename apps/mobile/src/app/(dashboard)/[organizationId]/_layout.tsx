import { Redirect, useGlobalSearchParams } from "expo-router";
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
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
      <TabList style={{ display: "none" }}>
        <TabTrigger
          href={{
            pathname: "/(dashboard)/[organizationId]",
            params: { organizationId },
          }}
          name="index"
        ></TabTrigger>
        <TabTrigger
          href={{
            pathname: "/(dashboard)/[organizationId]/properties",
            params: { organizationId },
          }}
          name="properties"
        ></TabTrigger>
      </TabList>

      <View
        style={{
          position: "absolute",
          // bottom: 0,
          bottom: Spacing.md,
          left: Spacing.md,
          right: Spacing.md,
          zIndex: 100,
        }}
      >
        {/* <GradientMaskedBlurHeader */}
        {/*   style={{ */}
        {/*     transform: [{ rotate: "180deg" }], */}
        {/*     bottom: 0, */}
        {/*     height: insets.bottom + 50, */}
        {/*     top: "auto", */}
        {/*   }} */}
        {/* /> */}
        <View
          style={{
            padding: 3,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.3)",
            boxShadow: "0 0 20px 0 rgba(0,0,0,0.04)",
            marginHorizontal: "auto",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginHorizontal: "auto",
              // width: "min-content",
              gap: Spacing.xxs,
              backgroundColor: "white",
              borderRadius: 999,
            }}
          >
            <TabTrigger
              asChild
              href={{
                pathname: "/(dashboard)/[organizationId]",
                params: { organizationId },
              }}
              name="index"
            >
              <ThemedButton variant="none">
                <ThemedIcon
                  fill="rgba(55,20,250,0.3)"
                  fillRule="nonzero"
                  name="House"
                  size={26}
                  strokeWidth={1.2}
                />
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
              <ThemedButton variant="none">
                <ThemedIcon name="Building2" size={26} strokeWidth={1.2} />
              </ThemedButton>
            </TabTrigger>
          </View>
        </View>
      </View>

      <TabSlot />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

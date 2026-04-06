import { DrawerToggleButton } from "@react-navigation/drawer";
import { Link, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientMaskedBlurHeader from "@/components/gradient-masked-blur-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { Spacing } from "@/constants/theme";
import { authClient } from "@/lib/auth-client";

export function DashboardHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: insets.top,
        zIndex: 100,
      }}
    >
      <GradientMaskedBlurHeader />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          // paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <ThemedText>Header</ThemedText> */}
        <Link asChild href={{ pathname: "/(dashboard)/user" }}>
          <ThemedButton raised size="smIcon" variant="glass">
            <ThemedIcon name="Lock" themeColor="text" />
          </ThemedButton>
        </Link>
        <ThemedButton raised size="smIcon" variant="glass">
          <ThemedIcon name="Settings" size={24} themeColor="text" />
        </ThemedButton>
      </View>
    </View>
  );
}

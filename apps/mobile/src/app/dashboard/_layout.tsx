import { Stack } from "expo-router";
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientMaskedBlurHeader from "@/components/gradient-masked-blur-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedSymbolView } from "@/components/ui/themed-symbol-view";
import { Spacing } from "@/constants/theme";
import { authClient } from "@/lib/auth-client";

export default function TabLayout() {
  const { data: session } = authClient.useSession();

  const insets = useSafeAreaInsets();

  return (
    <Stack.Screen>
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
              justifyContent: "flex-start",
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
            <TabTrigger asChild href="/dashboard" name="home">
              <ThemedButton raised size="sm" variant="glass">
                <ThemedSymbolView name="house" size={30} />
              </ThemedButton>
            </TabTrigger>
            <TabTrigger
              asChild
              href="/dashboard/organization"
              name="organization"
            >
              <ThemedButton raised size="sm" variant="glass">
                <ThemedSymbolView name="house" size={30} />
              </ThemedButton>
            </TabTrigger>
          </View>
        </TabList>

        <View style={{ position: "relative", flex: 1 }}>
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
              <ThemedText>Header</ThemedText>
              <ThemedButton raised size="smIcon" variant="glass">
                <ThemedSymbolView name="gear" size={24} themeColor="text" />
              </ThemedButton>
            </View>
          </View>

          <TabSlot />
        </View>
      </Tabs>
    </Stack.Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

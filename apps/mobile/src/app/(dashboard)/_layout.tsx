import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DashboardStack } from "@/components/navigators/dashboard-stack";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";

export default function DashboardLayout() {
  return (
    <React.Suspense
      fallback={
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 100,
            paddingHorizontal: Spacing.md,
          }}
        >
          <ThemedText>Loading (dashboard)/_layout...</ThemedText>
        </SafeAreaView>
      }
    >
      <DashboardStack />
    </React.Suspense>
  );
}

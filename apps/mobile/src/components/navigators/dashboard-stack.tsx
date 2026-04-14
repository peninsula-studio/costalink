import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authClient } from "@/lib/auth-client";
import { getSessionQueryOptions } from "@/lib/queries/auth";

SplashScreen.preventAutoHideAsync();

export function DashboardStack() {
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());

  const colorScheme = useColorScheme();

  // React.useEffect(() => {
  //   if (!isPending) {
  //     SplashScreen.hide();
  //   }
  // }, [isPending]);

  return (
    <Stack
      screenOptions={{
        header: () => <DashboardHeader />,
      }}
    >
      {/* <Stack.Protected guard={!!session}> */}
      <Stack.Screen name="index" options={{ animation: "none" }} />
      <Stack.Screen name="[organizationId]" options={{ animation: "none" }} />
      <Stack.Screen
        name="modal"
        options={{
          headerShown: false,
          // sheetAllowedDetents: [0.65, 1],
          // sheetAllowedDetents: "fitToContents",
          // animation: "ios_from_right",
          // contentStyle: { flex: 1, backgroundColor: Colors.light.background },
          presentation: "pageSheet",
          sheetGrabberVisible: true,
          animationTypeForReplace: "push",
        }}
      />
      {/* </Stack.Protected> */}
    </Stack>
  );
}

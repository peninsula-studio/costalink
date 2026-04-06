import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Slot, Stack, Tabs, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { View } from "react-native";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { AuthProvider } from "@/components/auth-provider";
import { DashboardHeader } from "@/components/dashboard-header";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/queries/query-client";

SplashScreen.preventAutoHideAsync();

export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  const { data: session, isPending } = authClient.useSession();

  React.useEffect(() => {
    if (!isPending) {
      SplashScreen.hide();
    }
  }, [isPending]);

  // return (
  //   <Stack
  //     // screenLayout={({ children }) => (
  //     //   <View style={{ flex: 1 }}>{children}</View>
  //     // )}
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     <Stack.Screen name="(tabs)" />
  //     <Stack.Screen name="user" options={{ presentation: "modal" }} />
  //   </Stack>
  // );

  // return (
  //   <View style={{ flex: 1 }}>
  //     <DashboardHeader />
  //     <Slot />
  //   </View>
  // );

  return (
    <React.Suspense fallback={<ThemedText>Loading...</ThemedText>}>
      <Stack
        screenOptions={{
          header: () => <DashboardHeader />,
        }}
      >
        {/* <Stack.Protected guard={!!session}> */}
        <Stack.Screen name="index" options={{ animation: "none" }} />
        <Stack.Screen name="[organizationId]" options={{ animation: "fade" }} />
        <Stack.Screen
          name="user"
          options={{
            headerShown: false,
            sheetAllowedDetents: [0.65, 1],
            contentStyle: { flex: 1, backgroundColor: Colors.light.background },
            presentation: "formSheet",
            sheetGrabberVisible: true,
          }}
        />
        {/* </Stack.Protected> */}
      </Stack>
    </React.Suspense>
  );
}

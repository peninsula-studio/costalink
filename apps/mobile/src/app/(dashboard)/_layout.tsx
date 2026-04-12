import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { ThemedText } from "@/components/themed-text";
import { UserModalProvider } from "@/components/user-options-modal/context";
import { Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authClient } from "@/lib/auth-client";
import { getSessionQueryOptions } from "@/lib/queries/auth";

SplashScreen.preventAutoHideAsync();

export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  // const { data: session, isPending } = authClient.useSession();
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());

  // React.useEffect(() => {
  //   if (!isPending) {
  //     SplashScreen.hide();
  //   }
  // }, [isPending]);

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

  // if (isPending)
  //   return (
  //     <SafeAreaView
  //       style={{ flex: 1, paddingTop: 100, paddingHorizontal: Spacing.md }}
  //     >
  //       <ThemedText>Loading (dashboard)/_layout...</ThemedText>
  //     </SafeAreaView>
  //   );

  return (
    <React.Suspense
      fallback={
        <SafeAreaView
          style={{ flex: 1, paddingTop: 100, paddingHorizontal: Spacing.md }}
        >
          <ThemedText>Loading (dashboard)/_layout...</ThemedText>
        </SafeAreaView>
      }
    >
      <UserModalProvider>
        <Stack
          screenOptions={{
            header: () => <DashboardHeader />,
          }}
        >
          {/* <Stack.Protected guard={!!session}> */}
          <Stack.Screen name="index" options={{ animation: "none" }} />
          <Stack.Screen
            name="[organizationId]"
            options={{ animation: "none" }}
          />
          {/* <Stack.Screen */}
          {/*   name="user" */}
          {/*   options={{ */}
          {/*     headerShown: false, */}
          {/*     sheetAllowedDetents: [0.65, 1], */}
          {/*     // contentStyle: { flex: 1, backgroundColor: Colors.light.background }, */}
          {/*     presentation: "pageSheet", */}
          {/*     sheetGrabberVisible: true, */}
          {/*   }} */}
          {/* /> */}
          {/* </Stack.Protected> */}
        </Stack>
      </UserModalProvider>
    </React.Suspense>
  );
}

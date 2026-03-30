import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { AuthProvider } from "@/components/auth-provider";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/query-client";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { data: session, isPending } = authClient.useSession();

  React.useEffect(() => {
    if (!isPending) {
      SplashScreen.hide();
    }
  }, [isPending]);

  SplashScreen.preventAutoHideAsync();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen.BackButton hidden />
            <Stack.Header hidden />
            <Stack.Protected guard={session !== null}>
              {/* <Stack.Screen name="index" /> */}
              <Stack.Screen name="(protected)" />
            </Stack.Protected>
            <Stack.Screen name="sign-in" />
          </Stack>
          {/* <AnimatedSplashOverlay /> */}
          {/* <Slot /> */}
          {/* <AppTabs /> */}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

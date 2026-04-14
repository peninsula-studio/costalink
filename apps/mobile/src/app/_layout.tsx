import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { AuthProvider } from "@/components/auth-provider";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/queries/query-client";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { data: session, isPending } = authClient.useSession();

  React.useEffect(() => {
    if (!isPending) {
      SplashScreen.hide();
    }
  }, [isPending]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <React.Suspense
            fallback={
              <SafeAreaView
                style={{
                  flex: 1,
                  paddingTop: 100,
                  paddingHorizontal: Spacing.md,
                }}
              >
                <ThemedText>Loading app/_layout...</ThemedText>
              </SafeAreaView>
            }
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Protected guard={!session}>
                {/* <Stack.Screen name="index" /> */}
                <Stack.Screen name="(auth)" />
              </Stack.Protected>
              <Stack.Protected guard={!!session}>
                <Stack.Screen
                  name="(dashboard)"
                  options={{ animation: "none" }}
                />
                {/* <Stack.Screen name="explore" options={{ headerShown: true }} /> */}
              </Stack.Protected>
            </Stack>
            {/* <Slot /> */}
          </React.Suspense>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { View } from "react-native";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { AuthProvider } from "@/components/auth-provider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/query-client";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
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
          <Stack
            screenLayout={({ children }) => (
              <View style={{ flex: 1 }}>{children}</View>
            )}
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* <Stack.Header /> */}
            <Stack.Protected guard={!!session}>
              <Stack.Screen
                name="(protected)"
                options={{ headerBackVisible: false }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!session}>
              <Stack.Screen
                name="sign-in"
                options={{ presentation: "pageSheet" }}
              />
            </Stack.Protected>
          </Stack>
          {/* <AnimatedSplashOverlay /> */}
          {/* <Slot /> */}
          {/* <AppTabs /> */}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

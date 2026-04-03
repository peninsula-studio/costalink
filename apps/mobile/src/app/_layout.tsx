import MaskedView from "@react-native-masked-view/masked-view";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { SplashScreen, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { easeGradient } from "react-native-easing-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
// import { AnimatedSplashOverlay } from "@/components/animated-icon";
// import AppTabs from "@/components/app-tabs";
import { AuthProvider } from "@/components/auth-provider";
import GradientMaskedBlurHeader from "@/components/gradient-masked-blur-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { Header, Spacing } from "@/constants/theme";
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

import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { View } from "react-native";
import { AuthProvider } from "@/components/auth-provider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authClient } from "@/lib/auth-client";

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Protected guard={!session}> */}
      <Stack.Screen
        name="index"
        options={{
          presentation: "pageSheet",
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "pageSheet",
        }}
      />
      {/* </Stack.Protected> */}
    </Stack>
  );
}

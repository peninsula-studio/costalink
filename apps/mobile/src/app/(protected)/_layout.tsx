import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { authClient } from "@/lib/auth-client";

export default function TabLayout() {
  const { data: session } = authClient.useSession();

  return (
    <ThemedView style={styles.container}>
      <Stack>
        <Stack.Screen.BackButton hidden />
        <Stack.Header hidden />
      </Stack>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

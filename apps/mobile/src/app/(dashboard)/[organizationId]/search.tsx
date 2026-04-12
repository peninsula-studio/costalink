import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Insets, MaxContentWidth, Spacing } from "@/constants/theme";

export default function SearchPage() {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
        <ThemedText>Search page!</ThemedText>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  safeArea: {
    flex: 1,
    paddingTop: Insets.top,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xxxl,
    // alignItems: "center",
    width: "100%",
    maxWidth: MaxContentWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardGrid: {
    // flex: 1,
    width: "100%",
    // minWidth: "100%",
    // display: "flex",
    // flexDirection: "column",
    // gap: Spacing.sm,
    maxWidth: MaxContentWidth,
    paddingTop: Insets.top,
    paddingBottom: Insets.bottom,
    paddingHorizontal: Spacing.md,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});

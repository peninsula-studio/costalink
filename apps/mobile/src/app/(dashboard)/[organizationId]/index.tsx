import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Insets, MaxContentWidth, Spacing } from "@/constants/theme";
import { getFullOrganizationQueryOptions } from "@/lib/queries/organization";

export default function Page() {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  const { data: fullOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId }),
  );

  return (
    <ScrollView
    // automaticallyAdjustContentInsets={true}
    // contentContainerStyle={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ThemedText>{fullOrganization.name}</ThemedText>
        <ThemedText>{fullOrganization.id}</ThemedText>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    paddingTop: Insets.top,
    maxWidth: MaxContentWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardGrid: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
    overflow: "visible",
    // minWidth: "100%",
    // display: "flex",
    // flexDirection: "column",
    gap: Spacing.sm,
    maxWidth: MaxContentWidth,
    // paddingVertical: Spacing.lg,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});

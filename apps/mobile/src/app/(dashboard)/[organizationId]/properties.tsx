import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrganizationProperiesList } from "@/components/organization-properties-list";
import { Insets, MaxContentWidth, Spacing } from "@/constants/theme";

export default function Page() {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <React.Suspense
          fallback={
            <SafeAreaView style={{ paddingTop: Insets.top }}>
              <Text>Loading...</Text>
            </SafeAreaView>
          }
        >
          <OrganizationProperiesList organizationId={organizationId} />
        </React.Suspense>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  listContainer: {
    flex: 1,
    // paddingTop: Insets.top,
    // paddingHorizontal: Spacing.md,
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
    // paddingBottom: Insets.bottom,
    paddingHorizontal: Spacing.md,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});

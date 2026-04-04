import { getFullOrganizationQueryOptions } from "@repo/types/queries/organization";
import type { organizationSelectSchema } from "@repo/types/schemas/organization";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";
import type { z } from "zod";
import { ThemedText } from "@/components/themed-text";
import { Colors, Radius, Spacing } from "@/constants/theme";

export function OrganizationPreview(
  props: z.infer<typeof organizationSelectSchema>,
) {
  const { data: organization } = useSuspenseQuery(
    getFullOrganizationQueryOptions(props),
  );

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">{organization.name}</ThemedText>
      <ThemedText type="small">{organization.id}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: Spacing.sm,
    gap: Spacing.xs,
    borderRadius: Radius.sm,
  },
});

export function OrganizationPreviewSkeleton() {
  return (
    <View style={skeletonStyles.skeletonContainer}>
      <View style={{ flexDirection: "row", gap: Spacing.xs }}>
        <View
          style={{
            borderRadius: 999,
            height: 20,
            width: 20,
            backgroundColor: "#afafaf",
          }}
        ></View>
        <View
          style={{ borderRadius: 999, flex: 1, backgroundColor: "#afafaf" }}
        ></View>
      </View>
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  skeletonContainer: {
    minHeight: 130,
    position: "relative",
    flex: 1,
    padding: Spacing.sm,
    backgroundColor: "#dfdfdf",
    borderRadius: Radius.sm,
  },
});

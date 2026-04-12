import type { organizationSelectSchema } from "@repo/types/schemas/organization";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import type { z } from "zod";
import { ThemedText } from "@/components/themed-text";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { getFullOrganizationQueryOptions } from "@/lib/queries/organization";

export function OrganizationPreview({
  style,
  organizationId,
  organizationSlug,
  ...props
}: z.infer<typeof organizationSelectSchema> & ViewProps) {
  const { data: organization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId, organizationSlug }),
  );

  return (
    <View style={[styles.container, style]} {...props}>
      <ThemedText type="subtitle">{organization.name}</ThemedText>
      <ThemedText type="small">{organization.id}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: Spacing.sm,
    gap: Spacing.xs,
    borderRadius: Radius.sm,
  },
});

export function OrganizationPreviewSkeleton({ style, ...props }: ViewProps) {
  return (
    <View style={[skeletonStyles.skeletonContainer, style]} {...props}>
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
    height: 130,
    position: "relative",
    // flex: 1,
    padding: Spacing.sm,
    backgroundColor: "#dfdfdf",
    borderRadius: Radius.sm,
  },
});

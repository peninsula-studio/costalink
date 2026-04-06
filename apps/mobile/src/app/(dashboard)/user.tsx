import { useSuspenseQuery } from "@tanstack/react-query";
import { Color, Link, Stack, useNavigation, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  OrganizationPreview,
  OrganizationPreviewSkeleton,
} from "@/components/organization-preview";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedSymbolView } from "@/components/ui/themed-symbol-view";
import { Colors, Header, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { authClient } from "@/lib/auth-client";
import { getListOrganizationsQueryOptions } from "@/lib/queries/organization";

export default function DashboardIndex() {
  const theme = useTheme();

  const router = useRouter();

  const { data: organizationList } = useSuspenseQuery(
    getListOrganizationsQueryOptions(),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View />
        <ThemedText style={{ flex: 1, textAlign: "center" }} type="subtitle">
          Account & settings
        </ThemedText>
        <Link href={{ pathname: "../" }}>
          <ThemedSymbolView name="xmark" size={16} themeColor="text" />
        </Link>
      </View>
      <React.Suspense
        fallback={
          <>
            <OrganizationPreviewSkeleton />
            <OrganizationPreviewSkeleton />
            <OrganizationPreviewSkeleton />
          </>
        }
      >
        {organizationList.map((o) => (
          <Pressable
            // href={{
            //   pathname: "/(dashboard)/[organizationId]",
            //   params: { organizationId: o.id },
            // }}
            key={o.id}
            onPress={() => {
              router.dismissTo({
                pathname: "/(dashboard)/[organizationId]",
                params: { organizationId: o.id },
              });
            }}
          >
            <OrganizationPreview
              organizationId={o.id}
              organizationSlug={o.slug}
            />
          </Pressable>
        ))}
      </React.Suspense>

      <ThemedButton
        onPress={async () => {
          await authClient.signOut();
        }}
        variant="destructive"
      >
        <SymbolView
          name={"door.right.hand.open"}
          size={14}
          tintColor={theme.destructiveForeground}
          weight="bold"
        />
        <ThemedText themeColor="destructiveForeground">Sign out</ThemedText>
      </ThemedButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
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

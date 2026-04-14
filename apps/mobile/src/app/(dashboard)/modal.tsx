import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  OrganizationPreview,
  OrganizationPreviewSkeleton,
} from "@/components/organization-preview";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { Insets, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { authClient } from "@/lib/auth-client";
import { getListOrganizationsQueryOptions } from "@/lib/queries/organization";

export default function SearchPage() {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  const theme = useTheme();

  const router = useRouter();

  const { data: organizationList } = useSuspenseQuery(
    getListOrganizationsQueryOptions(),
  );

  return (
    <Stack.Screen
      options={{
        headerShown: false,
        // sheetAllowedDetents: [0.65, 1],
        // sheetAllowedDetents: "fitToContents",
        // animation: "ios_from_right",
        // contentStyle: { flex: 1, backgroundColor: Colors.light.background },
        presentation: "pageSheet",
        sheetGrabberVisible: true,
        animationTypeForReplace: "push",
      }}
    >
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <React.Suspense
            fallback={
              <>
                <OrganizationPreviewSkeleton style={{ width: "100%" }} />
                <OrganizationPreviewSkeleton style={{ width: "100%" }} />
                <OrganizationPreviewSkeleton style={{ width: "100%" }} />
              </>
            }
          >
            {organizationList.map((o) => (
              <Pressable
                key={o.id}
                onPress={() => {
                  router.dismissTo({
                    pathname: "/(dashboard)/[organizationId]",
                    params: { organizationId: o.id },
                  });
                }}
                style={{ width: "100%" }}
              >
                <OrganizationPreview
                  organizationId={o.id}
                  style={{ width: "100%" }}
                  // organizationSlug={o.slug}
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
            <ThemedIcon
              name="LogOut"
              // size={14}
              themeColor="destructiveForeground"
            />
            <ThemedText themeColor="destructiveForeground">Sign out</ThemedText>
          </ThemedButton>
        </SafeAreaView>
      </ScrollView>
    </Stack.Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  safeArea: {
    flex: 1,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
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

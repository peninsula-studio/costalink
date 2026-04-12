import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  Modal,
  type ModalProps,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  OrganizationPreview,
  OrganizationPreviewSkeleton,
} from "@/components/organization-preview";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { authClient } from "@/lib/auth-client";
import { getListOrganizationsQueryOptions } from "@/lib/queries/organization";
import { useUserModalContext } from "./context";

export function UserOptionsModal({ visible, ...props }: ModalProps) {
  const theme = useTheme();

  const router = useRouter();

  const { setIsUserModalVisible } = useUserModalContext();

  const { data: organizationList } = useSuspenseQuery(
    getListOrganizationsQueryOptions(),
  );

  return (
    <Modal
      allowSwipeDismissal={true}
      animationType="slide"
      onRequestClose={() => setIsUserModalVisible(false)}
      presentationStyle="pageSheet"
      visible={visible}
      {...props}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View></View>
          <ThemedText style={{ flex: 1, textAlign: "center" }} type="subtitle">
            Account & settings
          </ThemedText>
          <Pressable
            onPress={() => {
              setIsUserModalVisible(false);
            }}
          >
            <ThemedIcon name="CircleX" size={16} themeColor="text" />
          </Pressable>
        </View>

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
                setIsUserModalVisible(false);
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
          <SymbolView
            name={"door.right.hand.open"}
            size={14}
            tintColor={theme.destructiveForeground}
            weight="bold"
          />
          <ThemedText themeColor="destructiveForeground">Sign out</ThemedText>
        </ThemedButton>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

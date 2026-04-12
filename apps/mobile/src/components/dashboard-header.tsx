import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientMaskedBlurHeader from "@/components/gradient-masked-blur-header";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { UserOptionsModal } from "@/components/user-options-modal";
import {
  UserModalProvider,
  useUserModalContext,
} from "@/components/user-options-modal/context";
import { Spacing } from "@/constants/theme";

export function DashboardHeader() {
  const insets = useSafeAreaInsets();

  const ref = React.useRef(null);

  const { isUserModalVisible, setIsUserModalVisible } = useUserModalContext();

  return (
    <View
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: insets.top,
        zIndex: 100,
      }}
    >
      <GradientMaskedBlurHeader blurTarget={ref} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          // paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <ThemedText>Header</ThemedText> */}

        <ThemedButton
          onPress={() => {
            setIsUserModalVisible(true);
          }}
          raised
          size="smIcon"
          variant="glass"
        >
          <ThemedIcon name="Lock" themeColor="text" />
        </ThemedButton>

        <ThemedButton raised size="mdIcon" variant="glass">
          <ThemedIcon name="Settings" themeColor="text" />
        </ThemedButton>
      </View>

      <UserOptionsModal
        style={{ maxHeight: 300, backgroundColor: "red" }}
        visible={isUserModalVisible}
      />
    </View>
  );
}

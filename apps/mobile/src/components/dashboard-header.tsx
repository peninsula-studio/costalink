import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientMaskedBlurHeader from "@/components/gradient-masked-blur-header";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { Spacing } from "@/constants/theme";

export function DashboardHeader() {
  const router = useRouter();

  const ref = React.useRef(null);

  return (
    <SafeAreaView
      // ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <GradientMaskedBlurHeader
      // blurTarget={ref}
      />
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
            // setIsUserModalVisible(true);
            router.navigate({ pathname: "/(dashboard)/modal" });
          }}
          raised
          size="mdIcon"
          variant="glass"
        >
          <ThemedIcon name="CircleUser" themeColor="text" />
        </ThemedButton>

        <ThemedButton raised size="mdIcon" variant="glass">
          <ThemedIcon name="Settings" themeColor="text" />
        </ThemedButton>
      </View>
    </SafeAreaView>
  );
}

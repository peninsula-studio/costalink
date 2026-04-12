import { Redirect, useLocalSearchParams } from "expo-router";
import { TabTrigger, type TabTriggerProps } from "expo-router/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnUI } from "react-native-worklets";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedIcon } from "@/components/ui/themed-symbol-view";
import { Colors, Spacing, Springs } from "@/constants/theme";

export default function OrganizationTabBar({
  data,
}: {
  data: TabTriggerProps[];
}) {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  const indicatorRef = React.useRef<View>(null);
  const triggerContainerRef = useAnimatedRef();
  const buttonRef = React.useRef<View>(null);

  const indicatorOffset = useSharedValue(0);

  const handlePress = (pos: number) => {
    scheduleOnUI(() => {
      // const measurement = measure(triggerContainerRef);
      // const kek = pathname.split("/")[2];
      // if (measurement === null) return;
      // indicatorOffset.set((measurement?.width / data.length) * pos || 0);
      indicatorOffset.set(pos);
      // console.log(measurement);
    });
  };

  const indicatorStyles = useAnimatedStyle(() => {
    "worklet";
    return {
      // left: withSpring(offset.value + getActivePath(pathname) * 72),
      transform: [
        {
          // translateX: withSpring(indicatorOffset.value * 63, Springs.fast),
          translateX: withSpring(indicatorOffset.value, Springs.fast),
        },
      ],
    };
  });

  if (!organizationId) {
    return <Redirect href={{ pathname: "/(dashboard)" }} />;
  }

  return (
    <View
      style={{
        position: "absolute",
        // bottom: 0,
        bottom: Spacing.md,
        left: Spacing.md,
        right: Spacing.md,
        zIndex: 100,
      }}
    >
      {/* <GradientMaskedBlurHeader */}
      {/*   style={{ */}
      {/*     transform: [{ rotate: "180deg" }], */}
      {/*     bottom: 0, */}
      {/*     height: insets.bottom + 50, */}
      {/*     top: "auto", */}
      {/*   }} */}
      {/* /> */}
      <View style={styles.outerContainer}>
        <Animated.View
          ref={triggerContainerRef}
          style={styles.triggerContainer}
        >
          <Animated.View
            ref={indicatorRef}
            style={[styles.animatedIndicator, indicatorStyles]}
          ></Animated.View>

          {data.map((triggerProps, i) => (
            <TabTrigger asChild key={i} {...triggerProps}>
              <ThemedButton
                onPress={({ currentTarget: t }) =>
                  handlePress(
                    t.getBoundingClientRect().x -
                      (t.parentElement?.getBoundingClientRect().x || 0),
                  )
                }
                ref={buttonRef}
                style={styles.triggerButton}
                variant="none"
              >
                <ThemedIcon name="LayoutGrid" />
                {/* <View style={styles.buttonBgPlaceholder} /> */}
              </ThemedButton>
            </TabTrigger>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    padding: 3,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    boxShadow: "0 0 20px 0 rgba(0,0,0,0.04)",
    marginHorizontal: "auto",
    justifyContent: "center",
  },
  triggerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    gap: Spacing.xxs,
    // backgroundColor: Colors.light.backgroundElement,
    // backgroundColor: Colors.light.background,
    backgroundColor: "white",
    borderRadius: 999,
  },
  animatedIndicator: {
    backgroundColor: Colors.light.backgroundSelected,
    // backgroundColor: "rgb(0,90,255)",
    // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
    height: "100%",
    width: 60,
    position: "absolute",
    left: 0,
    borderRadius: 999,
    zIndex: 0,
  },
  triggerButton: {
    position: "relative",
    // backgroundColor: "rgba(255,0,0,0.4)"
  },
});

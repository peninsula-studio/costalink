import {
  Redirect,
  useLocalSearchParams,
  usePathname,
  useSegments,
} from "expo-router";
import { TabTrigger, type TabTriggerProps } from "expo-router/ui";
import type * as icons from "lucide-react-native/icons";
import React, { useEffectEvent } from "react";
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
  triggerData,
}: {
  triggerData: (TabTriggerProps & { iconName: keyof typeof icons })[];
}) {
  const { organizationId } = useLocalSearchParams<{
    organizationId: string;
  }>();

  const pathname = usePathname();
  const segments = useSegments();

  const indicatorRef = React.useRef<View>(null);
  const triggerContainerRef = useAnimatedRef();
  const buttonRef = React.useRef<View>(null);

  const indicatorOffset = useSharedValue(0);

  const moveTabIndicator = useEffectEvent((_p: string) => {
    if (segments[1] !== "[organizationId]") return;
    const tabIndex = segments[2]
      ? triggerData.findIndex((v) => v.name === segments[2])
      : 0;
    const tabOffset =
      (triggerContainerRef?.current?.children?.[
        tabIndex
      ]?.getBoundingClientRect()?.x || 0) -
      (triggerContainerRef.current?.getBoundingClientRect().x || 0);
    scheduleOnUI(() => {
      indicatorOffset.set(tabOffset);
    });
  });

  React.useEffect(() => {
    moveTabIndicator(pathname);
  }, [pathname]);

  const indicatorStyles = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        {
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
        bottom: Spacing.md,
        left: Spacing.md,
        right: Spacing.md,
        zIndex: 100,
      }}
    >
      <View style={styles.outerContainer}>
        <Animated.View
          ref={triggerContainerRef}
          style={styles.triggerContainer}
        >
          {triggerData.map(({ iconName, ...triggerProps }) => (
            <TabTrigger asChild key={`${triggerProps.name}`} {...triggerProps}>
              <ThemedButton
                // onPress={({ currentTarget: t }) =>
                //   handlePress(
                //     t.getBoundingClientRect().x -
                //       (t.parentElement?.getBoundingClientRect().x || 0),
                //   )
                // }
                ref={buttonRef}
                style={styles.triggerButton}
                variant="none"
              >
                <ThemedIcon name={iconName} />
              </ThemedButton>
            </TabTrigger>
          ))}

          <Animated.View
            ref={indicatorRef}
            style={[styles.animatedIndicator, indicatorStyles]}
          ></Animated.View>
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
    zIndex: -1,
  },
  triggerButton: {
    position: "relative",
    // backgroundColor: "rgba(255,0,0,0.4)"
  },
});

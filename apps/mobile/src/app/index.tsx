import MaskedView from "@react-native-masked-view/masked-view";
import { BlurTargetView, BlurView } from "expo-blur";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import type React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  type EntryAnimationsValues,
  type LayoutAnimation,
  type StyleProps,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "@/components/ui/themed-button";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Radius,
  Spacing,
  Spring,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { authClient } from "@/lib/auth-client";

export default function HomeScreen() {
  const theme = useTheme();

  const { data: session } = authClient.useSession();

  const slideInFromBottom = (v: EntryAnimationsValues): LayoutAnimation => {
    "worklet";
    const DELAY = 550;
    const animations: StyleProps = {
      opacity: withDelay(DELAY, withSpring(1, Spring.default)),
      transform: [
        { scale: withDelay(DELAY, withSpring(1, Spring.default)) },
        { translateY: withDelay(DELAY, withSpring(0, Spring.default)) },
      ],
    };
    const initialValues: StyleProps = {
      opacity: 0,
      transform: [{ scale: 0.97 }, { translateY: 40 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  // const target = React.useRef(null);

  const colors: React.ComponentProps<typeof LinearGradient>["colors"] = [
    "rgba(230,200,210,0.2)",
    "rgba(230,210,230,0.3)",
    "rgba(150,160,240,0.65)",
    "rgba(150,160,250,0.7)",
  ];

  const locations: React.ComponentProps<typeof LinearGradient>["locations"] = [
    0, 0.5, 0.75, 1,
  ];

  const bgImage = require("@/assets/images/mobile-hero-image.webp");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen />
      <LinearGradient
        colors={colors}
        locations={locations}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.heroSection}>
        <ThemedText>Something goes here</ThemedText>
        <ThemedText>{session?.user.name || "No session"}</ThemedText>
      </View>

      <Animated.View
        entering={slideInFromBottom}
        style={[styles.animatedBottomSection]}
      >
        <SafeAreaView style={styles.safeAreaBottom}>
          <View style={styles.bottomSection}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("@/assets/images/avatar-1.webp")}
                style={{ ...styles.avatar, marginRight: -12 }}
              />
              <Image
                source={require("@/assets/images/avatar-2.webp")}
                style={{ ...styles.avatar, marginRight: -12 }}
              />
              <Image
                source={require("@/assets/images/avatar-3.webp")}
                style={styles.avatar}
              />
            </View>
            <ThemedText
              lineBreakStrategyIOS="push-out"
              style={{
                textAlign: "left",
                flexShrink: 1,
                color: Colors.light.text,
              }}
              textBreakStrategy="balanced"
              // type="small"
            >
              Join the collaboration platform with 50+ agents and 200+ exclusive
              properties.
            </ThemedText>
          </View>

          <View style={styles.buttonContainer}>
            <Link asChild href={"/sign-in"}>
              <ThemedButton>
                <SymbolView
                  name={"chevron.right"}
                  size={14}
                  tintColor={theme.text}
                  weight="bold"
                />
                <ThemedText>Sign In</ThemedText>
              </ThemedButton>
            </Link>
            <Link asChild href={"/(protected)"}>
              <ThemedButton variant="secondary">
                <SymbolView
                  name={"lock"}
                  size={14}
                  tintColor={theme.text}
                  weight="bold"
                />
                <ThemedText>Protected route</ThemedText>
              </ThemedButton>
            </Link>
          </View>

          {/* <ThemedView style={styles.stepContainer} type="backgroundElement"> */}
          {/*   <HintRow */}
          {/*     hint={<ThemedText type="code">src/app/index.tsx</ThemedText>} */}
          {/*     title="Try editing" */}
          {/*   /> */}
          {/*   <HintRow hint={getDevMenuHint()} title="Dev tools" /> */}
          {/*   <HintRow */}
          {/*     hint={<ThemedText type="code">npm run reset-project</ThemedText>} */}
          {/*     title="Fresh start" */}
          {/*   /> */}
          {/* </ThemedView> */}
        </SafeAreaView>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.6,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  animatedBottomSection: {
    flex: 0.4,
    borderTopRightRadius: Radius.xl,
    transformOrigin: "bottom",
    borderTopLeftRadius: Radius.xl,
    boxShadow: "0px -10px 20px rgba(0,0,0,0.12)",
    backgroundColor: Colors.light.background,
  },
  safeAreaBottom: {
    flex: 1,
    shadowColor: "black",
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    gap: Spacing.md,
    // paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  bottomSection: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingBottom: BottomTabInset + Spacing.md,
    gap: Spacing.md,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: "100%",
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    objectFit: "fill",
  },
  title: {
    textAlign: "center",
    color: "white",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.md,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderRadius: Spacing.lg,
  },
  buttonContainer: {
    width: "100%",
    gap: Spacing.sm,
    alignItems: "stretch",
  },
});

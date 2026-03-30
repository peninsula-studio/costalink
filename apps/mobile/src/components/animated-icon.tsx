import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Colors } from "@/constants/theme";

const INITIAL_SCALE_FACTOR = Dimensions.get("screen").height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: INITIAL_SCALE_FACTOR }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        "worklet";
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.backgroundSolidColor}
    />
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View
        entering={keyframe.duration(DURATION)}
        style={styles.background}
      />
      <Animated.View
        entering={logoKeyframe.duration(DURATION)}
        style={styles.imageContainer}
      >
        <Image
          source={require("@/assets/images/expo-logo.png")}
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    zIndex: 100,
  },
  image: {
    position: "absolute",
    width: 24,
    height: 24,
  },
  background: {
    borderRadius: "20%",
    experimental_backgroundImage: `linear-gradient(180deg, ${Colors.light.primary}, ${Colors.light.primary})`,
    width: 48,
    height: 48,
    position: "absolute",
  },
  backgroundSolidColor: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.light.primary,
    zIndex: 1000,
  },
});

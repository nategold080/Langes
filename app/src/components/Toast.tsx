import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import { useCartStore } from '../store/cartStore';

export function Toast() {
  const toastMessage = useCartStore((s) => s.toastMessage);
  const clearToast = useCartStore((s) => s.clearToast);
  const translateY = useSharedValue(-80);
  const opacity = useSharedValue(0);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (toastMessage) {
      // Clear any existing timer
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }

      // Slide in with spring
      translateY.value = withSpring(0, { damping: 14, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 150 });

      // Auto-dismiss after 2 seconds
      dismissTimer.current = setTimeout(() => {
        translateY.value = withTiming(-80, { duration: 250 });
        opacity.value = withTiming(0, { duration: 250 }, () => {
          runOnJS(clearToast)();
        });
      }, 2000);
    }

    return () => {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, [toastMessage]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!toastMessage) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{toastMessage}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: Colors.deliRed,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});

import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, runOnJS } from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import { useCartStore } from '../store/cartStore';

export function Toast() {
  const toastMessage = useCartStore((s) => s.toastMessage);
  const clearToast = useCartStore((s) => s.clearToast);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (toastMessage) {
      opacity.value = withTiming(1, { duration: 200 });
      opacity.value = withDelay(1500, withTiming(0, { duration: 300 }, () => {
        runOnJS(clearToast)();
      }));
    }
  }, [toastMessage]);

  const animatedStyle = useAnimatedStyle(() => ({
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});

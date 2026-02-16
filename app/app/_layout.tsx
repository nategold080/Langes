import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Toast } from '../src/components/Toast';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { useAppStore } from '../src/store/appStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (!hasOnboarded && segments[0] !== 'onboarding') {
      router.replace('/onboarding');
    }
  }, [hasOnboarded, segments]);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="catering"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="order/[id]"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="privacy"
            options={{ presentation: 'modal', headerShown: false }}
          />
        </Stack>
        <Toast />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

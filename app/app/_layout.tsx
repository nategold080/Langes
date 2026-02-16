import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Toast } from '../src/components/Toast';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after layout is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
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

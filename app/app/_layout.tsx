import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Toast } from '../src/components/Toast';

export default function RootLayout() {
  return (
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
      </Stack>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

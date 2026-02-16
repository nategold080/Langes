import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppStore {
  hasOnboarded: boolean;
  setHasOnboarded: (value: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setHasOnboarded: (value) => set({ hasOnboarded: value }),
    }),
    {
      name: 'langes-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

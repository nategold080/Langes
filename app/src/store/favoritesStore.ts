import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesStore {
  favorites: string[]; // array of menu item IDs
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (itemId) =>
        set((state) => ({
          favorites: state.favorites.includes(itemId)
            ? state.favorites.filter((id) => id !== itemId)
            : [...state.favorites, itemId],
        })),

      isFavorite: (itemId) => get().favorites.includes(itemId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'langes-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

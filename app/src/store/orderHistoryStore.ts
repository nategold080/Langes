import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types';

export interface PastOrder {
  id: string;
  orderNumber: string;
  items: CartItem[];
  note: string;
  timestamp: string;
  itemCount: number;
}

interface OrderHistoryStore {
  orders: PastOrder[];
  addOrder: (order: Omit<PastOrder, 'id' | 'itemCount'>) => void;
  clearHistory: () => void;
  getRecentOrders: (count?: number) => PastOrder[];
}

export const useOrderHistoryStore = create<OrderHistoryStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [
            {
              ...order,
              id: `order-${Date.now()}`,
              itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
            },
            ...state.orders,
          ].slice(0, 50), // Keep last 50 orders
        })),

      clearHistory: () => set({ orders: [] }),

      getRecentOrders: (count = 10) => get().orders.slice(0, count),
    }),
    {
      name: 'langes-order-history',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

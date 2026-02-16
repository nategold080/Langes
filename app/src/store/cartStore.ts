import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, OrderConfirmation } from '../types';
import { useOrderHistoryStore } from './orderHistoryStore';

interface CartStore {
  cart: CartItem[];
  cartNote: string;
  orderConfirmation: OrderConfirmation | null;
  toastMessage: string | null;

  addToCart: (item: { id: string; name: string; description?: string; type: string }) => void;
  removeFromCart: (cartId: number) => void;
  updateQuantity: (cartId: number, quantity: number) => void;
  setCartNote: (note: string) => void;
  clearCart: () => void;
  placeOrder: () => void;
  clearConfirmation: () => void;
  clearToast: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      cartNote: '',
      orderConfirmation: null,
      toastMessage: null,

      addToCart: (item) =>
        set((state) => ({
          cart: [
            ...state.cart,
            {
              cartId: Date.now(),
              id: item.id,
              name: item.name,
              description: item.description,
              quantity: 1,
              type: item.type,
            },
          ],
          toastMessage: 'Added to order',
        })),

      removeFromCart: (cartId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartId !== cartId),
        })),

      updateQuantity: (cartId, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.cartId !== cartId)
              : state.cart.map((item) =>
                  item.cartId === cartId ? { ...item, quantity } : item
                ),
        })),

      setCartNote: (note) => set({ cartNote: note }),

      clearCart: () => set({ cart: [], cartNote: '' }),

      placeOrder: () => {
        const state = get();
        const orderNum =
          'LS-' + String(Math.floor(1000 + Math.random() * 9000));
        const timestamp = new Date().toISOString();
        const orderItems = [...state.cart];
        const orderNote = state.cartNote;

        set({
          orderConfirmation: {
            orderNumber: orderNum,
            items: orderItems,
            note: orderNote,
            timestamp,
          },
          cart: [],
          cartNote: '',
        });

        // Save to order history
        useOrderHistoryStore.getState().addOrder({
          orderNumber: orderNum,
          items: orderItems,
          note: orderNote,
          timestamp,
        });
      },

      clearConfirmation: () => set({ orderConfirmation: null }),
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'langes-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cart: state.cart,
        cartNote: state.cartNote,
      }),
    }
  )
);

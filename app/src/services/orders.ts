import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { CartItem } from '../types';

export interface Order {
  id?: string;
  orderNumber: string;
  userId?: string;
  items: CartItem[];
  note: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

const ordersRef = collection(db, 'orders');

export async function submitOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(ordersRef, {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const docSnap = await getDoc(doc(db, 'orders', orderId));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Order;
  }
  return null;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    ordersRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<void> {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  popular?: boolean;
}

export interface MenuCategory {
  key: string;
  label: string;
  icon: string; // Ionicons name
  data: MenuItem[];
  note?: string;
}

export interface CartItem {
  cartId: number;
  id: string;
  name: string;
  description?: string;
  quantity: number;
  type: string;
}

export interface StoreHoursEntry {
  open: string;
  close: string;
  openMin: number;
  closeMin: number;
}

export interface StoreInfo {
  name: string;
  shortName: string;
  address: string;
  phone: string;
  fax: string;
  text: string;
  website: string;
  instagram: string;
  tagline: string;
  established: number;
}

export interface BuilderState {
  step: number;
  bread: string | null;
  meat: string | null;
  cheese: string | null;
  toppings: string[];
  condiments: string[];
  name: string;
}

export interface BYOOptions {
  bread: string[];
  meat: string[];
  cheese: string[];
  toppings: string[];
  condiments: string[];
}

export interface CateringForm {
  date: string;
  guests: string;
  categories: string[];
  dietary: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  items: CartItem[];
  note: string;
  timestamp: string;
}

export interface KnownForItem {
  name: string;
  category: string;
}

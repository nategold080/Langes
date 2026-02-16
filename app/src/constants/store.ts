import { StoreHoursEntry, StoreInfo, KnownForItem } from '../types';

export const STORE_HOURS: Record<number, StoreHoursEntry> = {
  0: { open: '6:00 AM', close: '3:00 PM', openMin: 360, closeMin: 900 },
  1: { open: '6:00 AM', close: '6:00 PM', openMin: 360, closeMin: 1080 },
  2: { open: '6:00 AM', close: '6:00 PM', openMin: 360, closeMin: 1080 },
  3: { open: '6:00 AM', close: '6:00 PM', openMin: 360, closeMin: 1080 },
  4: { open: '6:00 AM', close: '6:00 PM', openMin: 360, closeMin: 1080 },
  5: { open: '6:00 AM', close: '6:00 PM', openMin: 360, closeMin: 1080 },
  6: { open: '6:00 AM', close: '6:00 PM', openMin: 360, closeMin: 1080 },
};

export const STORE_INFO: StoreInfo = {
  name: "Lange's Little Store & Delicatessen",
  shortName: "Lange's",
  address: '382 King Street, Chappaqua, NY 10514',
  phone: '(914) 238-3553',
  fax: '(914) 238-1321',
  text: '(914) 380-3532',
  website: 'langeslittlestore.com',
  instagram: '@langes10514',
  tagline: 'Since 1965 · Chappaqua, NY',
  established: 1965,
};

export const KNOWN_FOR_ITEMS: KnownForItem[] = [
  { name: 'The King Street', category: 'Signature' },
  { name: 'Chipotle Chicken Wrap', category: 'Signature' },
  { name: 'Roast Beef Sandwich', category: 'Deli Classic' },
  { name: 'South Greeley Wrap', category: 'Signature' },
  { name: 'German Potato Salad', category: 'Side' },
  { name: 'Bratwurst & Kraut', category: 'Hot Food' },
  { name: 'Macaroni Salad', category: 'Side' },
  { name: 'Broasted Chicken', category: 'Hot Food' },
];

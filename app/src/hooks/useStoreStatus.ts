import { useMemo } from 'react';
import { STORE_HOURS } from '../constants/store';

export function useStoreStatus() {
  return useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hours = STORE_HOURS[day];
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const isOpen = currentMin >= hours.openMin && currentMin < hours.closeMin;
    const statusText = isOpen
      ? `Open \u00B7 Closes ${hours.close}`
      : `Closed \u00B7 Opens ${hours.open}`;
    return { isOpen, statusText };
  }, []);
}

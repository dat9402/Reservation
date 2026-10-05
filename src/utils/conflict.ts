import { INITIAL_BOOKINGS } from '../data/mockData';
import { Booking } from '../types';
import { toDateKey } from './date';

export const isSlotBooked = (roomId: string, dateKey: string, slotId: string, bookings: Booking[]) => {
  const today = new Date();
  const initial = INITIAL_BOOKINGS.some((item) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + item.daysFromToday);
    const key = toDateKey(date);
    return item.roomId === roomId && item.slotId === slotId && key === dateKey;
  });

  const mine = bookings.some((item) => item.roomId === roomId && item.date === dateKey && item.slotId === slotId);
  return initial || mine;
};

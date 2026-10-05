import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Booking, User } from '../types';
import { cancelBookingReminder } from '../utils/notifications';

const demoUser: User = { id: 'u001', name: 'VKU Student', studentCode: '23IT0001' };

type BookingStore = {
  user: User;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      user: demoUser,
      bookings: [],
      addBooking: (booking) => set({ bookings: [booking, ...get().bookings] }),
      cancelBooking: (id) => {
        const booking = get().bookings.find((item) => item.id === id);
        if (booking) cancelBookingReminder(booking.notificationId);
        set({ bookings: get().bookings.filter((item) => item.id !== id) });
      },
    }),
    {
      name: 'vku-study-room-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

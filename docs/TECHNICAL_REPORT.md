# Mini-Project 2 - Technical Report

## 1. Project Overview
VKU Study Room is a React Native + Expo application for discovering and reserving campus study rooms and computer labs.

## 2. Technologies
- React Native + Expo SDK 57
- TypeScript
- Zustand for global state
- AsyncStorage for local persistence
- React Navigation native stack
- FlatList + memoized room cards for efficient rendering
- expo-notifications for local reminders
- react-native-qrcode-svg for booking passes

## 3. Main Features
1. Room discovery with search and filters.
2. Seven-day date selector.
3. Two-hour booking slots.
4. Conflict prevention for already-booked slots.
5. Global reservation state and cancellation.
6. Local persistence after app restart.
7. QR booking pass.
8. Fifteen-minute local reminder before a reservation.

## 4. Architecture
`HomeScreen` handles discovery and filters. `RoomDetailScreen` handles date/slot selection and booking. `BookingsScreen` displays reservations, QR passes and cancellation. `useBookingStore` is the single global state source. Utility modules isolate date conversion, conflict checking and notifications.

## 5. Performance Considerations
The room feed uses FlatList with `initialNumToRender`, `maxToRenderPerBatch`, `windowSize` and `removeClippedSubviews`. RoomCard and TimeSlot are memoized with React.memo to avoid unnecessary child renders.

## 6. Demo Flow
Open the app -> search/filter a room -> open room details -> choose a date -> choose an available slot -> confirm booking -> open My Bookings -> show QR pass -> cancel booking.

## 7. Limitations / Future Work
The current version uses local demo data instead of a campus backend. A production version could add Firebase/Supabase/API synchronization, authentication, server-side conflict locking, and an admin dashboard.

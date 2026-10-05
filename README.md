# VKU Study Room Booking App

A mobile booking application for reserving study rooms at VKU, built with React Native, Expo, TypeScript, Zustand, and React Navigation.

The app allows students to browse available rooms, choose a date and time slot, create a reservation, and manage bookings with local persistence and reminder notifications.

## Overview

This project is designed as a lightweight booking demo without a backend service. It uses mock data and stores reservations locally on the device, making it easy to run and showcase in Expo Go.

## Features

- Browse study rooms with room details and availability
- Filter rooms by building, capacity, and equipment
- Select a date from a 7-day booking calendar
- Choose from available 2-hour time slots
- Prevent double-booking by disabling conflicting slots
- Persist bookings using Zustand + AsyncStorage
- View and cancel bookings from a dedicated bookings screen
- Generate a QR-based check-in pass for each reservation
- Schedule local reminder notifications 15 minutes before booking time
- Run entirely with demo/mock data for fast prototyping and presentation

## Tech Stack

- React Native
- Expo
- TypeScript
- Zustand
- React Navigation
- AsyncStorage
- Expo Notifications
- react-native-qrcode-svg

## Project Structure

```text
.
├── App.tsx
├── app.json
├── babel.config.js
├── eas.json
├── index.ts
├── package.json
├── tsconfig.json
├── README.md
├── docs/
│   └── TECHNICAL_REPORT.md
├── src/
│   ├── components/
│   │   ├── RoomCard.tsx
│   │   └── TimeSlot.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── BookingsScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── RoomDetailScreen.tsx
│   ├── store/
│   │   └── useBookingStore.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── conflict.ts
│       ├── date.ts
│       └── notifications.ts
└──
```

## Requirements

Before running the app, make sure you have:

- Node.js 22.13 or newer
- npm or yarn
- Expo Go installed on a physical device, or an Android/iOS emulator/simulator

## Installation

Clone the project and install dependencies:

```bash
git clone <repository-url>
cd StudyRoomBookingApp
npm install
```

## Running the App

Start the Expo development server:

```bash
npm start
```

Then choose one of the following:

```bash
npm run android
npm run ios
npm run web
```

If you are using a physical device, scan the QR code with Expo Go.

## Typical User Flow

1. Open the home screen and browse available rooms.
2. Select a room and choose a date.
3. Pick an available time slot.
4. Confirm the booking.
5. Check the booking in the My Bookings screen.
6. View the QR check-in pass and cancel the reservation if needed.

## Notes on Notifications

This application uses local scheduled notifications. These work in Expo Go for local development and demo purposes. Remote push notifications require a development build and are not enabled by default in this project.

## Development Notes

- Booking state is managed globally with Zustand.
- Data is persisted locally using AsyncStorage.
- Business logic for slot conflicts is separated into utility functions.
- The app is intentionally mock-data based to keep it simple and demonstrable.

## Contribution

Contributions are welcome. If you want to improve the app, please make sure to keep the project simple, maintainable, and aligned with the existing Expo + TypeScript setup.


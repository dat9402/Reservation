import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import BookingsScreen from '../screens/BookingsScreen';
import { Room } from '../types';

export type RootStackParamList = {
  Home: undefined;
  RoomDetail: { room: Room };
  Bookings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: '#0F766E', background: '#F8FAFC' } }}>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerTintColor: '#0F766E', headerTitleStyle: { fontWeight: '800' } }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'VKU Study Room' }} />
        <Stack.Screen name="RoomDetail" component={RoomDetailScreen} options={{ title: 'Room details' }} />
        <Stack.Screen name="Bookings" component={BookingsScreen} options={{ title: 'My bookings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

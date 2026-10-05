import React, { useMemo, useState } from 'react';
import { isRunningInExpoGo } from 'expo';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { TIME_SLOTS } from '../data/mockData';
import { useBookingStore } from '../store/useBookingStore';
import { getNextSevenDays, dayName, shortDate, toDateKey } from '../utils/date';
import { isSlotBooked } from '../utils/conflict';
import TimeSlot from '../components/TimeSlot';
import { scheduleBookingReminder } from '../utils/notifications';

 type Props = NativeStackScreenProps<RootStackParamList, 'RoomDetail'>;

export default function RoomDetailScreen({ route, navigation }: Props) {
  const { room } = route.params;
  const days = useMemo(getNextSevenDays, []);
  const [selectedDate, setSelectedDate] = useState(toDateKey(days[0]));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const bookings = useBookingStore((s) => s.bookings);
  const addBooking = useBookingStore((s) => s.addBooking);

  const book = async () => {
    const slot = TIME_SLOTS.find((item) => item.id === selectedSlot);
    if (!slot) return;
    if (isSlotBooked(room.id, selectedDate, slot.id, bookings)) {
      Alert.alert('Slot unavailable', 'This slot was just booked. Please choose another time.');
      return;
    }

    const notificationId = await scheduleBookingReminder(room.name, selectedDate, slot.start);
    const booking = {
      id: `BK-${Date.now()}`,
      roomId: room.id,
      roomName: room.name,
      date: selectedDate,
      slotId: slot.id,
      start: slot.start,
      end: slot.end,
      createdAt: new Date().toISOString(),
      notificationId,
    };
    addBooking(booking);
    setSelectedSlot(null);
    Alert.alert('Booking confirmed', `${room.name}\n${selectedDate}\n${slot.start} - ${slot.end}`, [
      { text: 'View booking', onPress: () => navigation.navigate('Bookings') },
      { text: 'OK' },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.meta}>Building {room.building} · Floor {room.floor} · Capacity {room.capacity} students</Text>
      <View style={styles.tags}>{room.equipment.map((item) => <Text key={item} style={styles.tag}>{item}</Text>)}</View>

      <Text style={styles.heading}>Choose a date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.days}>
        {days.map((date) => {
          const key = toDateKey(date);
          const active = key === selectedDate;
          return <Pressable key={key} onPress={() => { setSelectedDate(key); setSelectedSlot(null); }} style={[styles.day, active && styles.dayActive]}>
            <Text style={[styles.dayName, active && styles.activeText]}>{dayName(date)}</Text>
            <Text style={[styles.dayDate, active && styles.activeText]}>{shortDate(date)}</Text>
          </Pressable>;
        })}
      </ScrollView>

      <Text style={styles.heading}>Choose a 2-hour slot</Text>
      <View style={styles.slotGrid}>
        {TIME_SLOTS.map((slot) => <TimeSlot key={slot.id} slot={slot} selected={selectedSlot === slot.id} disabled={isSlotBooked(room.id, selectedDate, slot.id, bookings)} onPress={() => setSelectedSlot(slot.id)} />)}
      </View>
      <Text style={styles.note}>
        {isRunningInExpoGo()
          ? 'Booked slots are disabled automatically. Booking reminders are unavailable in Expo Go.'
          : 'Booked slots are disabled automatically. A reminder is scheduled 15 minutes before your selected slot.'}
      </Text>

      <Pressable disabled={!selectedSlot} onPress={book} style={[styles.bookButton, !selectedSlot && styles.bookDisabled]}>
        <Text style={styles.bookText}>{selectedSlot ? 'Book this slot' : 'Select an available slot'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 35 },
  image: { width: '100%', height: 190, borderRadius: 20 },
  title: { fontSize: 25, fontWeight: '900', color: '#0F172A', marginTop: 16 },
  meta: { color: '#64748B', marginTop: 6, fontSize: 13 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12 },
  tag: { backgroundColor: '#CCFBF1', color: '#0F766E', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 8, fontSize: 11, fontWeight: '700' },
  heading: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginTop: 24, marginBottom: 11 },
  days: { gap: 8, paddingBottom: 2 },
  day: { width: 70, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#fff', paddingVertical: 11, alignItems: 'center' },
  dayActive: { backgroundColor: '#0F766E', borderColor: '#0F766E' },
  dayName: { color: '#64748B', fontSize: 11, fontWeight: '800' },
  dayDate: { color: '#0F172A', marginTop: 5, fontSize: 13, fontWeight: '800' },
  activeText: { color: '#fff' },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  note: { color: '#64748B', fontSize: 12, lineHeight: 18, marginTop: 4 },
  bookButton: { marginTop: 20, backgroundColor: '#0F766E', borderRadius: 15, paddingVertical: 15, alignItems: 'center' },
  bookDisabled: { backgroundColor: '#94A3B8' },
  bookText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});

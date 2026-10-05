import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROOMS } from '../data/mockData';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Equipment } from '../types';
import RoomCard from '../components/RoomCard';
import { useBookingStore } from '../store/useBookingStore';
import { isSlotBooked } from '../utils/conflict';
import { toDateKey } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const BUILDINGS = ['All', 'A', 'B', 'C', 'V'];
const EQUIPMENT = ['All', 'Projector', 'Whiteboard', 'High-spec PC', 'AC'];

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [building, setBuilding] = useState('All');
  const [equipment, setEquipment] = useState('All');
  const [capacity, setCapacity] = useState(0);
  const bookings = useBookingStore((s) => s.bookings);

  const filteredRooms = useMemo(() => ROOMS.filter((room) => {
    const matchesQuery = `${room.name} ${room.id}`.toLowerCase().includes(query.toLowerCase());
    const matchesBuilding = building === 'All' || room.building === building;
    const matchesEquipment = equipment === 'All' || room.equipment.includes(equipment as Equipment);
    const matchesCapacity = capacity === 0 || room.capacity >= capacity;
    return matchesQuery && matchesBuilding && matchesEquipment && matchesCapacity;
  }), [query, building, equipment, capacity]);

  const isOccupiedNow = (roomId: string) => {
    const now = new Date();
    const key = toDateKey(now);
    const minutes = now.getHours() * 60 + now.getMinutes();
    const slot = minutes < 570 ? '0730-0930' : minutes < 690 ? '0930-1130' : minutes < 780 ? '' : minutes < 900 ? '1300-1500' : minutes < 1020 ? '1500-1700' : '1730-1930';
    return slot ? isSlotBooked(roomId, key, slot, bookings) : false;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoomCard room={item} occupied={isOccupiedNow(item.id)} onPress={() => navigation.navigate('RoomDetail', { room: item })} />}
        contentContainerStyle={styles.list}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <View style={{ flex: 1 }}>
                <Text style={styles.eyebrow}>VKU CAMPUS</Text>
                <Text style={styles.heroTitle}>Find a room. Focus better.</Text>
                <Text style={styles.heroText}>Real-time demo for study rooms and computer labs.</Text>
              </View>
              <Pressable style={styles.bookingButton} onPress={() => navigation.navigate('Bookings')}>
                <Text style={styles.bookingButtonText}>My bookings</Text>
              </Pressable>
            </View>
            <TextInput value={query} onChangeText={setQuery} placeholder="Search room or room code..." placeholderTextColor="#94A3B8" style={styles.search} />
            <Text style={styles.sectionLabel}>Building</Text>
            <View style={styles.chips}>{BUILDINGS.map((item) => <FilterChip key={item} label={item} active={building === item} onPress={() => setBuilding(item)} />)}</View>
            <Text style={styles.sectionLabel}>Capacity</Text>
            <View style={styles.chips}>{[0, 2, 4, 6, 10, 20].map((item) => <FilterChip key={item} label={item === 0 ? 'Any' : `${item}+`} active={capacity === item} onPress={() => setCapacity(item)} />)}</View>
            <Text style={styles.sectionLabel}>Equipment</Text>
            <View style={styles.chips}>{EQUIPMENT.map((item) => <FilterChip key={item} label={item} active={equipment === item} onPress={() => setEquipment(item)} />)}</View>
            <Text style={styles.result}>{filteredRooms.length} rooms found</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>No rooms match your filters.</Text>}
      />
    </SafeAreaView>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}><Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 16, paddingBottom: 30 },
  hero: { backgroundColor: '#0F766E', borderRadius: 22, padding: 20, flexDirection: 'row', marginBottom: 14 },
  eyebrow: { color: '#99F6E4', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: 24, lineHeight: 29, fontWeight: '900', marginTop: 5 },
  heroText: { color: '#CCFBF1', fontSize: 12, marginTop: 8, maxWidth: 210 },
  bookingButton: { alignSelf: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 9 },
  bookingButtonText: { color: '#0F766E', fontSize: 11, fontWeight: '800' },
  search: { height: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, paddingHorizontal: 16, color: '#0F172A', marginBottom: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: '#475569', marginBottom: 8, marginTop: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 999, borderWidth: 1, borderColor: '#E2E8F0' },
  chipActive: { backgroundColor: '#CCFBF1', borderColor: '#0F766E' },
  chipText: { color: '#64748B', fontSize: 11, fontWeight: '700' },
  chipTextActive: { color: '#0F766E' },
  result: { color: '#64748B', fontSize: 12, fontWeight: '700', marginBottom: 12 },
  empty: { textAlign: 'center', color: '#64748B', paddingTop: 30 },
});

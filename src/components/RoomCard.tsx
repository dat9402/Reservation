import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Room } from '../types';

type Props = { room: Room; occupied: boolean; onPress: () => void };

function RoomCard({ room, occupied, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>{room.name}</Text>
          <View style={[styles.status, occupied ? styles.busy : styles.free]}>
            <Text style={[styles.statusText, occupied ? styles.busyText : styles.freeText]}>
              {occupied ? 'Occupied' : 'Available Now'}
            </Text>
          </View>
        </View>
        <Text style={styles.meta}>Building {room.building} · Floor {room.floor} · Up to {room.capacity}</Text>
        <View style={styles.tags}>
          {room.equipment.map((item) => <Text key={item} style={styles.tag}>{item}</Text>)}
        </View>
      </View>
    </Pressable>
  );
}

export default memo(RoomCard);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  pressed: { opacity: 0.92 },
  image: { width: '100%', height: 150 },
  body: { padding: 14 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flex: 1, fontSize: 17, fontWeight: '800', color: '#0F172A' },
  status: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 999 },
  free: { backgroundColor: '#DCFCE7' },
  busy: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 10, fontWeight: '800' },
  freeText: { color: '#166534' },
  busyText: { color: '#991B1B' },
  meta: { marginTop: 8, color: '#64748B', fontSize: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tag: { backgroundColor: '#F1F5F9', color: '#475569', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, fontSize: 11 },
});

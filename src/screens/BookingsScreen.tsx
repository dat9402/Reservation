import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useBookingStore } from '../store/useBookingStore';

export default function BookingsScreen() {
  const bookings = useBookingStore((s) => s.bookings);
  const cancelBooking = useBookingStore((s) => s.cancelBooking);
  const [selected, setSelected] = useState<(typeof bookings)[number] | null>(null);

  const cancel = (id: string) => {
    Alert.alert('Cancel booking?', 'The slot will become available again.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Cancel booking', style: 'destructive', onPress: () => cancelBooking(id) },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>ACTIVE RESERVATIONS</Text>
        <Text style={styles.summaryNumber}>{bookings.length}</Text>
        <Text style={styles.summaryText}>Stored locally with Zustand + AsyncStorage</Text>
      </View>
      {bookings.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>No bookings yet</Text><Text style={styles.emptyText}>Choose a room and an available slot to create your first reservation.</Text></View> : bookings.map((booking) => (
        <View key={booking.id} style={styles.card}>
          <View style={styles.cardTop}><View style={{ flex: 1 }}><Text style={styles.room}>{booking.roomName}</Text><Text style={styles.date}>{booking.date} · {booking.start} - {booking.end}</Text></View><View style={styles.confirmed}><Text style={styles.confirmedText}>CONFIRMED</Text></View></View>
          <Text style={styles.bookingId}>Pass ID: {booking.id}</Text>
          <View style={styles.actions}>
            <Pressable style={styles.qrButton} onPress={() => setSelected(booking)}><Text style={styles.qrText}>Show QR pass</Text></Pressable>
            <Pressable style={styles.cancelButton} onPress={() => cancel(booking.id)}><Text style={styles.cancelText}>Cancel</Text></Pressable>
          </View>
        </View>
      ))}

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalEyebrow}>CHECK-IN PASS</Text>
            <Text style={styles.modalTitle}>{selected?.roomName}</Text>
            <Text style={styles.modalDate}>{selected?.date} · {selected?.start} - {selected?.end}</Text>
            {selected && <QRCode value={JSON.stringify({ pass: selected.id, room: selected.roomId, date: selected.date, slot: selected.slotId })} size={190} color="#0F172A" backgroundColor="#FFFFFF" />}
            <Text style={styles.scan}>Show this QR at the room check-in point.</Text>
            <Pressable style={styles.close} onPress={() => setSelected(null)}><Text style={styles.closeText}>Close</Text></Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 35 },
  summary: { backgroundColor: '#0F766E', borderRadius: 20, padding: 20, marginBottom: 16 },
  summaryLabel: { color: '#99F6E4', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  summaryNumber: { color: '#fff', fontSize: 38, fontWeight: '900', marginTop: 2 },
  summaryText: { color: '#CCFBF1', fontSize: 12 },
  card: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, marginBottom: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start' },
  room: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  date: { marginTop: 6, color: '#64748B', fontSize: 12 },
  confirmed: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
  confirmedText: { color: '#166534', fontSize: 9, fontWeight: '900' },
  bookingId: { marginTop: 12, color: '#94A3B8', fontSize: 10 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 14 },
  qrButton: { flex: 1, backgroundColor: '#0F766E', borderRadius: 11, alignItems: 'center', paddingVertical: 11 },
  qrText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  cancelButton: { paddingHorizontal: 18, backgroundColor: '#FEE2E2', borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  cancelText: { color: '#B91C1C', fontWeight: '800', fontSize: 12 },
  empty: { backgroundColor: '#fff', padding: 28, borderRadius: 18, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 8, lineHeight: 19 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.6)', justifyContent: 'center', padding: 22 },
  modal: { backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center' },
  modalEyebrow: { color: '#0F766E', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  modalTitle: { fontSize: 21, fontWeight: '900', color: '#0F172A', marginTop: 5, textAlign: 'center' },
  modalDate: { color: '#64748B', fontSize: 12, marginTop: 5, marginBottom: 20 },
  scan: { color: '#64748B', fontSize: 11, textAlign: 'center', marginTop: 16 },
  close: { width: '100%', backgroundColor: '#0F766E', borderRadius: 13, paddingVertical: 13, alignItems: 'center', marginTop: 18 },
  closeText: { color: '#fff', fontWeight: '900' },
});

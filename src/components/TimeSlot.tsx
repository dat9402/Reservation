import React, { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { TimeSlot as TimeSlotType } from '../types';

type Props = { slot: TimeSlotType; disabled: boolean; selected: boolean; onPress: () => void };

function TimeSlot({ slot, disabled, selected, onPress }: Props) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.slot, selected && styles.selected, disabled && styles.disabled]}>
      <Text style={[styles.time, selected && styles.selectedText, disabled && styles.disabledText]}>{slot.start}</Text>
      <Text style={[styles.end, selected && styles.selectedText, disabled && styles.disabledText]}>{slot.end}</Text>
      <Text style={[styles.state, selected && styles.selectedText, disabled && styles.disabledText]}>{disabled ? 'Booked' : selected ? 'Selected' : 'Available'}</Text>
    </Pressable>
  );
}

export default memo(TimeSlot);

const styles = StyleSheet.create({
  slot: { width: '48%', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 14, padding: 14, marginBottom: 10, backgroundColor: '#fff' },
  selected: { backgroundColor: '#0F766E', borderColor: '#0F766E' },
  disabled: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },
  time: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  end: { marginTop: 2, color: '#64748B', fontSize: 12 },
  state: { marginTop: 10, color: '#0F766E', fontWeight: '700', fontSize: 11 },
  selectedText: { color: '#fff' },
  disabledText: { color: '#94A3B8' },
});

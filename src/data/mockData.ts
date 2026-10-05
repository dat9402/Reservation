import { Room, TimeSlot } from '../types';

export const TIME_SLOTS: TimeSlot[] = [
  { id: '0730-0930', start: '07:30', end: '09:30' },
  { id: '0930-1130', start: '09:30', end: '11:30' },
  { id: '1300-1500', start: '13:00', end: '15:00' },
  { id: '1500-1700', start: '15:00', end: '17:00' },
  { id: '1730-1930', start: '17:30', end: '19:30' },
];

export const ROOMS: Room[] = [
  {
    id: 'A201', name: 'Study Room A201', building: 'A', floor: 2, capacity: 6,
    equipment: ['Whiteboard', 'Projector', 'AC'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'B305', name: 'Computer Lab B305', building: 'B', floor: 3, capacity: 20,
    equipment: ['High-spec PC', 'Projector', 'AC'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'C104', name: 'Study Room C104', building: 'C', floor: 1, capacity: 4,
    equipment: ['Whiteboard', 'AC'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'V202', name: 'Innovation Room V202', building: 'V', floor: 2, capacity: 10,
    equipment: ['Projector', 'Whiteboard', 'High-spec PC', 'AC'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'A403', name: 'Group Room A403', building: 'A', floor: 4, capacity: 8,
    equipment: ['Whiteboard', 'AC'],
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'B207', name: 'Focus Room B207', building: 'B', floor: 2, capacity: 2,
    equipment: ['Whiteboard', 'AC'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
  },
];

export const INITIAL_BOOKINGS = [
  { roomId: 'A201', slotId: '0930-1130', daysFromToday: 0 },
  { roomId: 'B305', slotId: '1300-1500', daysFromToday: 1 },
  { roomId: 'V202', slotId: '1500-1700', daysFromToday: 2 },
  { roomId: 'C104', slotId: '0730-0930', daysFromToday: 3 },
];

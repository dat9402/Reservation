export type Equipment = 'Projector' | 'Whiteboard' | 'High-spec PC' | 'AC';

export type Room = {
  id: string;
  name: string;
  building: 'A' | 'B' | 'C' | 'V';
  floor: number;
  capacity: number;
  equipment: Equipment[];
  image: string;
};

export type Booking = {
  id: string;
  roomId: string;
  roomName: string;
  date: string;
  slotId: string;
  start: string;
  end: string;
  createdAt: string;
  notificationId?: string;
};

export type User = {
  id: string;
  name: string;
  studentCode: string;
};

export type TimeSlot = {
  id: string;
  start: string;
  end: string;
};

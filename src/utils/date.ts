export const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getNextSevenDays = () =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return date;
  });

export const dayName = (date: Date) =>
  date.toLocaleDateString('en-US', { weekday: 'short' });

export const shortDate = (date: Date) =>
  date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

export const bookingStartDate = (dateKey: string, start: string) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  const [hours, minutes] = start.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return date;
};

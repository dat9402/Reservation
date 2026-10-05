import { isRunningInExpoGo } from 'expo';
import { Platform } from 'react-native';
import { bookingStartDate } from './date';

async function getNotifications() {
  if (isRunningInExpoGo()) return undefined;

  const Notifications = await import('expo-notifications');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  return Notifications;
}

export async function prepareNotifications() {
  const Notifications = await getNotifications();
  if (!Notifications) return;

  const permissions = await Notifications.getPermissionsAsync();
  if (!permissions.granted) await Notifications.requestPermissionsAsync();
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('booking-reminders', {
      name: 'Booking reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function scheduleBookingReminder(roomName: string, dateKey: string, start: string) {
  const Notifications = await getNotifications();
  if (!Notifications) return undefined;

  const reminderAt = new Date(bookingStartDate(dateKey, start).getTime() - 15 * 60 * 1000);
  if (reminderAt.getTime() <= Date.now()) return undefined;

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Study room reminder',
      body: `${roomName} starts at ${start}. Please check in on time.`,
      data: { roomName, dateKey, start },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderAt,
      channelId: 'booking-reminders',
    },
  });
}

export async function cancelBookingReminder(notificationId?: string) {
  if (!notificationId) return;

  const Notifications = await getNotifications();
  if (Notifications) await Notifications.cancelScheduledNotificationAsync(notificationId);
}

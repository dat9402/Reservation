import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { prepareNotifications } from './src/utils/notifications';

export default function App() {
  useEffect(() => { prepareNotifications(); }, []);
  return <AppNavigator />;
}

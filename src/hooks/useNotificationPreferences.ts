import { useState } from 'react';
import type { NotificationPreferences } from '../types/notification';

export function useNotificationPreferences(initialPreferences: NotificationPreferences) {
  const [preferences, setPreferences] = useState(initialPreferences);

  const updatePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences);
    // In a real app, save to backend
  };

  const toggleFieldNotification = (field: string) => {
    setPreferences(prev => ({
      ...prev,
      fieldNotifications: {
        ...prev.fieldNotifications,
        [field]: {
          ...prev.fieldNotifications[field],
          enabled: !prev.fieldNotifications[field]?.enabled,
        },
      },
    }));
  };

  return {
    preferences,
    updatePreferences,
    toggleFieldNotification
  };
}
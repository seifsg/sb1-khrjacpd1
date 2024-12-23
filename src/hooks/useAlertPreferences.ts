import { useState } from 'react';
import type { NotificationPreferences } from '../types/notification';

const defaultFields = [
  'Business name',
  'Store code',
  'Description',
  'Address',
  'Phone numbers',
  'Categories',
  'Website',
  'Hours',
  'Opening date',
  'Services',
  'Logo',
  'Attributes',
  'Photos',
  'Special hours'
];

// Create default preferences with all fields enabled
const defaultPreferences: NotificationPreferences = {
  email: '',
  fieldNotifications: defaultFields.reduce((acc, field) => ({
    ...acc,
    [field]: { enabled: true }
  }), {})
};

export function useAlertPreferences(locationId: string) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);

  const updatePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences);
    // In a real app, save to backend
    console.log('Saving preferences for location:', locationId, newPreferences);
  };

  return {
    preferences,
    updatePreferences
  };
}
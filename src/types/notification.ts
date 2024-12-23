export interface NotificationPreferences {
  email: string;
  fieldNotifications: {
    [key: string]: {
      enabled: boolean;
    };
  };
}

export interface ChangeNotification {
  id: string;
  locationId: string;
  locationName: string;
  timestamp: Date;
  field: string;
  oldValue: string;
  newValue: string;
  source: 'google' | 'owner' | 'manager' | 'system';
}
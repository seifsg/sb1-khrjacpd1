import React from 'react';
import NotificationList from '../components/notifications/NotificationList';
import { useChangeLog } from '../context/ChangeLogContext';
import type { ChangeNotification } from '../types/notification';

const NotificationsPage = () => {
  const { addToHistory } = useChangeLog();

  // Mock notifications for demo
  const notifications: ChangeNotification[] = [
    {
      id: '1',
      locationId: '1',
      locationName: 'Downtown Coffee Shop',
      field: 'Business Hours',
      oldValue: '9:00 AM - 5:00 PM',
      newValue: '8:00 AM - 6:00 PM',
      source: 'owner',
      timestamp: new Date('2024-03-10T10:00:00')
    },
    {
      id: '2',
      locationId: '2',
      locationName: 'Uptown Branch',
      field: 'Phone Number',
      oldValue: '(555) 123-4567',
      newValue: '(555) 987-6543',
      source: 'manager',
      timestamp: new Date('2024-03-10T09:30:00')
    }
  ];

  const handleAcceptChange = (notification: ChangeNotification) => {
    addToHistory(notification, 'approved');
  };

  const handleRejectChange = (notification: ChangeNotification) => {
    addToHistory(notification, 'rejected');
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Changes</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <NotificationList
              notifications={notifications}
              onAccept={handleAcceptChange}
              onReject={handleRejectChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
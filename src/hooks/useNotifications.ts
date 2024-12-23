import { useState } from 'react';
import type { Notification } from '../types/notification';

export function useNotifications(initialNotifications: Notification[]) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, status: 'read' } : n
      )
    );
  };

  const filterNotifications = (filters: {
    type: string[];
    priority: string[];
    status: string[];
  }) => {
    return notifications.filter(notification => {
      if (filters.type.length && !filters.type.includes(notification.type)) return false;
      if (filters.priority.length && !filters.priority.includes(notification.priority)) return false;
      if (filters.status.length && !filters.status.includes(notification.status)) return false;
      return true;
    });
  };

  return {
    notifications,
    markAsRead,
    filterNotifications
  };
}
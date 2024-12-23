import React from 'react';
import NotificationItem from './NotificationItem';
import type { ChangeNotification } from '../../types/notification';

interface NotificationListProps {
  notifications: ChangeNotification[];
  onAccept: (notification: ChangeNotification) => void;
  onReject: (notification: ChangeNotification) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onAccept,
  onReject,
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No pending changes to review
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

export default NotificationList;
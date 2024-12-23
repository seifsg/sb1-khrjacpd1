import React from 'react';
import { formatDistanceToNow } from '../../utils/formatters';
import type { Notification } from '../../types/notification';

interface NotificationContentProps {
  notification: Notification;
}

export const NotificationContent: React.FC<NotificationContentProps> = ({ notification }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <p className="font-medium text-gray-900">{notification.title}</p>
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(notification.timestamp)}
        </span>
      </div>
      <p className="mt-1 text-gray-600">{notification.message}</p>
      <p className="mt-2 text-sm text-gray-500">{notification.locationName}</p>
      {notification.changeDetails && <ChangeDetails details={notification.changeDetails} />}
    </>
  );
};

const ChangeDetails: React.FC<{ details: Notification['changeDetails'] }> = ({ details }) => {
  if (!details) return null;
  
  return (
    <div className="mt-2 text-sm">
      <span className="text-gray-500">Changed by: </span>
      <span className="text-gray-700">{details.source}</span>
      <div className="mt-2">
        <span className="text-gray-500">Old value: </span>
        <span className="text-gray-700">{details.oldValue}</span>
      </div>
      <div className="mt-1">
        <span className="text-gray-500">New value: </span>
        <span className="text-gray-700">{details.newValue}</span>
      </div>
    </div>
  );
};
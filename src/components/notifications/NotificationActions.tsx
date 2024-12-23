import React from 'react';
import { Check, X } from 'lucide-react';
import type { Notification } from '../../types/notification';

interface NotificationActionsProps {
  notification: Notification;
  onAccept?: (notification: Notification) => void;
  onReject?: (notification: Notification) => void;
}

export const NotificationActions: React.FC<NotificationActionsProps> = ({
  notification,
  onAccept,
  onReject,
}) => {
  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAccept?.(notification);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReject?.(notification);
  };

  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={handleAccept}
        className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
      >
        <Check size={16} />
        Accept
      </button>
      <button
        onClick={handleReject}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
      >
        <X size={16} />
        Reject
      </button>
    </div>
  );
};
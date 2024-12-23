import React from 'react';
import { AlertCircle, Clock, Info } from 'lucide-react';
import type { NotificationType } from '../../types/notification';

interface NotificationIconProps {
  type: NotificationType;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  switch (type) {
    case 'change':
      return <Clock className="text-blue-500" size={20} />;
    case 'alert':
      return <AlertCircle className="text-red-500" size={20} />;
    case 'system':
      return <Info className="text-gray-500" size={20} />;
  }
};
import React from 'react';
import AlertItem from './AlertItem';
import type { ChangeNotification } from '../../types/notification';

interface AlertListProps {
  alerts: ChangeNotification[];
  onAccept: (alert: ChangeNotification) => void;
  onReject: (alert: ChangeNotification) => void;
}

const AlertList: React.FC<AlertListProps> = ({
  alerts,
  onAccept,
  onReject,
}) => {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No pending changes to review
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

export default AlertList;
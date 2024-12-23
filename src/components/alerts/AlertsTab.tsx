import React from 'react';
import AlertPreferences from './AlertPreferences';
import { useAlertPreferences } from '../../hooks/useAlertPreferences';
import type { ChangeNotification } from '../../types/notification';

interface AlertsTabProps {
  locationId: string;
  alerts: ChangeNotification[];
  onAccept: (alert: ChangeNotification) => void;
  onReject: (alert: ChangeNotification) => void;
}

const AlertsTab: React.FC<AlertsTabProps> = ({
  locationId,
  alerts,
  onAccept,
  onReject,
}) => {
  const { preferences, updatePreferences } = useAlertPreferences(locationId);

  return (
    <div className="bg-white rounded-lg border p-6">
      <AlertPreferences
        preferences={preferences}
        onPreferencesChange={updatePreferences}
      />
    </div>
  );
};

export default AlertsTab;
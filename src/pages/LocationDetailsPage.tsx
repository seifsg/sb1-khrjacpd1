import React, { useState } from 'react';
import LocationDetailsHeader from '../components/location-details/LocationDetailsHeader';
import LocationDetailsTabs from '../components/location-details/LocationDetailsTabs';
import LocationDetailsContent from '../components/location-details/LocationDetailsContent';
import AlertsTab from '../components/alerts/AlertsTab';
import HistoryList from '../components/history/HistoryList';
import NotificationList from '../components/notifications/NotificationList';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useLocationUpdate } from '../hooks/useLocationUpdate';
import { useChangeLog } from '../context/ChangeLogContext';
import type { Location } from '../types';
import type { ChangeNotification } from '../types/notification';

interface LocationDetailsPageProps {
  location: Location;
  onBack: () => void;
}

const LocationDetailsPage: React.FC<LocationDetailsPageProps> = ({
  location,
  onBack,
}) => {
  const { confirmation, handleUpdate, closeConfirmation } = useLocationUpdate(location);
  const { history, addToHistory } = useChangeLog();
  const [activeTab, setActiveTab] = useState<'details' | 'pending' | 'history' | 'alerts'>('details');

  // Filter history for this location
  const locationHistory = history.filter(item => item.locationId === location.id);

  // Mock notifications for this location
  const locationNotifications: ChangeNotification[] = [
    {
      id: '1',
      locationId: location.id,
      locationName: location.name,
      field: 'Business Hours',
      oldValue: '9:00 AM - 5:00 PM',
      newValue: '8:00 AM - 6:00 PM',
      source: 'google',
      timestamp: new Date()
    }
  ];

  const handleAcceptChange = (notification: ChangeNotification) => {
    addToHistory(notification, 'approved');
  };

  const handleRejectChange = (notification: ChangeNotification) => {
    addToHistory(notification, 'rejected');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pending':
        return (
          <NotificationList
            notifications={locationNotifications}
            onAccept={handleAcceptChange}
            onReject={handleRejectChange}
          />
        );
      case 'history':
        return <HistoryList history={locationHistory} />;
      case 'alerts':
        return (
          <AlertsTab
            locationId={location.id}
            alerts={locationNotifications}
            onAccept={handleAcceptChange}
            onReject={handleRejectChange}
          />
        );
      default:
        return <LocationDetailsContent location={location} onUpdate={handleUpdate} />;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm">
          <LocationDetailsHeader location={location} onBack={onBack} />
          <LocationDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>

      {confirmation && (
        <ConfirmDialog
          isOpen={true}
          title="Update Business Information"
          message={`Are you sure you want to update ${confirmation.field} from "${confirmation.oldValue}" to "${confirmation.newValue}"? This change will be reflected in your Google Business Profile immediately.`}
          onConfirm={confirmation.onConfirm}
          onCancel={closeConfirmation}
          confirmText="Update"
        />
      )}
    </div>
  );
};

export default LocationDetailsPage;
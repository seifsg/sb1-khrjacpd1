import React from 'react';
import type { GBPLocation } from '../../types/gbp-fields';

interface AccountLocationsProps {
  locations: GBPLocation[];
  onManageClick: () => void;
}

const AccountLocations: React.FC<AccountLocationsProps> = ({ locations, onManageClick }) => {
  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-700">Connected Locations</h4>
        <button
          onClick={onManageClick}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Manage Locations
        </button>
      </div>
      {locations.length > 0 ? (
        <div className="space-y-2">
          {locations.slice(0, 3).map((location) => (
            <div
              key={location.id}
              className="text-sm text-gray-600 flex items-center justify-between"
            >
              <span>{location.businessName}</span>
              <span className="text-gray-400">
                {location.address.city}, {location.address.state}
              </span>
            </div>
          ))}
          {locations.length > 3 && (
            <p className="text-sm text-gray-500">
              +{locations.length - 3} more locations
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No locations connected</p>
      )}
    </div>
  );
};

export default AccountLocations;
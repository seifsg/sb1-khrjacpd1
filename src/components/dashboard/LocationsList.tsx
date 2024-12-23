import React from 'react';
import LocationCard from '../LocationCard';
import type { Location } from '../../types';

interface LocationsListProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

const LocationsList: React.FC<LocationsListProps> = ({ locations, onLocationSelect }) => {
  if (locations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No locations found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <LocationCard
          key={`dashboard-${location.id}`}
          location={location}
          onDelete={() => {}}
          onViewDetails={() => onLocationSelect(location)}
        />
      ))}
    </div>
  );
};

export default LocationsList;
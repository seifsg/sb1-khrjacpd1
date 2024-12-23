import React from 'react';
import LocationCard from '../LocationCard';
import type { Location } from '../../types';

interface LocationsListProps {
  locations: Location[];
  onDelete: (id: string) => void;
  onViewDetails: (location: Location) => void;
}

const LocationsList: React.FC<LocationsListProps> = ({ locations, onDelete, onViewDetails }) => {
  if (locations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No locations found. Import locations from Google Business Profile to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <LocationCard
          key={`location-${location.id}`}
          location={location}
          onDelete={() => onDelete(location.id)}
          onViewDetails={() => onViewDetails(location)}
        />
      ))}
    </div>
  );
};

export default LocationsList;
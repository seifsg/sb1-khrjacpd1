import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Location } from '../../types';

interface LocationDetailsHeaderProps {
  location: Location;
  onBack: () => void;
}

const LocationDetailsHeader: React.FC<LocationDetailsHeaderProps> = ({
  location,
  onBack,
}) => {
  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Locations</span>
      </button>

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">{location.name}</h1>
        <p className="mt-1 text-gray-500">Location Details</p>
      </div>
    </>
  );
};

export default LocationDetailsHeader;
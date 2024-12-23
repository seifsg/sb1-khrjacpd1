import React from 'react';
import type { Location } from '../../../types';

interface PhotosProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const Photos: React.FC<PhotosProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Photos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Photo grid will be implemented here */}
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No photos yet</span>
        </div>
      </div>
    </div>
  );
};

export default Photos;
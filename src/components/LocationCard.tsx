import React, { useState } from 'react';
import { MapPin, Phone, Globe, Clock, Trash2 } from 'lucide-react';
import DeleteLocationModal from './locations/DeleteLocationModal';
import type { Location } from '../types';

interface LocationCardProps {
  location: Location;
  onDelete: () => void;
  onViewDetails: (location: Location) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onDelete, onViewDetails }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              location.status === 'active' 
                ? 'bg-green-100 text-green-800'
                : location.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
            </span>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Remove location"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <span className="text-gray-600">{location.address}</span>
          </div>
          
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-600">{location.phone}</span>
          </div>
          
          {location.website && (
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-400 mr-3" />
              <a href={location.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {new URL(location.website).hostname}
              </a>
            </div>
          )}
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-600">Open Now</span>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(location)}
          className="mt-6 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View Details
        </button>
      </div>

      <DeleteLocationModal
        isOpen={showDeleteModal}
        location={location}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default LocationCard;
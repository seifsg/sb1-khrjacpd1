import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { GBPLocation } from '../../types/gbp-fields';

interface LocationManagementListProps {
  locations: GBPLocation[];
  selectedLocations: Set<string>;
  onToggleLocation: (id: string) => void;
}

const LocationManagementList: React.FC<LocationManagementListProps> = ({
  locations,
  selectedLocations,
  onToggleLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(location =>
    location.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${location.address.street}, ${location.address.city}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectAll = () => {
    const allSelected = filteredLocations.every(loc => selectedLocations.has(loc.id));
    filteredLocations.forEach(location => {
      if (allSelected) {
        // If all are selected, unselect all filtered locations
        onToggleLocation(location.id);
      } else if (!selectedLocations.has(location.id)) {
        // If not all are selected, select any unselected filtered locations
        onToggleLocation(location.id);
      }
    });
  };

  const allFilteredSelected = filteredLocations.length > 0 && 
    filteredLocations.every(loc => selectedLocations.has(loc.id));

  return (
    <div className="space-y-4">
      {/* Search and Select All */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {filteredLocations.length > 0 && (
          <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={handleSelectAll}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700 font-medium">
              Select All {searchTerm && 'Filtered'} Locations
            </span>
          </label>
        )}
      </div>

      {/* Locations List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredLocations.map((location) => (
          <label
            key={location.id}
            className="flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex-shrink-0 pt-1">
              <input
                type="checkbox"
                checked={selectedLocations.has(location.id)}
                onChange={() => onToggleLocation(location.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{location.businessName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {location.address.street}, {location.address.city}, {location.address.state}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  location.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : location.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {location.categories.map((cat, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </label>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No locations found matching your search
        </div>
      )}
    </div>
  );
};

export default LocationManagementList;
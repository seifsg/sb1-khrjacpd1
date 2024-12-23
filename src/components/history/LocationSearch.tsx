import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import type { Location } from '../../types';

interface LocationSearchProps {
  locations: Location[];
  selectedLocations: Location[];
  onLocationSelect: (location: Location) => void;
  onLocationRemove: (locationId: string) => void;
}

const LocationSearch = ({
  locations,
  selectedLocations,
  onLocationSelect,
  onLocationRemove,
}: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterLocations = useCallback(() => {
    if (searchTerm.length >= 2 && locations) {
      const filtered = locations.filter(
        location => 
          !selectedLocations.find(selected => selected.id === location.id) &&
          location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredLocations([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, locations, selectedLocations]);

  useEffect(() => {
    filterLocations();
  }, [filterLocations]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {isDropdownOpen && filteredLocations.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                onClick={() => {
                  onLocationSelect(location);
                  setSearchTerm('');
                  setIsDropdownOpen(false);
                }}
              >
                <span className="font-medium">{location.name}</span>
                <span className="text-sm text-gray-500 ml-2">{location.address}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map((location) => (
            <span
              key={location.id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {location.name}
              <button
                onClick={() => onLocationRemove(location.id)}
                className="hover:text-blue-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
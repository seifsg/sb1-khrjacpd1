import { useState, useMemo } from 'react';
import { Location } from '../types';
import { searchLocations } from '../utils/search';

export function useLocationSearch(locations: Location[]) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLocations = useMemo(() => 
    searchLocations(locations, searchTerm),
    [locations, searchTerm]
  );
  
  return {
    searchTerm,
    setSearchTerm,
    filteredLocations
  };
}
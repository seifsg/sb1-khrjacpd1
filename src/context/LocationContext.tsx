import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Location } from '../types';
import type { GBPLocation } from '../types/gbp-fields';

interface LocationContextType {
  locations: Location[];
  addLocations: (locations: Location[]) => void;
  removeLocation: (locationId: string) => void;
  getLocationById: (id: string) => Location | undefined;
  updateLocation: (id: string, updates: Partial<Location>) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [locations, setLocations] = useState<Location[]>([]);

  const addLocations = useCallback((newLocations: Location[]) => {
    setLocations(prev => {
      const existingIds = new Set(prev.map(loc => loc.id));
      const uniqueNewLocations = newLocations.filter(loc => !existingIds.has(loc.id));
      return [...prev, ...uniqueNewLocations];
    });
  }, []);

  const removeLocation = useCallback((locationId: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
  }, []);

  const getLocationById = useCallback((id: string) => {
    return locations.find(loc => loc.id === id);
  }, [locations]);

  const updateLocation = useCallback((id: string, updates: Partial<Location>) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, ...updates } : loc
    ));
  }, []);

  return (
    <LocationContext.Provider value={{
      locations,
      addLocations,
      removeLocation,
      getLocationById,
      updateLocation,
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocations() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationProvider');
  }
  return context;
}
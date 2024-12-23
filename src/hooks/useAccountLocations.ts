import { useState, useCallback } from 'react';
import type { GBPLocation } from '../types/gbp-fields';

export function useAccountLocations(initialLocations: GBPLocation[] = []) {
  const [locations, setLocations] = useState<GBPLocation[]>(initialLocations);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(
    new Set(initialLocations.map(loc => loc.id))
  );

  const toggleLocation = useCallback((locationId: string) => {
    setSelectedLocations(prev => {
      const next = new Set(prev);
      if (next.has(locationId)) {
        next.delete(locationId);
      } else {
        next.add(locationId);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback((locationsToToggle: GBPLocation[]) => {
    const allSelected = locationsToToggle.every(loc => selectedLocations.has(loc.id));
    
    setSelectedLocations(prev => {
      const next = new Set(prev);
      locationsToToggle.forEach(loc => {
        if (allSelected) {
          next.delete(loc.id);
        } else {
          next.add(loc.id);
        }
      });
      return next;
    });
  }, [selectedLocations]);

  const updateLocations = useCallback((newLocations: GBPLocation[]) => {
    setLocations(newLocations);
    setSelectedLocations(new Set(newLocations.map(loc => loc.id)));
  }, []);

  return {
    locations,
    selectedLocations,
    toggleLocation,
    toggleAll,
    updateLocations
  };
}
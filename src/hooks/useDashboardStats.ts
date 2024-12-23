import { useState, useEffect } from 'react';
import type { Location } from '../types';
import type { DashboardStats } from '../types/dashboard';

export function useDashboardStats(locations: Location[]): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>({
    totalLocations: 0,
    pendingChanges: 0,
    changesToday: 0,
    totalChanges: 0
  });

  useEffect(() => {
    setStats({
      totalLocations: locations.length,
      pendingChanges: locations.filter(loc => loc.status === 'pending').length,
      changesToday: 15, // This would come from an API
      totalChanges: 1284 // This would come from an API
    });
  }, [locations]);

  return stats;
}
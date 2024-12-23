import type { ChangeLog, Location } from '../types';
import { isWithinDateRange } from './date';

export const filterHistory = (
  history: (ChangeLog & { locationName: string })[],
  filters: {
    searchTerm: string;
    dateRange: { start: string; end: string };
    selectedSources: string[];
    selectedLocations: Location[];
  }
) => {
  const { searchTerm, dateRange, selectedSources, selectedLocations } = filters;
  const searchTermLower = searchTerm.toLowerCase().trim();

  return history.filter(item => {
    // Search term filter
    const searchMatch = !searchTermLower || [
      item.field,
      item.oldValue,
      item.newValue,
      item.locationName
    ].some(field => field.toLowerCase().includes(searchTermLower));

    // Date range filter
    const dateMatch = isWithinDateRange(
      new Date(item.timestamp),
      dateRange.start ? new Date(dateRange.start) : null,
      dateRange.end ? new Date(dateRange.end) : null
    );

    // Source filter
    const sourceMatch = selectedSources.length === 0 || selectedSources.includes(item.source);

    // Location filter
    const locationMatch = selectedLocations.length === 0 || 
      selectedLocations.some(loc => loc.id === item.locationId);

    return searchMatch && dateMatch && sourceMatch && locationMatch;
  });
};
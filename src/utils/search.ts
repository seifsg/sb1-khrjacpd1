import { Location } from '../types';

export const searchableFields: (keyof Location)[] = [
  'name',
  'storeCode',
  'address',
  'phone',
  'category',
  'website',
  'status'
];

export function searchLocations(locations: Location[], searchTerm: string): Location[] {
  if (!searchTerm.trim()) return locations;
  
  const normalizedTerm = searchTerm.toLowerCase().trim();
  
  return locations.filter(location => {
    return searchableFields.some(field => {
      const value = location[field];
      
      if (!value) return false;
      
      if (Array.isArray(value)) {
        return value.some(item => 
          item.toLowerCase().includes(normalizedTerm)
        );
      }
      
      return String(value).toLowerCase().includes(normalizedTerm);
    });
  });
}
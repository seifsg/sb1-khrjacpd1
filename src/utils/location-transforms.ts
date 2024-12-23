import type { Location } from '../types';
import type { GBPLocation } from '../types/gbp-fields';

export function transformGBPToLocation(gbpLocation: GBPLocation): Location {
  return {
    id: gbpLocation.id,
    name: gbpLocation.businessName,
    address: `${gbpLocation.address.street}, ${gbpLocation.address.city}, ${gbpLocation.address.state} ${gbpLocation.address.postalCode}`,
    phone: gbpLocation.phone.primary,
    category: gbpLocation.categories,
    website: gbpLocation.website,
    status: gbpLocation.status
  };
}

export function transformGBPLocationsToLocations(gbpLocations: GBPLocation[]): Location[] {
  return gbpLocations.map(transformGBPToLocation);
}
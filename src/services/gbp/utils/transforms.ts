import type { GBPLocation } from '../../../types/gbp-fields';

export function transformGoogleLocation(googleLocation: any): GBPLocation {
  return {
    id: googleLocation.name,
    businessName: googleLocation.title,
    storeCode: googleLocation.storeCode,
    description: googleLocation.profile?.description,
    address: {
      street: googleLocation.storefrontAddress.addressLines.join(' '),
      city: googleLocation.storefrontAddress.locality,
      state: googleLocation.storefrontAddress.administrativeArea,
      postalCode: googleLocation.storefrontAddress.postalCode,
      country: googleLocation.storefrontAddress.regionCode
    },
    phone: {
      primary: googleLocation.primaryPhone
    },
    categories: googleLocation.categories?.map((cat: any) => cat.displayName) || [],
    website: googleLocation.websiteUri,
    status: mapLocationStatus(googleLocation.status),
    lastUpdated: new Date(googleLocation.updateTime)
  };
}

export function transformToGoogleLocation(location: Partial<GBPLocation>): any {
  const googleLocation: any = {};

  if (location.businessName) {
    googleLocation.title = location.businessName;
  }

  if (location.storeCode) {
    googleLocation.storeCode = location.storeCode;
  }

  if (location.description) {
    if (!googleLocation.profile) googleLocation.profile = {};
    googleLocation.profile.description = location.description;
  }

  if (location.address) {
    googleLocation.storefrontAddress = {
      addressLines: [location.address.street],
      locality: location.address.city,
      administrativeArea: location.address.state,
      postalCode: location.address.postalCode,
      regionCode: location.address.country
    };
  }

  if (location.phone?.primary) {
    googleLocation.primaryPhone = location.phone.primary;
  }

  if (location.categories) {
    googleLocation.categories = location.categories.map(cat => ({
      displayName: cat,
      categoryId: '' // You'll need to map this to actual GBP category IDs
    }));
  }

  if (location.website) {
    googleLocation.websiteUri = location.website;
  }

  return googleLocation;
}

function mapLocationStatus(status: string): 'active' | 'pending' | 'suspended' {
  switch (status) {
    case 'PUBLISHED':
      return 'active';
    case 'PENDING':
      return 'pending';
    case 'SUSPENDED':
      return 'suspended';
    default:
      return 'pending';
  }
}
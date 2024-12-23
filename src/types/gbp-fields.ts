export interface GBPAccount {
  name: string;
  accountName: string;
  type: 'PERSONAL' | 'LOCATION_GROUP' | 'ORGANIZATION';
  role?: 'OWNER' | 'PRIMARY_OWNER' | 'MANAGER';
  state: {
    status: 'VERIFIED' | 'UNVERIFIED';
  };
  profilePhotoUrl?: string;
  accountNumber?: string;
  permissionLevel?: 'OWNER_LEVEL' | 'MEMBER_LEVEL';
}

export interface GBPLocation {
  name: string;
  locationName: string;
  primaryPhone?: string;
  websiteUri?: string;
  regularHours?: BusinessHours;
  categories?: string[];
  storefrontAddress?: {
    addressLines: string[];
    locality: string;
    administrativeArea: string;
    postalCode: string;
    regionCode: string;
  };
}
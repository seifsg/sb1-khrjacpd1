import type { GBPLocation } from '../../types/gbp-fields';

// Mock data for development
export const mockLocations: GBPLocation[] = [
  {
    id: 'loc1',
    businessName: 'Downtown Coffee Shop',
    storeCode: 'DT001',
    description: 'Cozy coffee shop in downtown',
    address: {
      street: '123 Main St',
      city: 'Downtown',
      state: 'CA',
      postalCode: '90210',
      country: 'US'
    },
    phone: {
      primary: '(555) 123-4567'
    },
    categories: ['Coffee Shop', 'Cafe'],
    website: 'https://example.com/downtown',
    status: 'active',
    lastUpdated: new Date()
  },
  {
    id: 'loc2',
    businessName: 'Uptown Bistro',
    storeCode: 'UP002',
    description: 'Fine dining in uptown',
    address: {
      street: '456 High St',
      city: 'Uptown',
      state: 'CA',
      postalCode: '90211',
      country: 'US'
    },
    phone: {
      primary: '(555) 987-6543'
    },
    categories: ['Restaurant', 'Bistro'],
    website: 'https://example.com/uptown',
    status: 'active',
    lastUpdated: new Date()
  }
];

// Mock auth response
export const mockAuthResponse = {
  tokens: {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expiry_date: Date.now() + 3600000
  },
  userInfo: {
    id: 'user123',
    email: 'business@example.com',
    name: 'Business Account',
    picture: undefined
  }
};
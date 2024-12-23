import type { GBPLocation } from '../../types/gbp-fields';

// Mock data store
const mockLocations: GBPLocation[] = [
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
  },
  {
    id: 'loc3',
    businessName: 'West Side Market',
    storeCode: 'WS003',
    description: 'Fresh produce and local goods',
    address: {
      street: '789 West Ave',
      city: 'Westside',
      state: 'CA',
      postalCode: '90212',
      country: 'US'
    },
    phone: {
      primary: '(555) 456-7890'
    },
    categories: ['Market', 'Grocery Store'],
    website: 'https://example.com/westside',
    status: 'active',
    lastUpdated: new Date()
  }
];

// Mock auth data
const mockAccounts = new Map([
  ['business@example.com', {
    id: 'acc1',
    email: 'business@example.com',
    name: 'Business Account',
    locations: ['loc1', 'loc2']
  }]
]);

export const mockService = {
  async authenticate(email: string) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const account = mockAccounts.get(email);
    if (!account) {
      // Create new account if it doesn't exist
      const newAccount = {
        id: `acc${mockAccounts.size + 1}`,
        email,
        name: email.split('@')[0],
        locations: []
      };
      mockAccounts.set(email, newAccount);
      return {
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name
      };
    }
    return {
      id: account.id,
      email: account.email,
      name: account.name
    };
  },

  async listLocations(accountId: string): Promise<GBPLocation[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const account = Array.from(mockAccounts.values()).find(acc => acc.id === accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return mockLocations.filter(loc => account.locations.includes(loc.id));
  },

  async updateLocation(locationId: string, updates: Partial<GBPLocation>): Promise<GBPLocation> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const location = mockLocations.find(loc => loc.id === locationId);
    if (!location) {
      throw new Error('Location not found');
    }

    Object.assign(location, updates, { lastUpdated: new Date() });
    return location;
  },

  async getAvailableLocations(accountId: string): Promise<GBPLocation[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const account = Array.from(mockAccounts.values()).find(acc => acc.id === accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    // Return mock locations that aren't already associated with the account
    return mockLocations.filter(loc => !account.locations.includes(loc.id));
  }
};
import type { GoogleAuthResponse, GoogleAccount } from '../types/google-account';
import type { GBPLocation } from '../types/gbp-fields';

export async function connectGoogleAccount(response: GoogleAuthResponse): Promise<GoogleAccount> {
  // In a real app, this would validate the OAuth response and create the account
  return {
    id: crypto.randomUUID(),
    email: response.email,
    name: response.name,
    profilePicture: response.picture,
    connectedAt: new Date(),
    lastSynced: new Date(),
    locations: []
  };
}

export async function fetchAvailableLocations(accountId: string): Promise<GBPLocation[]> {
  // In a real app, this would fetch from the Google Business Profile API
  return [
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
}
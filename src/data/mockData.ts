import type { Location, ChangeLog } from '../types';

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Downtown Coffee Shop',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    category: ['Coffee Shop', 'Cafe'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Uptown Branch',
    address: '456 High St, Uptown',
    phone: '(555) 987-6543',
    category: ['Restaurant'],
    status: 'pending'
  },
  {
    id: '3',
    name: 'West Side Shop',
    address: '789 West Ave',
    phone: '(555) 456-7890',
    category: ['Retail'],
    status: 'active'
  }
];

export const mockHistory: (ChangeLog & { locationName: string })[] = [
  {
    id: '1',
    locationId: '1',
    locationName: 'Downtown Coffee Shop',
    field: 'Business Hours',
    oldValue: '9:00 AM - 5:00 PM',
    newValue: '8:00 AM - 6:00 PM',
    source: 'owner',
    timestamp: new Date('2024-03-09T10:00:00'),
    status: 'approved'
  },
  {
    id: '2',
    locationId: '2',
    locationName: 'Uptown Branch',
    field: 'Phone Number',
    oldValue: '(555) 123-4567',
    newValue: '(555) 987-6543',
    source: 'manager',
    timestamp: new Date('2024-03-09T09:30:00'),
    status: 'rejected'
  },
  {
    id: '3',
    locationId: '3',
    locationName: 'West Side Shop',
    field: 'Website',
    oldValue: 'www.oldsite.com',
    newValue: 'www.newsite.com',
    source: 'google',
    timestamp: new Date('2024-03-08T15:45:00'),
    status: 'approved'
  }
];
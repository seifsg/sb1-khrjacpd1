import type { GBPAuthResponse } from '../types';

export const mockAuthResponse: GBPAuthResponse = {
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
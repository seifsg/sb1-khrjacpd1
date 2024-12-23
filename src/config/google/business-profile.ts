import { Environment } from '../environment';

export const BusinessProfileConfig = {
  api: {
    baseUrl: 'https://mybusinessbusinessinformation.googleapis.com',
    version: 'v1',
    endpoints: {
      accounts: '/accounts',
      locations: '/locations',
      media: '/media',
      attributes: '/attributes',
      categories: '/categories'
    }
  },

  features: {
    mockEnabled: Environment.isDevelopment,
    cacheEnabled: true,
    retryEnabled: true
  },

  limits: {
    maxLocationsPerRequest: 100,
    maxMediaPerLocation: 50,
    maxRetries: 3
  },

  timeouts: {
    request: 30000, // 30 seconds
    cache: 300000   // 5 minutes
  }
} as const;
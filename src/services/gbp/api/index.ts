export { accountsApi } from './accounts';
export { locationsApi } from './locations';
export { withRetry } from '../retry';
export { GBPCache } from '../cache';

export const API_CONFIG = {
  baseUrl: 'https://mybusinessbusinessinformation.googleapis.com/v1',
  retryOptions: {
    maxAttempts: 3,
    delayMs: 1000,
    backoffFactor: 2
  },
  cacheExpiry: 5 * 60 * 1000 // 5 minutes
};
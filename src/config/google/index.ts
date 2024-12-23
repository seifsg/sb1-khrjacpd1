import { GoogleAuthConfig } from './auth';
import { BusinessProfileConfig } from './business-profile';
import { validateConfig } from './validation';
import { HTTP_STATUS, ERROR_MESSAGES, CACHE_KEYS } from './constants';

// Validate configurations
validateConfig(GoogleAuthConfig);
validateConfig(BusinessProfileConfig);

export const GoogleConfig = {
  auth: GoogleAuthConfig,
  businessProfile: BusinessProfileConfig,
  status: HTTP_STATUS,
  errors: ERROR_MESSAGES,
  cache: CACHE_KEYS
} as const;

// Type exports
export * from './types';
export { GoogleAuthConfig, BusinessProfileConfig };
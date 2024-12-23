// Auth configuration types
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface AuthEndpoints {
  token: string;
  userInfo: string;
  tokenInfo: string;
}

export interface AuthOptions {
  accessType: 'online' | 'offline';
  prompt?: 'none' | 'consent' | 'select_account';
  responseType: 'code' | 'token';
}

// Business Profile configuration types
export interface ApiConfig {
  baseUrl: string;
  version: string;
  endpoints: Record<string, string>;
}

export interface FeatureFlags {
  mockEnabled: boolean;
  cacheEnabled: boolean;
  retryEnabled: boolean;
}

export interface ApiLimits {
  maxLocationsPerRequest: number;
  maxMediaPerLocation: number;
  maxRetries: number;
}

export interface TimeoutConfig {
  request: number;
  cache: number;
}
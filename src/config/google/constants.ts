// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CONFIG: 'Invalid configuration provided',
  AUTH_REQUIRED: 'Authentication required',
  TOKEN_EXPIRED: 'Access token has expired',
  RATE_LIMITED: 'API rate limit exceeded',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_SCOPE: 'Invalid or insufficient scope'
} as const;

// Cache Keys
export const CACHE_KEYS = {
  AUTH_TOKEN: 'google_auth_token',
  USER_INFO: 'google_user_info',
  LOCATIONS: 'google_locations',
  CATEGORIES: 'google_categories'
} as const;
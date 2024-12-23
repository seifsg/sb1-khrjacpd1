export class GBPError extends Error {
  constructor(message: string, public code?: string, public details?: any) {
    super(message);
    this.name = 'GBPError';
  }
}

export class GBPAuthError extends GBPError {
  constructor(message: string, details?: any) {
    super(message, 'AUTH_ERROR', details);
    this.name = 'GBPAuthError';
  }
}

export class GBPLocationError extends GBPError {
  constructor(message: string, details?: any) {
    super(message, 'LOCATION_ERROR', details);
    this.name = 'GBPLocationError';
  }
}
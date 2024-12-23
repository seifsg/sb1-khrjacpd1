import { GBPError } from '../errors';
import type { GBPLocation } from '../../../types/gbp-fields';

export function validateLocationUpdate(location: Partial<GBPLocation>): void {
  if (location.businessName && location.businessName.length < 3) {
    throw new GBPError('Business name must be at least 3 characters long');
  }

  if (location.phone?.primary && !isValidPhoneNumber(location.phone.primary)) {
    throw new GBPError('Invalid phone number format');
  }

  if (location.website && !isValidUrl(location.website)) {
    throw new GBPError('Invalid website URL format');
  }
}

function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
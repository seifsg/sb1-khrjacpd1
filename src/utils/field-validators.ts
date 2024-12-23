import { GBPFieldType, GBPLocation } from '../types/gbp-fields';

const PHONE_REGEX = /^\+?[\d\s-()]+$/;
const URL_REGEX = /^https?:\/\/.+/;
const TIME_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export function validateFieldValue(field: GBPFieldType, value: any): string[] {
  const errors: string[] = [];

  switch (field) {
    case 'business_name':
      if (!value || typeof value !== 'string') {
        errors.push('Business name is required');
      } else if (value.length < 3 || value.length > 100) {
        errors.push('Business name must be between 3 and 100 characters');
      }
      break;

    case 'phone':
      if (!value.primary || !PHONE_REGEX.test(value.primary)) {
        errors.push('Invalid primary phone number format');
      }
      if (value.additional?.some((phone: string) => !PHONE_REGEX.test(phone))) {
        errors.push('Invalid additional phone number format');
      }
      break;

    case 'website':
      if (value && !URL_REGEX.test(value)) {
        errors.push('Invalid website URL format');
      }
      break;

    case 'hours':
      Object.entries(value || {}).forEach(([day, hours]: [string, any]) => {
        if (hours && !hours.isClosed) {
          if (!TIME_REGEX.test(hours.open)) {
            errors.push(`Invalid opening time format for ${day}`);
          }
          if (!TIME_REGEX.test(hours.close)) {
            errors.push(`Invalid closing time format for ${day}`);
          }
        }
      });
      break;

    case 'categories':
      if (!Array.isArray(value) || value.length === 0) {
        errors.push('At least one category is required');
      }
      break;
  }

  return errors;
}

export function validateLocation(location: Partial<GBPLocation>): string[] {
  const errors: string[] = [];

  // Required fields
  if (!location.businessName) {
    errors.push('Business name is required');
  }

  if (!location.address) {
    errors.push('Address is required');
  } else {
    const { street, city, state, postalCode, country } = location.address;
    if (!street || !city || !state || !postalCode || !country) {
      errors.push('All address fields are required');
    }
  }

  if (!location.phone?.primary) {
    errors.push('Primary phone number is required');
  }

  if (!location.categories?.length) {
    errors.push('At least one category is required');
  }

  return errors;
}
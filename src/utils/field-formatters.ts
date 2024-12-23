import { GBPFieldType, GBPFieldChange, BusinessHours, SpecialHours } from '../types/gbp-fields';

export function formatFieldValue(field: GBPFieldType, value: any): string {
  if (value === null || value === undefined) return 'Not set';

  switch (field) {
    case 'business_name':
    case 'store_code':
    case 'description':
    case 'website':
      return String(value);

    case 'address':
      return `${value.street}, ${value.city}, ${value.state} ${value.postalCode}`;

    case 'phone':
      return Array.isArray(value) ? value.join(', ') : value.primary;

    case 'categories':
      return Array.isArray(value) ? value.join(', ') : value;

    case 'hours':
      return formatBusinessHours(value as BusinessHours);

    case 'special_hours':
      return formatSpecialHours(value as SpecialHours[]);

    case 'opening_date':
      return new Date(value).toLocaleDateString();

    case 'services':
      return Array.isArray(value) 
        ? value.map(service => service.name).join(', ')
        : '';

    case 'attributes':
      return Array.isArray(value)
        ? value.map(attr => `${attr.name}: ${attr.value}`).join(', ')
        : '';

    case 'photos':
      return Array.isArray(value)
        ? `${value.length} photos`
        : '0 photos';

    default:
      return String(value);
  }
}

function formatBusinessHours(hours: BusinessHours): string {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return days
    .map(day => {
      const dayHours = hours[day as keyof BusinessHours];
      if (!dayHours) return `${day}: Closed`;
      if (dayHours.isClosed) return `${day}: Closed`;
      return `${day}: ${dayHours.open} - ${dayHours.close}`;
    })
    .join('\n');
}

function formatSpecialHours(hours: SpecialHours[]): string {
  return hours
    .map(hour => {
      if (hour.isClosed) return `${hour.date}: Closed`;
      return `${hour.date}: ${hour.open} - ${hour.close}`;
    })
    .join('\n');
}

export function getFieldChangeDescription(change: GBPFieldChange): string {
  const { field, oldValue, newValue, metadata } = change;
  
  switch (field) {
    case 'business_name':
      return 'Business name updated';
    case 'phone':
      return metadata?.subField === 'additional'
        ? 'Additional phone number changed'
        : 'Primary phone number changed';
    case 'hours':
      return metadata?.subField
        ? `Business hours updated for ${metadata.subField}`
        : 'Business hours updated';
    case 'categories':
      return Array.isArray(newValue)
        ? `Categories ${newValue.length > (oldValue?.length || 0) ? 'added' : 'removed'}`
        : 'Categories updated';
    case 'photos':
      return `Photos ${Array.isArray(newValue) && newValue.length > (oldValue?.length || 0) ? 'added' : 'removed'}`;
    default:
      return `${field.replace('_', ' ')} updated`;
  }
}
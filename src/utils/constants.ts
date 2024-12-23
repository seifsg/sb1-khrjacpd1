export const SOURCES = ['google', 'owner', 'manager', 'system'] as const;

export const SOURCE_OPTIONS = SOURCES.map(source => ({
  value: source,
  label: source.charAt(0).toUpperCase() + source.slice(1)
}));

export const STATUS_OPTIONS = ['active', 'pending', 'suspended'] as const;

export const FIELD_TYPES = [
  'Business Hours',
  'Phone Number',
  'Website',
  'Address',
  'Categories',
  'Description',
  'Name',
  'Photos',
  'Attributes'
] as const;
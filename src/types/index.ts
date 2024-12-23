export interface Location {
  id: string;
  name: string;
  storeCode?: string;
  address: string;
  phone: string;
  category: string[];
  website?: string;
  hours?: BusinessHours;
  status: 'active' | 'pending' | 'suspended';
}

export interface BusinessHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface ChangeLog {
  id: string;
  locationId: string;
  field: string;
  oldValue: string;
  newValue: string;
  source: 'google' | 'owner' | 'manager' | 'system';
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}
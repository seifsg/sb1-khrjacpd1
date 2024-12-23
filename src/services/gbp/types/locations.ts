```typescript
import { BusinessHours } from '../../../types';

export interface GBPLocation {
  name: string;
  locationName: string;
  primaryPhone?: string;
  websiteUri?: string;
  regularHours?: BusinessHours;
  categories?: string[];
  storefrontAddress?: {
    addressLines: string[];
    locality: string;
    administrativeArea: string;
    postalCode: string;
    regionCode: string;
  };
}

export interface LocationsResponse {
  locations: GBPLocation[];
  nextPageToken?: string;
}
```
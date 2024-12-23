import React from 'react';
import BasicInformation from './sections/BasicInformation';
import AddressCategories from './sections/AddressCategories';
import BusinessHours from './sections/BusinessHours';
import Services from './sections/Services';
import Attributes from './sections/Attributes';
import Photos from './sections/Photos';
import type { Location } from '../../types';

interface LocationDetailsContentProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const LocationDetailsContent: React.FC<LocationDetailsContentProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BasicInformation location={location} onUpdate={onUpdate} />
        <AddressCategories location={location} onUpdate={onUpdate} />
      </div>

      <BusinessHours location={location} onUpdate={onUpdate} />
      <Services location={location} onUpdate={onUpdate} />
      <Attributes location={location} onUpdate={onUpdate} />
      <Photos location={location} onUpdate={onUpdate} />
    </div>
  );
};

export default LocationDetailsContent;
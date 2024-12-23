import React from 'react';
import EditableField from '../../common/EditableField';
import type { Location } from '../../../types';

interface BasicInformationProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      <EditableField
        label="Business Name"
        value={location.name}
        onSave={(value) => onUpdate('name', value, location.name)}
      />
      <EditableField
        label="Store Code"
        value={location.storeCode || ''}
        onSave={(value) => onUpdate('storeCode', value, location.storeCode || '')}
      />
      <EditableField
        label="Phone Number"
        value={location.phone}
        type="tel"
        onSave={(value) => onUpdate('phone', value, location.phone)}
      />
      <EditableField
        label="Website"
        value={location.website || ''}
        type="url"
        onSave={(value) => onUpdate('website', value, location.website || '')}
      />
    </div>
  );
};

export default BasicInformation;
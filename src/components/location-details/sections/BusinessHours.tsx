import React from 'react';
import EditableHours from '../../common/EditableHours';
import type { Location } from '../../../types';
import type { BusinessHours as BusinessHoursType } from '../../../types/gbp-fields';

interface BusinessHoursProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const BusinessHours: React.FC<BusinessHoursProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
      <EditableHours
        hours={location.hours}
        onSave={async (hours) => {
          await onUpdate('hours', JSON.stringify(hours), JSON.stringify(location.hours || {}));
        }}
      />
    </div>
  );
};

export default BusinessHours;
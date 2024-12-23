import React from 'react';
import EditableServices from '../../common/EditableServices';
import type { Location } from '../../../types';
import type { GBPService } from '../../../types/gbp-fields';

interface ServicesProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const Services: React.FC<ServicesProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Services</h3>
      <EditableServices
        services={[]}
        onSave={async (services) => {
          await onUpdate('services', JSON.stringify(services), '[]');
        }}
      />
    </div>
  );
};

export default Services;
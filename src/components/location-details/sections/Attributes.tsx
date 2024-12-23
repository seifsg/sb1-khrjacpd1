import React from 'react';
import EditableAttributes from '../../common/EditableAttributes';
import type { Location } from '../../../types';
import type { GBPAttribute } from '../../../types/gbp-fields';

interface AttributesProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const Attributes: React.FC<AttributesProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Attributes</h3>
      <EditableAttributes
        attributes={[]}
        onSave={async (attributes) => {
          await onUpdate('attributes', JSON.stringify(attributes), '[]');
        }}
      />
    </div>
  );
};

export default Attributes;
import React from 'react';
import EditableField from '../../common/EditableField';
import EditableCategories from '../../common/EditableCategories';
import type { Location } from '../../../types';

interface AddressCategoriesProps {
  location: Location;
  onUpdate: (field: string, newValue: string, oldValue: string) => Promise<void>;
}

const AddressCategories: React.FC<AddressCategoriesProps> = ({
  location,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      <EditableField
        label="Address"
        value={location.address}
        onSave={(value) => onUpdate('address', value, location.address)}
      />
      <EditableCategories
        categories={Array.isArray(location.category) ? location.category : [location.category]}
        onSave={async (categories) => {
          await onUpdate('category', categories.join(','), location.category.join(','));
        }}
      />
    </div>
  );
};

export default AddressCategories;
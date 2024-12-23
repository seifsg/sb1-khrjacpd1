import React, { useState } from 'react';
import { X } from 'lucide-react';
import LocationManagementList from './LocationManagementList';
import type { GoogleAccount } from '../../types/google-account';
import type { GBPLocation } from '../../types/gbp-fields';

interface ManageLocationsModalProps {
  isOpen: boolean;
  account: GoogleAccount;
  onClose: () => void;
  onUpdateLocations: (accountId: string, locations: GBPLocation[]) => void;
}

const ManageLocationsModal: React.FC<ManageLocationsModalProps> = ({
  isOpen,
  account,
  onClose,
  onUpdateLocations,
}) => {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(account.locations.map(loc => loc.id))
  );

  if (!isOpen) return null;

  const handleToggleLocation = (locationId: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(locationId)) {
      newSelected.delete(locationId);
    } else {
      newSelected.add(locationId);
    }
    setSelected(newSelected);
  };

  const handleSave = () => {
    const updatedLocations = account.locations.filter(loc => selected.has(loc.id));
    onUpdateLocations(account.id, updatedLocations);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Manage Locations</h2>
            <p className="text-sm text-gray-500 mt-1">{account.email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <LocationManagementList
            locations={account.locations}
            selectedLocations={selected}
            onToggleLocation={handleToggleLocation}
          />
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageLocationsModal;
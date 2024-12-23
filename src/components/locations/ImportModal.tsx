import React, { useState, useMemo } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useGoogleAccount } from '../../context/GoogleAccountContext';
import type { Location } from '../../types';
import type { GBPLocation } from '../../types/gbp-fields';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (locations: Location[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const { accounts, addLocations } = useGoogleAccount();
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all currently monitored location IDs across all accounts
  const monitoredLocationIds = useMemo(() => {
    const ids = new Set<string>();
    accounts.forEach(account => {
      account.locations.forEach(loc => ids.add(loc.id));
    });
    return ids;
  }, [accounts]);

  // Get unimported locations for the selected account
  const availableLocations = useMemo(() => {
    if (!selectedAccount) return [];
    
    const account = accounts.find(a => a.id === selectedAccount);
    if (!account) return [];

    // Sample additional locations that aren't yet imported
    const additionalLocations: GBPLocation[] = [{
      id: 'loc3',
      businessName: 'West Side Market',
      storeCode: 'WS003',
      description: 'Fresh produce and local goods',
      address: {
        street: '789 West Ave',
        city: 'Westside',
        state: 'CA',
        postalCode: '90212',
        country: 'US'
      },
      phone: {
        primary: '(555) 456-7890'
      },
      categories: ['Market', 'Grocery Store'],
      website: 'https://example.com/westside',
      status: 'active',
      lastUpdated: new Date()
    }];

    return additionalLocations.filter(loc => !monitoredLocationIds.has(loc.id));
  }, [selectedAccount, accounts, monitoredLocationIds]);

  const handleToggleLocation = (id: string) => {
    const newSelected = new Set(selectedLocations);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLocations(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLocations.size === availableLocations.length) {
      setSelectedLocations(new Set());
    } else {
      setSelectedLocations(new Set(availableLocations.map(loc => loc.id)));
    }
  };

  const handleImport = async () => {
    if (!selectedAccount) {
      setError('Please select a Google account');
      return;
    }

    setIsLoading(true);
    try {
      const locationsToImport = availableLocations.filter(loc => selectedLocations.has(loc.id));
      addLocations(selectedAccount, locationsToImport);
      onImport(locationsToImport.map(loc => ({
        id: loc.id,
        name: loc.businessName,
        address: `${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.postalCode}`,
        phone: loc.phone.primary,
        category: loc.categories,
        website: loc.website,
        status: loc.status
      })));
      onClose();
    } catch (err) {
      setError('Failed to import locations');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Import from Google Business Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Account Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Google Account
            </label>
            {accounts.length > 0 ? (
              <select
                value={selectedAccount}
                onChange={(e) => {
                  setSelectedAccount(e.target.value);
                  setSelectedLocations(new Set());
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an account</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.email}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
                <AlertCircle size={20} />
                <p>No Google accounts connected. Please connect an account first.</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {/* Available Locations */}
          {selectedAccount && (
            <div className="space-y-4">
              {availableLocations.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Available Locations</h3>
                    <button
                      onClick={handleSelectAll}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {selectedLocations.size === availableLocations.length
                        ? 'Deselect All'
                        : 'Select All'}
                    </button>
                  </div>
                  {availableLocations.map(location => (
                    <label
                      key={location.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocations.has(location.id)}
                        onChange={() => handleToggleLocation(location.id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{location.businessName}</h3>
                        <p className="text-sm text-gray-500">{location.address.street}, {location.address.city}</p>
                        <div className="mt-1 text-sm text-gray-500">
                          Categories: {location.categories.join(', ')}
                        </div>
                      </div>
                    </label>
                  ))}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No available locations found for this account
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={selectedLocations.size === 0 || !selectedAccount || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Importing...' : 'Import Selected'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
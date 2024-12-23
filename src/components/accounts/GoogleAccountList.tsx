import React from 'react';
import { MapPin, Calendar, RefreshCw, Trash2 } from 'lucide-react';
import type { GoogleAccount } from '../../types/google-account';

interface GoogleAccountListProps {
  accounts: GoogleAccount[];
  onRemoveAccount: (account: GoogleAccount) => void;
  onManageLocations: (account: GoogleAccount) => void;
}

const GoogleAccountList: React.FC<GoogleAccountListProps> = ({
  accounts,
  onRemoveAccount,
  onManageLocations,
}) => {
  if (accounts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Google accounts connected</h3>
        <p className="text-gray-500">
          Connect your Google account to start monitoring your business profiles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div key={account.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {account.profilePicture ? (
                <img
                  src={account.profilePicture}
                  alt={account.name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {account.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">{account.name}</h3>
                <p className="text-gray-500">{account.email}</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveAccount(account)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Remove account"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <span>Connected {new Date(account.connectedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <RefreshCw size={16} />
              <span>Last synced {new Date(account.lastSynced).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={16} />
              <span>{account.locations.length} locations</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">Connected Locations</h4>
              <button
                onClick={() => onManageLocations(account)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Manage Locations
              </button>
            </div>
            {account.locations.length > 0 ? (
              <div className="space-y-2">
                {account.locations.slice(0, 3).map((location) => (
                  <div
                    key={location.id}
                    className="text-sm text-gray-600 flex items-center justify-between"
                  >
                    <span>{location.businessName}</span>
                    <span className="text-gray-400">
                      {location.address.city}, {location.address.state}
                    </span>
                  </div>
                ))}
                {account.locations.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{account.locations.length - 3} more locations
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No locations connected</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoogleAccountList;
import React from 'react';
import { Mail, Calendar, RefreshCw, MapPin, Trash2, ExternalLink } from 'lucide-react';
import Badge from '../common/Badge';
import type { GoogleAccount } from '../../types/google-account';
import type { GBPAccount, GBPLocation } from '../../types/gbp-fields';

interface AccountCardProps {
  account: GoogleAccount;
  gbpAccount?: GBPAccount;
  locations: GBPLocation[];
  onRemove: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  gbpAccount,
  locations,
  onRemove
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {account.profilePicture ? (
            <img
              src={account.profilePicture}
              alt={account.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="text-blue-600" size={20} />
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">{account.name}</h3>
            <p className="text-gray-500">{account.email}</p>
            {gbpAccount && (
              <Badge 
                status={gbpAccount.state.status === 'VERIFIED' ? 'active' : 'pending'}
                className="mt-2"
              />
            )}
          </div>
        </div>
        <button
          onClick={onRemove}
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
          <span>{locations.length} locations</span>
        </div>
      </div>

      {locations.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Connected Locations</h4>
          <div className="space-y-2">
            {locations.slice(0, 3).map((location) => (
              <div
                key={location.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">{location.locationName}</span>
                <a
                  href={location.websiteUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
            {locations.length > 3 && (
              <p className="text-sm text-gray-500">
                +{locations.length - 3} more locations
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCard;
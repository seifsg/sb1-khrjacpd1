import React from 'react';
import { Calendar, RefreshCw, MapPin } from 'lucide-react';
import type { GoogleAccount } from '../../types/google-account';

interface AccountStatsProps {
  account: GoogleAccount;
}

const AccountStats: React.FC<AccountStatsProps> = ({ account }) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
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
  );
};

export default AccountStats;
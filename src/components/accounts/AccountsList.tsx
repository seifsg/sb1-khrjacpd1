import React from 'react';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useGBPAccounts } from '../../hooks/useGBPAccounts';
import AccountCard from './AccountCard';
import type { GoogleAccount } from '../../types/google-account';

interface AccountsListProps {
  accounts: GoogleAccount[];
  onRemoveAccount: (account: GoogleAccount) => void;
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts, onRemoveAccount }) => {
  const { userEmail } = useGoogleAuth();
  const { accounts: gbpAccounts, locations, isLoading, error } = useGBPAccounts(userEmail);

  if (isLoading) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-red-600 mb-2">Error loading accounts</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts connected</h3>
        <p className="text-gray-500">
          Connect your Google account to start monitoring your business profiles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          gbpAccount={gbpAccounts.find(a => a.accountName === account.name)}
          locations={locations[account.id] || []}
          onRemove={() => onRemoveAccount(account)}
        />
      ))}
    </div>
  );
};

export default AccountsList;
import React, { useState } from 'react';
import ConnectAccountButton from '../components/accounts/ConnectAccountButton';
import AccountsList from '../components/accounts/AccountsList';
import { useGoogleAccount } from '../context/GoogleAccountContext';
import { useGBPAccounts } from '../hooks/useGBPAccounts';

const AccountsPage = () => {
  const { accounts } = useGoogleAccount();
  const { isLoading, error } = useGBPAccounts();

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Google Business Profile Accounts</h1>
            <p className="mt-1 text-gray-500">
              Manage your connected Google accounts and their business profiles
            </p>
          </div>
          <ConnectAccountButton />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            <p className="font-medium">Error loading accounts:</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        <AccountsList
          accounts={accounts}
          onRemoveAccount={(account) => {
            // Handle account removal
          }}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default AccountsPage;
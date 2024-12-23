import React from 'react';
import TokenInput from './TokenInput';
import RequestViewer from './RequestViewer';
import AccountsList from './AccountsList';
import LocationsList from './LocationsList';
import { useGBPTester } from '../../hooks/useGBPTester';

export default function GBPTester() {
  const {
    token,
    setToken,
    isLoading,
    accounts,
    locations,
    error,
    lastRequest,
    handleSubmit,
    handleAccountSelect
  } = useGBPTester();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">GBP API Tester</h1>

      <TokenInput
        token={token}
        setToken={setToken}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />

      <RequestViewer request={lastRequest} error={error} />

      <div className="space-y-6">
        {accounts.length > 0 && (
          <AccountsList
            accounts={accounts}
            isLoading={isLoading}
            onAccountSelect={handleAccountSelect}
          />
        )}

        {locations.length > 0 && (
          <LocationsList locations={locations} />
        )}
      </div>
    </div>
  );
}
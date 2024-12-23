import React from 'react';
import { Building, ArrowRight } from 'lucide-react';
import type { GBPAccount } from '../../types/gbp-fields';

interface AccountsListProps {
  accounts: GBPAccount[];
  isLoading: boolean;
  onAccountSelect: (accountName: string) => void;
}

export default function AccountsList({ accounts, isLoading, onAccountSelect }: AccountsListProps) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center gap-4 mb-4">
        <Building size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold">Business Accounts ({accounts.length})</h2>
      </div>
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.name} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{account.accountName}</h3>
                <p className="text-sm text-gray-500">{account.name}</p>
              </div>
              <button
                onClick={() => onAccountSelect(account.name)}
                disabled={isLoading}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <span>View Locations</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="text-sm">
              <p>Type: {account.type}</p>
              {account.role && <p>Role: {account.role}</p>}
              <p>Status: {account.state?.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
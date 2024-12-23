import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import type { GBPAccount } from '../../services/gbp/types';

interface AccountDetailsProps {
  account: GBPAccount;
  onUpdateName: (accountId: string, newName: string) => Promise<void>;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, onUpdateName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(account.accountName);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (newName === account.accountName) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const accountId = account.name.split('/')[1];
      await onUpdateName(accountId, newName);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update account name:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-start justify-between mb-6">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="p-2 text-green-600 hover:text-green-700 disabled:opacity-50"
            >
              <Check size={20} />
            </button>
            <button
              onClick={() => {
                setNewName(account.accountName);
                setIsEditing(false);
              }}
              disabled={isLoading}
              className="p-2 text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{account.accountName}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Edit2 size={20} />
            </button>
          </>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Account Type</dt>
          <dd className="mt-1 text-sm text-gray-900">{account.type}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Role</dt>
          <dd className="mt-1 text-sm text-gray-900">{account.role}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Verification Status</dt>
          <dd className="mt-1 text-sm text-gray-900">{account.verificationState}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Vetting Status</dt>
          <dd className="mt-1 text-sm text-gray-900">{account.vettedState}</dd>
        </div>
      </dl>
    </div>
  );
};

export default AccountDetails;
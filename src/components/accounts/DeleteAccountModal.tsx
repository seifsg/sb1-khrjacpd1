import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { GoogleAccount } from '../../types/google-account';

interface DeleteAccountModalProps {
  isOpen: boolean;
  account: GoogleAccount;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  account,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Remove Account</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-lg mb-6">
            <AlertTriangle size={24} />
            <p className="font-medium">This action cannot be undone</p>
          </div>

          <p className="text-gray-600 mb-4">
            Are you sure you want to remove <span className="font-medium">{account.email}</span>?
          </p>

          {account.locations.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-900 font-medium mb-2">
                The following locations will no longer be monitored:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                <ul className="space-y-2">
                  {account.locations.map((location) => (
                    <li key={location.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{location.businessName}</span>
                      <span className="text-gray-500">
                        {location.address.city}, {location.address.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
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
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Remove Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
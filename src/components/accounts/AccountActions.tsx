import React from 'react';
import { Trash2, Settings } from 'lucide-react';

interface AccountActionsProps {
  onRemove: () => void;
  onManage: () => void;
}

const AccountActions: React.FC<AccountActionsProps> = ({ onRemove, onManage }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onManage}
        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
        title="Manage locations"
      >
        <Settings size={20} />
      </button>
      <button
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Remove account"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default AccountActions;
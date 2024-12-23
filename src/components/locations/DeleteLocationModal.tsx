import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { Location } from '../../types';

interface DeleteLocationModalProps {
  isOpen: boolean;
  location: Location;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteLocationModal: React.FC<DeleteLocationModalProps> = ({
  isOpen,
  location,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Remove Location</h2>
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
            Are you sure you want to stop monitoring changes for:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">{location.name}</h3>
            <p className="text-gray-500 mt-1">{location.address}</p>
            {location.category && (
              <p className="text-gray-500 mt-1">
                Categories: {Array.isArray(location.category) ? location.category.join(', ') : location.category}
              </p>
            )}
          </div>
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
            Remove Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLocationModal;
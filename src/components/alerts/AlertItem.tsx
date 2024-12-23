import React from 'react';
import { Clock } from 'lucide-react';
import type { ChangeNotification } from '../../types/notification';

interface AlertItemProps {
  alert: ChangeNotification;
  onAccept: (alert: ChangeNotification) => void;
  onReject: (alert: ChangeNotification) => void;
}

const AlertItem = ({
  alert,
  onAccept,
  onReject,
}: AlertItemProps) => {
  return (
    <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
      <div className="flex items-start gap-4">
        <Clock className="text-blue-500 mt-1" size={20} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">
                {alert.field} Updated
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {alert.locationName}
              </p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(alert.timestamp).toLocaleDateString()}
            </span>
          </div>
          
          <div className="mt-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Previous value:</span>
              <span className="font-medium">{alert.oldValue}</span>
            </div>
            <div className="flex items-center justify-between text-gray-900 mt-1">
              <span>New value:</span>
              <span className="font-medium">{alert.newValue}</span>
            </div>
            <div className="mt-1 text-gray-500">
              Changed by: {alert.source}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onAccept(alert)}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Accept Change
            </button>
            <button
              onClick={() => onReject(alert)}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reject Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
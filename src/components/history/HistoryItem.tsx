import React from 'react';
import { MapPin } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/formatters';
import type { ChangeLog } from '../../types';

interface HistoryItemProps {
  item: ChangeLog;
  locationName: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, locationName }) => {
  return (
    <div
      className={`p-4 rounded-lg border ${
        item.status === 'approved'
          ? 'border-green-100 bg-green-50'
          : 'border-red-100 bg-red-50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">{locationName}</span>
          </div>
          <h3 className="font-medium text-gray-900 mt-2">
            {item.field} Change {item.status === 'approved' ? 'Approved' : 'Rejected'}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Changed by: {item.source}
          </p>
        </div>
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(item.timestamp)}
        </span>
      </div>

      <div className="mt-3 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Previous value:</span>
          <span className="font-medium">{item.oldValue}</span>
        </div>
        <div className="flex items-center justify-between text-gray-900 mt-1">
          <span>New value:</span>
          <span className="font-medium">{item.newValue}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
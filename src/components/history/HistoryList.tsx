import React from 'react';
import HistoryItem from './HistoryItem';
import type { ChangeLog } from '../../types';

interface HistoryListProps {
  history: (ChangeLog & { locationName: string })[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No history records found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryItem
          key={item.id}
          item={item}
          locationName={item.locationName}
        />
      ))}
    </div>
  );
};

export default HistoryList;
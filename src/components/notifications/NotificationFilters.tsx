import React from 'react';
import { Search } from 'lucide-react';

interface NotificationFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="p-4 border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search changes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default NotificationFilters;
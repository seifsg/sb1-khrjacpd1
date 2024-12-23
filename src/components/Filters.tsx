import React, { useState } from 'react';
import { X } from 'lucide-react';
import CategorySearch from './CategorySearch';

interface FiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    status: [] as string[],
    categories: [] as string[],
    lastUpdate: '',
  });

  const handleAddCategory = (category: string) => {
    if (!filters.categories.includes(category)) {
      setFilters(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-96 bg-white h-full p-6 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
            <div className="space-y-2">
              {['Active', 'Pending', 'Suspended'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={filters.status.includes(status.toLowerCase())}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        status: e.target.checked
                          ? [...prev.status, status.toLowerCase()]
                          : prev.status.filter(s => s !== status.toLowerCase())
                      }));
                    }}
                  />
                  <span className="ml-2 text-gray-600">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
            <CategorySearch onSelect={handleAddCategory} />
            
            {filters.categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {filters.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                  >
                    {category}
                    <button
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Last Update Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Last Update</h3>
            <select
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={filters.lastUpdate}
              onChange={(e) => setFilters(prev => ({ ...prev, lastUpdate: e.target.value }))}
            >
              <option value="">Any time</option>
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              console.log('Applied filters:', filters);
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
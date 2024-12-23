import React, { useState } from 'react';
import HistoryFilters from '../components/history/HistoryFilters';
import HistoryItem from '../components/history/HistoryItem';
import { filterHistory } from '../utils/filters';
import { useChangeLog } from '../context/ChangeLogContext';
import type { Location } from '../types';
import '../styles/datepicker.css';

// Mock data moved to a separate file
import { mockLocations } from '../data/mockData';

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const { history } = useChangeLog();

  const filteredHistory = filterHistory(history, {
    searchTerm,
    dateRange,
    selectedSources,
    selectedLocations
  });

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Change History</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <HistoryFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedSources={selectedSources}
            onSourcesChange={setSelectedSources}
            selectedLocations={selectedLocations}
            onLocationSelect={(location) => 
              setSelectedLocations(prev => [...prev, location])
            }
            onLocationRemove={(locationId) =>
              setSelectedLocations(prev => 
                prev.filter(loc => loc.id !== locationId)
              )
            }
            locations={mockLocations}
          />

          <div className="p-4">
            <div className="space-y-4">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No history records found
                </div>
              ) : (
                filteredHistory.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    locationName={item.locationName}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
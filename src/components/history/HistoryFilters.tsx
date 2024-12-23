import React from 'react';
import SearchFilter from './filters/SearchFilter';
import DateFilter from './filters/DateFilter';
import SourceFilter from './filters/SourceFilter';
import LocationSearch from './LocationSearch';
import type { Location } from '../../types';

interface HistoryFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  dateRange: { start: string; end: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
  selectedLocations: Location[];
  onLocationSelect: (location: Location) => void;
  onLocationRemove: (locationId: string) => void;
  locations: Location[];
}

const HistoryFilters: React.FC<HistoryFiltersProps> = (props) => {
  return (
    <div className="bg-white p-6 space-y-6">
      <SearchFilter
        searchTerm={props.searchTerm}
        onSearchChange={props.onSearchChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DateFilter
          dateRange={props.dateRange}
          onDateRangeChange={props.onDateRangeChange}
        />

        <SourceFilter
          selectedSources={props.selectedSources}
          onSourcesChange={props.onSourcesChange}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Locations</label>
          <LocationSearch
            locations={props.locations}
            selectedLocations={props.selectedLocations}
            onLocationSelect={props.onLocationSelect}
            onLocationRemove={props.onLocationRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;
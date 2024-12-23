import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import LocationsList from '../components/locations/LocationsList';
import LocationDetailsPage from './LocationDetailsPage';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ImportModal from '../components/locations/ImportModal';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { useGoogleAccount } from '../context/GoogleAccountContext';
import type { Location } from '../types';

const LocationsPage = () => {
  const { accounts } = useGoogleAccount();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Combine all locations from all accounts and transform to Location type
  const allLocations: Location[] = accounts.flatMap(account => 
    account.locations.map(loc => ({
      id: loc.id,
      name: loc.businessName,
      address: `${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.postalCode}`,
      phone: loc.phone.primary,
      category: loc.categories,
      website: loc.website,
      status: loc.status
    }))
  );

  const { searchTerm, setSearchTerm, filteredLocations } = useLocationSearch(allLocations);

  const handleImportLocations = (selectedLocations: Location[]) => {
    console.log('Importing locations:', selectedLocations);
    setIsImportOpen(false);
  };

  if (selectedLocation) {
    return (
      <LocationDetailsPage
        location={selectedLocation}
        onBack={() => setSelectedLocation(null)}
      />
    );
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
            <p className="mt-1 text-gray-500">
              Monitor and manage your Google Business Profile locations
            </p>
          </div>
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Import from GBP</span>
          </button>
        </div>

        {allLocations.length > 0 ? (
          <>
            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search locations..."
              />
              <button
                onClick={() => setIsFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>

            {/* Locations List */}
            <LocationsList
              locations={filteredLocations}
              onDelete={() => {}}
              onViewDetails={setSelectedLocation}
            />
          </>
        ) : (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
              <Plus size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No locations added yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Import your business locations from Google Business Profile to start monitoring changes.
            </p>
            <button
              onClick={() => setIsImportOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Import from GBP</span>
            </button>
          </div>
        )}

        {/* Import Modal */}
        <ImportModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
          onImport={handleImportLocations}
        />

        {/* Filters Modal */}
        <Filters
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
        />
      </div>
    </div>
  );
};

export default LocationsPage;
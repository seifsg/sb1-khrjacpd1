import React, { useState } from 'react';
import { Activity, MapPin, Bell, History } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import LocationsList from '../components/dashboard/LocationsList';
import LocationDetailsPage from './LocationDetailsPage';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { useGoogleAccount } from '../context/GoogleAccountContext';
import { useChangeLog } from '../context/ChangeLogContext';
import type { Location } from '../types';

const DashboardPage: React.FC<{ onLocationSelect: (location: Location | null) => void }> = ({ onLocationSelect }) => {
  const { accounts } = useGoogleAccount();
  const { history } = useChangeLog();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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

  const stats = {
    totalLocations: allLocations.length,
    pendingChanges: history.filter(item => item.status === 'pending').length,
    changesToday: history.filter(item => 
      new Date(item.timestamp).toDateString() === new Date().toDateString()
    ).length,
    totalChanges: history.length
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  if (selectedLocation) {
    return (
      <LocationDetailsPage
        location={selectedLocation}
        onBack={() => {
          setSelectedLocation(null);
          onLocationSelect(null);
        }}
      />
    );
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Locations"
            value={stats.totalLocations}
            icon={MapPin}
            color="blue"
          />
          <DashboardCard
            title="Pending Changes"
            value={stats.pendingChanges}
            icon={Bell}
            color="yellow"
          />
          <DashboardCard
            title="Changes Today"
            value={stats.changesToday}
            icon={Activity}
            color="green"
          />
          <DashboardCard
            title="Total Changes"
            value={stats.totalChanges}
            icon={History}
            color="purple"
          />
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search locations..."
          />
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
          >
            Filters
          </button>
        </div>

        {/* Locations List */}
        <LocationsList
          locations={filteredLocations}
          onLocationSelect={handleLocationSelect}
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

export default DashboardPage;
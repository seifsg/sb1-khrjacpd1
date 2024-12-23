import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import LocationsPage from './pages/LocationsPage';
import LocationDetailsPage from './pages/LocationDetailsPage';
import NotificationsPage from './pages/NotificationsPage';
import HistoryPage from './pages/HistoryPage';
import AccountsPage from './pages/AccountsPage';
import SettingsPage from './pages/SettingsPage';
import LogsPage from './pages/LogsPage';
import TesterPage from './pages/TesterPage';
import { ChangeLogProvider } from './context/ChangeLogContext';
import { GoogleAccountProvider } from './context/GoogleAccountContext';
import { LocationProvider } from './context/LocationContext';
import { ToastProvider } from './context/ToastContext';
import type { Location } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'locations' | 'notifications' | 'history' | 'settings' | 'accounts' | 'logs' | 'tester'>('dashboard');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const renderPage = () => {
    if (currentPage === 'locations' && selectedLocation) {
      return (
        <LocationDetailsPage
          location={selectedLocation}
          onBack={() => setSelectedLocation(null)}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onLocationSelect={setSelectedLocation} />;
      case 'locations':
        return <LocationsPage onLocationSelect={setSelectedLocation} />;
      case 'notifications':
        return <NotificationsPage />;
      case 'history':
        return <HistoryPage />;
      case 'accounts':
        return <AccountsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'logs':
        return <LogsPage />;
      case 'tester':
        return <TesterPage />;
      default:
        return <DashboardPage onLocationSelect={setSelectedLocation} />;
    }
  };

  return (
    <ToastProvider>
      <GoogleAccountProvider>
        <LocationProvider>
          <ChangeLogProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
              <main className="flex-1 overflow-auto">
                {renderPage()}
              </main>
            </div>
          </ChangeLogProvider>
        </LocationProvider>
      </GoogleAccountProvider>
    </ToastProvider>
  );
}

export default App;
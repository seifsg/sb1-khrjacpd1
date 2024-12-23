import React from 'react';

interface LocationDetailsTabsProps {
  activeTab: 'details' | 'pending' | 'history' | 'alerts';
  onTabChange: (tab: 'details' | 'pending' | 'history' | 'alerts') => void;
}

const LocationDetailsTabs: React.FC<LocationDetailsTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'pending', label: 'Pending Changes' },
    { id: 'history', label: 'History' },
    { id: 'alerts', label: 'Alerts' }
  ];

  return (
    <div className="border-b">
      <nav className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as typeof activeTab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LocationDetailsTabs;
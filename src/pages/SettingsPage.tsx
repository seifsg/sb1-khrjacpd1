import React from 'react';
import AlertPreferences from '../components/alerts/AlertPreferences';
import { useAlertPreferences } from '../hooks/useAlertPreferences';

const SettingsPage = () => {
  const { preferences, updatePreferences } = useAlertPreferences('global');

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Alert Settings</h1>
          <p className="text-gray-500 mb-6">
            These settings will apply to all new locations you add to your account.
          </p>

          <AlertPreferences
            preferences={preferences}
            onPreferencesChange={updatePreferences}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
import React from 'react';
import { Mail } from 'lucide-react';
import type { NotificationPreferences } from '../../types/notification';

interface NotificationPreferencesProps {
  preferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
}

const NotificationPreferencesModal: React.FC<NotificationPreferencesProps> = ({
  preferences,
  onPreferencesChange,
}) => {
  const handleFieldToggle = (field: string) => {
    onPreferencesChange({
      ...preferences,
      fieldNotifications: {
        ...preferences.fieldNotifications,
        [field]: {
          ...preferences.fieldNotifications[field],
          enabled: !preferences.fieldNotifications[field]?.enabled,
        },
      },
    });
  };

  const handleEmailChange = (email: string) => {
    onPreferencesChange({
      ...preferences,
      email: email.trim(),
    });
  };

  const handleDigestChange = (digest: 'none' | 'daily' | 'weekly') => {
    onPreferencesChange({
      ...preferences,
      digest,
    });
  };

  const fields = [
    'Business name',
    'Store code',
    'Description',
    'Address',
    'Phone numbers',
    'Categories',
    'Website',
    'Hours',
    'Opening date',
    'Services',
    'Logo',
    'Attributes',
    'Photos',
    'Special hours'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-400" />
            <div className="flex-1">
              <input
                type="email"
                value={preferences.email || ''}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Digest Frequency:</label>
            <select
              value={preferences.digest}
              onChange={(e) => handleDigestChange(e.target.value as 'none' | 'daily' | 'weekly')}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Notify me about changes to:</h4>
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field} className="flex items-center justify-between">
              <span className="text-gray-600">{field}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={preferences.fieldNotifications[field]?.enabled ?? false}
                  onChange={() => handleFieldToggle(field)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesModal;
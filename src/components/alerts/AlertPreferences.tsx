import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import type { NotificationPreferences } from '../../types/notification';

interface AlertPreferencesProps {
  preferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
}

const AlertPreferences: React.FC<AlertPreferencesProps> = ({
  preferences,
  onPreferencesChange,
}) => {
  const [emailInput, setEmailInput] = useState('');
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

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const email = emailInput.trim();
      if (email && email.includes('@')) {
        const emails = preferences.email ? preferences.email.split(',') : [];
        if (!emails.includes(email)) {
          onPreferencesChange({
            ...preferences,
            email: [...emails, email].join(',')
          });
        }
        setEmailInput('');
      }
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    const emails = preferences.email.split(',').filter(email => email !== emailToRemove);
    onPreferencesChange({
      ...preferences,
      email: emails.join(',')
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-400" />
            <div className="flex-1">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleAddEmail}
                placeholder="Enter email address and press space or enter"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {preferences.email && (
            <div className="flex flex-wrap gap-2 pl-9">
              {preferences.email.split(',').map((email) => (
                <span
                  key={email}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {email.trim()}
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
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
                  checked={preferences.fieldNotifications[field]?.enabled ?? true}
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

export default AlertPreferences;
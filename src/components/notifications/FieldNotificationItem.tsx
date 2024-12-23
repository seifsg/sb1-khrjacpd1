import React from 'react';

interface FieldNotificationItemProps {
  field: string;
  enabled: boolean;
  priority: 'low' | 'medium' | 'high';
  onToggle: () => void;
  onPriorityChange: (priority: 'low' | 'medium' | 'high') => void;
}

const FieldNotificationItem: React.FC<FieldNotificationItemProps> = ({
  field,
  enabled,
  priority,
  onToggle,
  onPriorityChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{field}</span>
      <div className="flex items-center gap-4">
        <select
          className="px-3 py-2 border rounded-lg text-sm"
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as 'low' | 'medium' | 'high')}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={onToggle}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PreferenceToggleProps {
  icon: LucideIcon;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
  icon: Icon,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-gray-400" />
        <span>{label}</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};
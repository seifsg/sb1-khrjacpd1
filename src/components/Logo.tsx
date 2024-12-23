import React from 'react';
import { Building2, Activity } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Building2 size={28} className="text-blue-600" />
        <Activity size={14} className="text-blue-500 absolute -bottom-1 -right-1" />
      </div>
      <span className="font-bold text-xl text-gray-900">
        GBP <span className="text-blue-600">Monitor</span>
      </span>
    </div>
  );
};

export default Logo;
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'yellow' | 'green' | 'purple';
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  color,
  onClick 
}) => {
  const colorClasses = {
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    green: 'text-green-500',
    purple: 'text-purple-500'
  };

  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <Icon className={colorClasses[color]} size={24} />
      </div>
    </div>
  );
};

export default DashboardCard;
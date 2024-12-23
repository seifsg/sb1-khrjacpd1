import React from 'react';

interface BadgeProps {
  status: 'active' | 'pending' | 'suspended' | 'approved' | 'rejected';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Badge;
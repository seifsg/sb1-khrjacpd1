import { LucideIcon } from 'lucide-react';

export interface DashboardStats {
  totalLocations: number;
  pendingChanges: number;
  changesToday: number;
  totalChanges: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'yellow' | 'green' | 'purple';
  onClick?: () => void;
}
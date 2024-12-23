import type { NotificationPriority } from '../types/notification';

export const getPriorityStyles = (priority: NotificationPriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 border-red-100';
    case 'medium':
      return 'bg-yellow-50 border-yellow-100';
    case 'low':
      return 'bg-gray-50 border-gray-100';
  }
};
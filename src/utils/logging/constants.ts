import { LogLevel } from './types';

export const LOG_CATEGORIES = [
  'Authentication',
  'API',
  'System',
  'User Action',
  'Error'
] as const;

export const MAX_LOG_ENTRIES = 1000;
export const STORAGE_KEY = 'app_logs';

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'text-gray-600 bg-gray-50',
  [LogLevel.INFO]: 'text-blue-600 bg-blue-50',
  [LogLevel.WARN]: 'text-yellow-600 bg-yellow-50',
  [LogLevel.ERROR]: 'text-red-600 bg-red-50'
};

// Re-export LogLevel to fix the import error
export { LogLevel };
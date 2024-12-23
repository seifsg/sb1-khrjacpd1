export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  category: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
}

export interface LogFilter {
  level?: LogLevel;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface AuthEventMetadata {
  userEmail?: string;
  timestamp?: string;
  [key: string]: unknown;
}
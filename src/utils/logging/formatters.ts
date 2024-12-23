import { LogEntry, LogLevel } from './types';

export function formatLogMessage(entry: LogEntry): string {
  const timestamp = entry.timestamp.toISOString();
  return `[${timestamp}] [${entry.category}] [${entry.level.toUpperCase()}] ${entry.message}`;
}

export function formatLogLevel(level: LogLevel): string {
  return level.toUpperCase();
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleString();
}

export function formatLogData(data: unknown): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}
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

class LogStorage {
  private static readonly MAX_ENTRIES = 1000;
  private static readonly STORAGE_KEY = 'app_logs';
  private logs: LogEntry[] = [];

  constructor() {
    this.loadLogs();
  }

  addLog(entry: LogEntry) {
    this.logs.unshift(entry);
    
    // Trim logs if exceeding max size
    if (this.logs.length > LogStorage.MAX_ENTRIES) {
      this.logs = this.logs.slice(0, LogStorage.MAX_ENTRIES);
    }

    this.saveLogs();
    this.logToConsole(entry);
  }

  getLogs(
    filter?: {
      level?: LogLevel;
      category?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): LogEntry[] {
    let filtered = this.logs;

    if (filter) {
      filtered = this.logs.filter(log => {
        if (filter.level && log.level !== filter.level) return false;
        if (filter.category && log.category !== filter.category) return false;
        if (filter.startDate && log.timestamp < filter.startDate) return false;
        if (filter.endDate && log.timestamp > filter.endDate) return false;
        return true;
      });
    }

    return filtered;
  }

  clearLogs() {
    this.logs = [];
    this.saveLogs();
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  private loadLogs() {
    try {
      const stored = localStorage.getItem(LogStorage.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.logs = parsed.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp)
        }));
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
      this.logs = [];
    }
  }

  private saveLogs() {
    try {
      localStorage.setItem(LogStorage.STORAGE_KEY, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs:', error);
    }
  }

  private logToConsole(entry: LogEntry) {
    const timestamp = entry.timestamp.toISOString();
    const prefix = `[${timestamp}] [${entry.category}] [${entry.level.toUpperCase()}]`;

    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.data);
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.data);
        break;
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.data);
        break;
    }
  }
}

const logStorage = new LogStorage();

export function logToStorage(entry: LogEntry) {
  logStorage.addLog(entry);
}

export function getLogs(filter?: Parameters<LogStorage['getLogs']>[0]) {
  return logStorage.getLogs(filter);
}

export function clearLogs() {
  logStorage.clearLogs();
}

export function exportLogs() {
  return logStorage.exportLogs();
}
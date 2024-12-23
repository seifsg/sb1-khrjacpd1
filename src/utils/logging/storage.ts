import { LogEntry, LogFilter, LogLevel } from './types';
import { MAX_LOG_ENTRIES, STORAGE_KEY } from './constants';
import { formatLogMessage } from './formatters';

class LogStorage {
  private logs: LogEntry[] = [];

  constructor() {
    this.loadLogs();
  }

  addLog(entry: LogEntry): void {
    this.logs.unshift(entry);
    
    if (this.logs.length > MAX_LOG_ENTRIES) {
      this.logs = this.logs.slice(0, MAX_LOG_ENTRIES);
    }

    this.saveLogs();
    this.logToConsole(entry);
  }

  getLogs(filter?: LogFilter): LogEntry[] {
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

  clearLogs(): void {
    this.logs = [];
    this.saveLogs();
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  private loadLogs(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
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

  private saveLogs(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs:', error);
    }
  }

  private logToConsole(entry: LogEntry): void {
    const message = formatLogMessage(entry);

    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(message, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(message, entry.data);
        break;
      case LogLevel.INFO:
        console.info(message, entry.data);
        break;
      case LogLevel.DEBUG:
        console.debug(message, entry.data);
        break;
    }
  }
}

// Create singleton instance
const logStorage = new LogStorage();

// Export storage functions
export const addLog = (entry: LogEntry) => logStorage.addLog(entry);
export const getLogs = (filter?: LogFilter) => logStorage.getLogs(filter);
export const clearLogs = () => logStorage.clearLogs();
export const exportLogs = () => logStorage.exportLogs();
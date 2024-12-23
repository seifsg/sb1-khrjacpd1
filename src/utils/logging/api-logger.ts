import { LogLevel } from './types';
import { addLog } from './storage';
import { sanitizeLogData } from './sanitizer';

export class ApiLogger {
  private static readonly CATEGORY = 'API';

  static logRequest(endpoint: string, params: unknown) {
    addLog({
      category: this.CATEGORY,
      level: LogLevel.INFO,
      message: `API Request: ${endpoint}`,
      data: {
        ...sanitizeLogData(params),
        timestamp: new Date().toISOString()
      },
      timestamp: new Date()
    });
  }

  static logResponse(endpoint: string, response: unknown) {
    addLog({
      category: this.CATEGORY,
      level: LogLevel.INFO,
      message: `API Response: ${endpoint}`,
      data: {
        ...sanitizeLogData(response),
        timestamp: new Date().toISOString()
      },
      timestamp: new Date()
    });
  }

  static logError(endpoint: string, error: unknown) {
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    } : error;

    addLog({
      category: this.CATEGORY,
      level: LogLevel.ERROR,
      message: `API Error: ${endpoint}`,
      data: sanitizeLogData(errorData),
      timestamp: new Date()
    });
  }
}
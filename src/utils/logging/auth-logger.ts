import { LogLevel } from './types';
import { sanitizeLogData } from './sanitizer';
import { addLog } from './storage';
import type { AuthEventMetadata } from './types';

export class AuthLogger {
  private static readonly CATEGORY = 'Authentication';

  static logAuthEvent(event: string, metadata?: AuthEventMetadata) {
    const sanitizedData = {
      ...sanitizeLogData(metadata),
      userEmail: metadata?.userEmail,
      timestamp: metadata?.timestamp || new Date().toISOString()
    };

    addLog({
      category: this.CATEGORY,
      level: LogLevel.INFO,
      message: event,
      data: sanitizedData,
      timestamp: new Date()
    });
  }

  static logError(message: string, data?: unknown) {
    const sanitizedData = {
      ...sanitizeLogData(data),
      timestamp: new Date().toISOString()
    };

    addLog({
      category: this.CATEGORY,
      level: LogLevel.ERROR,
      message,
      data: sanitizedData,
      timestamp: new Date()
    });
  }

  static logInfo(message: string, data?: unknown) {
    const sanitizedData = {
      ...sanitizeLogData(data),
      timestamp: new Date().toISOString()
    };

    addLog({
      category: this.CATEGORY,
      level: LogLevel.INFO,
      message,
      data: sanitizedData,
      timestamp: new Date()
    });
  }
}
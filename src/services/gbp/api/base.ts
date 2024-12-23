import { withRetry } from '../utils/retry';
import { ApiLogger } from '../../../utils/logging/api-logger';
import type { ApiResponse } from '../types';

export abstract class BaseApi {
  protected async fetchWithAuth<T>(
    url: string,
    accessToken: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    ApiLogger.logRequest(url, { 
      method: options.method || 'GET',
      timestamp: new Date().toISOString()
    });

    try {
      const response = await withRetry(() => 
        fetch(url, {
          ...options,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers
          }
        })
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      ApiLogger.logResponse(url, { 
        status: response.status,
        timestamp: new Date().toISOString()
      });

      return { data };
    } catch (error) {
      ApiLogger.logError(url, {
        error,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}
import { BaseApi } from './base';
import { GBPCache } from '../utils/cache';
import { ApiLogger } from '../../../utils/logging/api-logger';
import type { GBPLocation } from '../../../types/gbp-fields';

export class LocationsApi extends BaseApi {
  async listLocations(accountId: string, accessToken: string): Promise<GBPLocation[]> {
    const cacheKey = `locations_${accountId}`;
    const cached = GBPCache.get<GBPLocation[]>(cacheKey);

    if (cached) {
      ApiLogger.logInfo('Locations retrieved from cache', {
        accountId,
        locationCount: cached.length,
        timestamp: new Date().toISOString()
      });
      return cached;
    }

    try {
      const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`;
      
      ApiLogger.logInfo('Fetching locations', {
        accountId,
        url,
        timestamp: new Date().toISOString()
      });

      const response = await this.fetchWithAuth<{ locations: GBPLocation[] }>(
        url,
        accessToken
      );

      const locations = response.data.locations || [];

      ApiLogger.logInfo('Locations retrieved', {
        accountId,
        locationCount: locations.length,
        timestamp: new Date().toISOString()
      });

      GBPCache.set(cacheKey, locations);
      return locations;

    } catch (error) {
      ApiLogger.logError('Failed to fetch locations', {
        accountId,
        error,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}

export const locationsApi = new LocationsApi();
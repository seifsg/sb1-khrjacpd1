import { google } from 'googleapis';
import { gbpAuthService } from './auth';
import { GBP_CONFIG } from './config';
import { GBPLocationError } from './errors';
import { validateLocationUpdate } from './utils/validation';
import { transformGoogleLocation, transformToGoogleLocation } from './utils/transforms';
import { logGBPError, logGBPRequest, logGBPResponse } from './utils/logging';
import { mockLocations } from './mock';
import type { GBPLocation } from '../../types/gbp-fields';
import type { LocationListParams, LocationUpdateParams } from './types';

class GBPLocationService {
  private mybusiness: any;

  constructor() {
    if (!GBP_CONFIG.isDevelopment) {
      this.mybusiness = google.mybusinessbusinessinformation({
        version: GBP_CONFIG.apiVersion,
        auth: gbpAuthService.getClient()
      });
    }
  }

  async listLocations({
    accountId,
    pageSize = 100,
    pageToken,
    readMask = 'name,title,storefrontAddress,primaryPhone,websiteUri,regularHours,categories,labels'
  }: LocationListParams): Promise<GBPLocation[]> {
    try {
      if (GBP_CONFIG.isDevelopment) {
        return mockLocations;
      }

      logGBPRequest('listLocations', { accountId, pageSize, pageToken });

      const response = await this.mybusiness.accounts.locations.list({
        parent: `accounts/${accountId}`,
        pageSize,
        pageToken,
        readMask
      });

      logGBPResponse('listLocations', response.data);

      return response.data.locations.map(transformGoogleLocation);
    } catch (error) {
      logGBPError(error, 'listLocations');
      throw new GBPLocationError('Failed to list locations', error);
    }
  }

  async getLocation(locationId: string): Promise<GBPLocation> {
    try {
      if (GBP_CONFIG.isDevelopment) {
        const location = mockLocations.find(loc => loc.id === locationId);
        if (!location) {
          throw new GBPLocationError('Location not found');
        }
        return location;
      }

      logGBPRequest('getLocation', { locationId });

      const response = await this.mybusiness.accounts.locations.get({
        name: locationId,
        readMask: 'name,title,storefrontAddress,primaryPhone,websiteUri,regularHours,categories,labels'
      });

      logGBPResponse('getLocation', response.data);

      return transformGoogleLocation(response.data);
    } catch (error) {
      logGBPError(error, 'getLocation');
      throw new GBPLocationError('Failed to get location', error);
    }
  }

  async updateLocation({ locationId, updateMask, location }: LocationUpdateParams): Promise<GBPLocation> {
    try {
      validateLocationUpdate(location);
      
      if (GBP_CONFIG.isDevelopment) {
        // Simulate update in mock data
        const index = mockLocations.findIndex(loc => loc.id === locationId);
        if (index === -1) {
          throw new GBPLocationError('Location not found');
        }
        
        mockLocations[index] = {
          ...mockLocations[index],
          ...location,
          lastUpdated: new Date()
        };
        
        return mockLocations[index];
      }

      logGBPRequest('updateLocation', { locationId, updateMask, location });

      const response = await this.mybusiness.accounts.locations.patch({
        name: locationId,
        updateMask: updateMask.join(','),
        requestBody: transformToGoogleLocation(location)
      });

      logGBPResponse('updateLocation', response.data);

      return transformGoogleLocation(response.data);
    } catch (error) {
      logGBPError(error, 'updateLocation');
      throw new GBPLocationError('Failed to update location', error);
    }
  }
}

export const gbpLocationService = new GBPLocationService();
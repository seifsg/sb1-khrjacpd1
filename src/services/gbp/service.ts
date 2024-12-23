import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GBP_CONFIG } from './config';
import { GBPAuthError, GBPLocationError } from './errors';
import { transformGoogleLocation, transformToGoogleLocation } from './transforms';
import type { GBPLocation } from '../../types/gbp-fields';

class GBPService {
  private oauth2Client: OAuth2Client;
  private mybusiness: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GBP_CONFIG.clientId,
      GBP_CONFIG.clientSecret,
      GBP_CONFIG.redirectUri
    );

    this.mybusiness = google.mybusinessbusinessinformation({
      version: GBP_CONFIG.apiVersion,
      auth: this.oauth2Client
    });
  }

  async authenticate(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      // Get user info
      const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
      const { data } = await oauth2.userinfo.get();

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture
      };
    } catch (error) {
      console.error('Auth error:', error);
      throw new GBPAuthError('Failed to authenticate with Google', error);
    }
  }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GBP_CONFIG.scopes,
      prompt: 'consent'
    });
  }

  async listLocations(accountId: string): Promise<GBPLocation[]> {
    try {
      const response = await this.mybusiness.accounts.locations.list({
        parent: `accounts/${accountId}`,
        readMask: 'name,title,storefrontAddress,primaryPhone,websiteUri,regularHours,categories,labels'
      });

      return response.data.locations.map(transformGoogleLocation);
    } catch (error) {
      console.error('Failed to list locations:', error);
      throw new GBPLocationError('Failed to list locations', error);
    }
  }

  async updateLocation(locationId: string, updates: Partial<GBPLocation>): Promise<GBPLocation> {
    try {
      const response = await this.mybusiness.accounts.locations.patch({
        name: locationId,
        updateMask: Object.keys(updates).join(','),
        requestBody: transformToGoogleLocation(updates)
      });

      return transformGoogleLocation(response.data);
    } catch (error) {
      console.error('Failed to update location:', error);
      throw new GBPLocationError('Failed to update location', error);
    }
  }

  async getAvailableLocations(accountId: string): Promise<GBPLocation[]> {
    try {
      const response = await this.mybusiness.accounts.list({
        pageSize: 100
      });

      const allLocations = await Promise.all(
        response.data.accounts.map(async (account: any) => {
          const locationsResponse = await this.mybusiness.accounts.locations.list({
            parent: account.name,
            readMask: 'name,title,storefrontAddress,primaryPhone,websiteUri,regularHours,categories,labels'
          });
          return locationsResponse.data.locations || [];
        })
      );

      return allLocations.flat().map(transformGoogleLocation);
    } catch (error) {
      console.error('Failed to get available locations:', error);
      throw new GBPLocationError('Failed to get available locations', error);
    }
  }
}

export const gbpService = new GBPService();
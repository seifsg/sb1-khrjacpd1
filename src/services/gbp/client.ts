import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GBP_CONFIG } from './config';
import { GBPAuthError } from './errors';

export class GBPClient {
  private static instance: GBPClient;
  private oauth2Client: OAuth2Client;
  private mybusiness: any;

  private constructor() {
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

  static getInstance(): GBPClient {
    if (!GBPClient.instance) {
      GBPClient.instance = new GBPClient();
    }
    return GBPClient.instance;
  }

  getOAuth2Client(): OAuth2Client {
    return this.oauth2Client;
  }

  getMyBusiness(): any {
    return this.mybusiness;
  }

  setCredentials(tokens: any): void {
    this.oauth2Client.setCredentials(tokens);
  }

  async refreshToken(): Promise<void> {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      this.oauth2Client.setCredentials(credentials);
    } catch (error) {
      throw new GBPAuthError('Failed to refresh token', error);
    }
  }
}

export const gbpClient = GBPClient.getInstance();
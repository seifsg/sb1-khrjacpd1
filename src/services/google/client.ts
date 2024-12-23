import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_AUTH_CONFIG, GBP_CONFIG } from './config';

class GoogleApiClient {
  private static instance: GoogleApiClient;
  private oauth2Client: OAuth2Client;
  private mybusiness: any;

  private constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GOOGLE_AUTH_CONFIG.clientId,
      GOOGLE_AUTH_CONFIG.clientSecret,
      GOOGLE_AUTH_CONFIG.redirectUri
    );

    this.mybusiness = google.mybusinessbusinessinformation({
      version: GBP_CONFIG.apiVersion,
      auth: this.oauth2Client
    });
  }

  static getInstance(): GoogleApiClient {
    if (!GoogleApiClient.instance) {
      GoogleApiClient.instance = new GoogleApiClient();
    }
    return GoogleApiClient.instance;
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
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }
}

export const googleApiClient = GoogleApiClient.getInstance();
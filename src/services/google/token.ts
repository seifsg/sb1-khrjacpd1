import { GOOGLE_AUTH_CONFIG } from './config';
import type { TokenResponse } from '../../types/google-auth';

export class GoogleToken {
  private tokenClient: google.accounts.oauth2.TokenClient | null = null;

  async initialize(): Promise<void> {
    if (this.tokenClient) return;

    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_AUTH_CONFIG.clientId,
      scope: GOOGLE_AUTH_CONFIG.scopes.join(' '),
      callback: () => {},
      error_callback: (error) => {
        console.error('Token client error:', error);
      }
    });
  }

  requestToken(options: { prompt?: string } = {}): Promise<TokenResponse> {
    if (!this.tokenClient) {
      throw new Error('Token client not initialized');
    }

    return new Promise((resolve, reject) => {
      try {
        this.tokenClient!.requestAccessToken({
          ...options,
          callback: (response) => {
            if (response.error) {
              reject(new Error(response.error));
              return;
            }
            resolve(response);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
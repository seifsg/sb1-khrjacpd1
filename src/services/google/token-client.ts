import { GOOGLE_AUTH_CONFIG } from './config';
import { ScriptLoader } from './script-loader';
import type { TokenResponse } from '../../types/google-auth';

export class TokenClientManager {
  private readonly scriptLoader = new ScriptLoader();
  private tokenClient: google.accounts.oauth2.TokenClient | null = null;

  async requestAccessToken(): Promise<TokenResponse> {
    // Load Google script if not already loaded
    await this.scriptLoader.load();

    // Initialize token client if needed
    if (!this.tokenClient) {
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_AUTH_CONFIG.clientId,
        scope: GOOGLE_AUTH_CONFIG.scopes.join(' '),
        callback: () => {},
        error_callback: (error) => {
          console.error('Token client error:', error);
        }
      });
    }

    // Request token with user interaction
    return new Promise((resolve, reject) => {
      this.tokenClient!.requestAccessToken({
        prompt: 'select_account',
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }
          resolve(response);
        }
      });
    });
  }
}
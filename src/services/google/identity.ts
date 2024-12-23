import { GBP_CONFIG } from './config';
import { ScriptLoader } from './script-loader';
import type { GoogleAuthResponse } from './types';

export class GoogleIdentityService {
  private readonly scriptLoader = ScriptLoader.getInstance();

  async getToken(): Promise<GoogleAuthResponse> {
    await this.scriptLoader.load();

    return new Promise((resolve, reject) => {
      try {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: GBP_CONFIG.clientId,
          scope: GBP_CONFIG.scopes.join(' '),
          callback: async (response) => {
            if (response.error) {
              reject(new Error(response.error));
              return;
            }

            try {
              const userInfo = await this.getUserInfo(response.access_token);
              resolve({
                user: userInfo,
                accessToken: response.access_token
              });
            } catch (error) {
              reject(error);
            }
          },
        });

        client.requestAccessToken();
      } catch (error) {
        reject(error);
      }
    });
  }

  private async getUserInfo(accessToken: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  }
}
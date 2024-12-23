import { GoogleAuthResponse, TokenResponse } from '../../types/google-auth';
import { GOOGLE_AUTH_CONFIG } from './config';
import { UserInfoService } from './user-info';
import { WindowManager } from './window-manager';

export class AuthUIManager {
  private readonly userInfoService = new UserInfoService();
  private readonly windowManager = new WindowManager();
  private tokenClient: google.accounts.oauth2.TokenClient | null = null;

  async attemptSilentSignIn(): Promise<GoogleAuthResponse | null> {
    try {
      await this.initializeTokenClient();
      
      return new Promise((resolve) => {
        this.tokenClient?.requestAccessToken({
          prompt: '',
          callback: async (response) => {
            if (response.error) {
              resolve(null);
              return;
            }
            const userInfo = await this.userInfoService.getUserInfo(response.access_token);
            resolve({
              user: userInfo,
              accessToken: response.access_token
            });
          }
        });
      });
    } catch {
      return null;
    }
  }

  async startInteractiveSignIn(): Promise<GoogleAuthResponse> {
    await this.initializeTokenClient();
    
    if (!this.windowManager.canOpenPopups()) {
      throw new Error('Popups are blocked. Please allow popups for this site to sign in with Google.');
    }

    return new Promise((resolve, reject) => {
      this.tokenClient?.requestAccessToken({
        prompt: 'select_account',
        callback: async (response: TokenResponse) => {
          try {
            if (response.error) {
              reject(new Error(response.error));
              return;
            }

            const userInfo = await this.userInfoService.getUserInfo(response.access_token);
            resolve({
              user: userInfo,
              accessToken: response.access_token
            });
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  private async initializeTokenClient(): Promise<void> {
    if (this.tokenClient) return;

    if (!window.google?.accounts?.oauth2) {
      await this.loadGoogleScript();
    }

    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_AUTH_CONFIG.clientId,
      scope: GOOGLE_AUTH_CONFIG.scopes.join(' '),
      callback: () => {},
      error_callback: (error) => {
        console.error('Token client error:', error);
      }
    });
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google authentication'));
      document.body.appendChild(script);
    });
  }

  cleanup(): void {
    this.windowManager.cleanup();
  }
}
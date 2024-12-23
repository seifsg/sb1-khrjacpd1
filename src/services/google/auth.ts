import { AuthLogger } from '../../utils/logging/auth-logger';
import { GOOGLE_AUTH_CONFIG } from './config';
import type { GoogleAuthResponse, TokenResponse } from './types';

export class AuthFlow {
  private tokenClient: google.accounts.oauth2.TokenClient | null = null;

  async start(): Promise<GoogleAuthResponse> {
    try {
      // Try silent sign in first
      const silentResponse = await this.attemptSilentSignIn();
      if (silentResponse) {
        AuthLogger.logAuthAttempt('silent', true);
        return silentResponse;
      }

      // If silent sign in fails, try interactive sign in
      const response = await this.startInteractiveSignIn();
      AuthLogger.logAuthAttempt('interactive', true);
      return response;
    } catch (error) {
      AuthLogger.logAuthError(error, 'auth-flow');
      throw error;
    }
  }

  private async attemptSilentSignIn(): Promise<GoogleAuthResponse | null> {
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
            AuthLogger.logTokenResponse(response);
            const userInfo = await this.getUserInfo(response.access_token);
            resolve({
              user: userInfo,
              accessToken: response.access_token
            });
          }
        });
      });
    } catch (error) {
      AuthLogger.logAuthError(error, 'silent-sign-in');
      return null;
    }
  }

  private async startInteractiveSignIn(): Promise<GoogleAuthResponse> {
    await this.initializeTokenClient();

    return new Promise((resolve, reject) => {
      this.tokenClient?.requestAccessToken({
        prompt: 'select_account',
        callback: async (response: TokenResponse) => {
          try {
            if (response.error) {
              AuthLogger.logAuthError(new Error(response.error), 'interactive-sign-in');
              reject(new Error(response.error));
              return;
            }

            AuthLogger.logTokenResponse(response);
            const userInfo = await this.getUserInfo(response.access_token);
            resolve({
              user: userInfo,
              accessToken: response.access_token
            });
          } catch (error) {
            AuthLogger.logAuthError(error, 'interactive-sign-in');
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
        AuthLogger.logAuthError(error, 'token-client');
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
      script.onerror = () => {
        const error = new Error('Failed to load Google authentication');
        AuthLogger.logAuthError(error, 'script-load');
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  private async getUserInfo(accessToken: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      const error = new Error('Failed to get user info');
      AuthLogger.logAuthError(error, 'user-info');
      throw error;
    }

    return response.json();
  }
}
import { AuthLogger } from '../../../utils/logging/auth-logger';
import { GOOGLE_AUTH_CONFIG } from '../config';
import { PopupManager } from './popup-manager';
import { TokenValidator } from './token-validator';
import { tokenManager } from './token-manager';
import type { TokenResponse } from '../types';

export class TokenClient {
  private client: google.accounts.oauth2.TokenClient | null = null;
  private popupManager: PopupManager | null = null;

  async initialize(popupManager: PopupManager): Promise<void> {
    if (this.client) return;

    this.popupManager = popupManager;

    try {
      this.client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_AUTH_CONFIG.clientId,
        scope: GOOGLE_AUTH_CONFIG.scopes.join(' '),
        callback: async (response) => {
          if (response.error) {
            AuthLogger.logError('Token request failed', { 
              error: response.error,
              timestamp: new Date().toISOString()
            });
            return;
          }

          // Log full token response
          AuthLogger.logInfo('Token Response Received', {
            accessToken: response.access_token,
            scope: response.scope,
            expiresIn: response.expires_in,
            timestamp: new Date().toISOString()
          });

          // Validate token with Google
          if (response.access_token) {
            const tokenInfo = await TokenValidator.validateToken(response.access_token);
            
            if (tokenInfo) {
              tokenManager.setToken(
                response.access_token,
                response.expires_in || 3600
              );

              // Log token validation details
              AuthLogger.logInfo('Token Validation Details', {
                accessToken: response.access_token,
                tokenInfo,
                timestamp: new Date().toISOString()
              });
            }
          }
        }
      });

      AuthLogger.logInfo('Token client initialized successfully');
    } catch (error) {
      AuthLogger.logError('Failed to initialize token client', { error });
      throw error;
    }
  }

  async requestToken(options: { prompt?: string }): Promise<TokenResponse> {
    if (!this.client) {
      throw new Error('Token client not initialized');
    }

    // Check for existing valid token first
    const existingToken = await tokenManager.ensureValidToken();
    if (existingToken) {
      AuthLogger.logInfo('Using existing valid token', {
        token: existingToken,
        timestamp: new Date().toISOString()
      });
      return { 
        access_token: existingToken, 
        token_type: 'Bearer', 
        expires_in: 3600, 
        scope: GOOGLE_AUTH_CONFIG.scopes.join(' ')
      };
    }

    return new Promise((resolve, reject) => {
      try {
        AuthLogger.logInfo('Requesting access token', {
          endpoint: GOOGLE_AUTH_CONFIG.authEndpoint,
          timestamp: new Date().toISOString()
        });

        this.client!.requestAccessToken({
          prompt: options.prompt || 'consent',
          callback: async (response) => {
            if (response.error) {
              AuthLogger.logError('Token request failed', { 
                error: response.error,
                timestamp: new Date().toISOString()
              });
              reject(new Error(response.error));
              return;
            }

            // Log full token response
            AuthLogger.logInfo('Token Response Received', {
              accessToken: response.access_token,
              scope: response.scope,
              expiresIn: response.expires_in,
              timestamp: new Date().toISOString()
            });

            // Validate token before resolving
            if (response.access_token) {
              const tokenInfo = await TokenValidator.validateToken(response.access_token);
              if (!tokenInfo) {
                reject(new Error('Token validation failed'));
                return;
              }

              // Log validation success with full details
              AuthLogger.logInfo('Token Validation Success', {
                accessToken: response.access_token,
                tokenInfo,
                timestamp: new Date().toISOString()
              });
            }

            resolve(response);
          }
        });
      } catch (error) {
        AuthLogger.logError('Failed to request token', { error });
        reject(error);
      }
    });
  }
}
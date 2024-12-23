import { GOOGLE_AUTH_CONFIG } from '../config';
import { AuthLogger } from '../../../utils/logging/auth-logger';
import type { TokenResponse } from '../types';

export class TokenRefreshService {
  static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      AuthLogger.logInfo('Refreshing access token', {
        endpoint: GOOGLE_AUTH_CONFIG.tokenEndpoint,
        timestamp: new Date().toISOString()
      });

      const response = await fetch(GOOGLE_AUTH_CONFIG.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: GOOGLE_AUTH_CONFIG.clientId,
          client_secret: GOOGLE_AUTH_CONFIG.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      AuthLogger.logInfo('Token refresh successful', {
        expiresIn: data.expires_in,
        timestamp: new Date().toISOString()
      });

      return data;
    } catch (error) {
      AuthLogger.logError('Token refresh failed', { error });
      throw error;
    }
  }
}
import { AuthLogger } from '../../../utils/logging/auth-logger';
import { GOOGLE_AUTH_CONFIG } from '../config';

export class TokenValidator {
  private static readonly TOKENINFO_ENDPOINT = 'https://oauth2.googleapis.com/tokeninfo';

  static async validateToken(accessToken: string): Promise<any> {
    try {
      AuthLogger.logInfo('Validating token with Google', {
        endpoint: this.TOKENINFO_ENDPOINT,
        timestamp: new Date().toISOString()
      });

      const response = await fetch(`${this.TOKENINFO_ENDPOINT}?access_token=${accessToken}`);
      const data = await response.json();

      if (!response.ok) {
        AuthLogger.logError('Token validation failed', {
          error: data.error,
          description: data.error_description,
          timestamp: new Date().toISOString()
        });
        throw new Error(data.error_description || 'Token validation failed');
      }

      // Verify token belongs to our app
      if (data.aud !== GOOGLE_AUTH_CONFIG.clientId) {
        throw new Error('Token was not issued for this application');
      }

      // Verify required scopes
      const requiredScopes = new Set(GOOGLE_AUTH_CONFIG.scopes);
      const grantedScopes = new Set(data.scope.split(' '));
      const hasAllScopes = [...requiredScopes].every(scope => grantedScopes.has(scope));

      if (!hasAllScopes) {
        throw new Error('Token missing required scopes');
      }

      AuthLogger.logInfo('Token validation successful', {
        tokenInfo: data,
        timestamp: new Date().toISOString()
      });

      return data;
    } catch (error) {
      AuthLogger.logError('Token validation failed', {
        error,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}
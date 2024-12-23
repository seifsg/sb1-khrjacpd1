import { AuthLogger } from '../../../utils/logging/auth-logger';

interface StoredToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  userEmail?: string;
}

export class TokenStorage {
  private static readonly STORAGE_KEY = 'gbp_auth_token';
  private static readonly BUFFER_TIME = 5 * 60 * 1000; // 5 minutes buffer

  static storeToken(
    accessToken: string,
    expiresIn: number,
    userEmail?: string,
    refreshToken?: string
  ): void {
    const expiresAt = Date.now() + (expiresIn * 1000);
    const tokenData: StoredToken = {
      accessToken,
      refreshToken,
      expiresAt,
      userEmail
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokenData));
      AuthLogger.logInfo('Token stored successfully', {
        userEmail,
        expiresIn,
        hasRefreshToken: !!refreshToken,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      AuthLogger.logError('Failed to store token', { error });
      throw error;
    }
  }

  static getStoredToken(): StoredToken | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const tokenData: StoredToken = JSON.parse(stored);
      
      // Check if token is about to expire
      if (Date.now() >= (tokenData.expiresAt - this.BUFFER_TIME)) {
        AuthLogger.logInfo('Token expired or expiring soon', {
          userEmail: tokenData.userEmail,
          timestamp: new Date().toISOString()
        });
        return tokenData; // Return data so refresh token can be used
      }

      return tokenData;
    } catch (error) {
      AuthLogger.logError('Failed to retrieve token', { error });
      this.clearToken();
      return null;
    }
  }

  static clearToken(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    AuthLogger.logInfo('Token storage cleared', {
      timestamp: new Date().toISOString()
    });
  }
}
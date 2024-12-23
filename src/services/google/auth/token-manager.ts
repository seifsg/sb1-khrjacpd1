import { AuthLogger } from '../../../utils/logging/auth-logger';
import { TokenStorage } from './token-storage';
import { TokenValidator } from './token-validator';
import { TokenRefreshService } from './token-refresh';

export class TokenManager {
  private static instance: TokenManager;
  private isRefreshing = false;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  async ensureValidToken(): Promise<string | null> {
    const storedToken = TokenStorage.getStoredToken();
    
    if (!storedToken) {
      AuthLogger.logInfo('No stored token found', {
        timestamp: new Date().toISOString()
      });
      return null;
    }

    // Check if token is valid
    if (TokenValidator.isTokenValid(storedToken.accessToken)) {
      AuthLogger.logInfo('Using existing valid token', {
        userEmail: storedToken.userEmail,
        timestamp: new Date().toISOString()
      });
      return storedToken.accessToken;
    }

    // Token is invalid or expired, try to refresh
    if (storedToken.refreshToken && !this.isRefreshing) {
      try {
        this.isRefreshing = true;
        AuthLogger.logInfo('Attempting token refresh', {
          userEmail: storedToken.userEmail,
          timestamp: new Date().toISOString()
        });

        const refreshedToken = await TokenRefreshService.refreshToken(storedToken.refreshToken);
        
        // Store new token
        this.setToken(
          refreshedToken.access_token,
          refreshedToken.expires_in,
          storedToken.userEmail,
          storedToken.refreshToken // Keep existing refresh token
        );

        return refreshedToken.access_token;
      } catch (error) {
        AuthLogger.logError('Token refresh failed', { error });
        TokenStorage.clearToken();
        return null;
      } finally {
        this.isRefreshing = false;
      }
    }

    // No refresh token or refresh failed
    TokenStorage.clearToken();
    return null;
  }

  setToken(
    accessToken: string,
    expiresIn: number,
    userEmail?: string,
    refreshToken?: string
  ): void {
    if (!TokenValidator.isTokenValid(accessToken)) {
      throw new Error('Invalid token format');
    }

    TokenStorage.storeToken(accessToken, expiresIn, userEmail, refreshToken);
    
    AuthLogger.logInfo('New token stored', {
      userEmail,
      expiresIn,
      hasRefreshToken: !!refreshToken,
      timestamp: new Date().toISOString()
    });
  }

  clearToken(): void {
    TokenStorage.clearToken();
    AuthLogger.logInfo('Token cleared', {
      timestamp: new Date().toISOString()
    });
  }

  getUserEmail(): string | undefined {
    const storedToken = TokenStorage.getStoredToken();
    return storedToken?.userEmail;
  }
}

export const tokenManager = TokenManager.getInstance();
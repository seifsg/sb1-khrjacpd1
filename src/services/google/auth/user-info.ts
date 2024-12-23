import { AuthLogger } from '../../../utils/logging/auth-logger';
import type { GoogleUserInfo } from './types';

export class UserInfoService {
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!response.ok) {
        throw new Error('Failed to get user info');
      }

      const userInfo = await response.json();
      
      AuthLogger.logAuthEvent('User Info Retrieved', {
        userEmail: userInfo.email,
        timestamp: new Date().toISOString()
      });

      return userInfo;
    } catch (error) {
      AuthLogger.logError('Failed to get user info', { error });
      throw error;
    }
  }
}
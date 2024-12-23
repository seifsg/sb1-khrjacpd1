import type { GoogleUserInfo } from '../../types/google-auth';

export class UserInfoService {
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get user info: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      throw new Error('Failed to get user information');
    }
  }
}
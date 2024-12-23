import type { GoogleUserInfo } from '../../types/google-auth';

export class GoogleUser {
  async getInfo(accessToken: string): Promise<GoogleUserInfo> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  }
}
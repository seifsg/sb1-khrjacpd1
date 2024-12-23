import { gbpClient } from '../client';
import { GBP_CONFIG } from '../config';
import { GBPAuthError } from '../errors';
import { logError } from '../utils/logging';
import { mockAuthResponse } from '../mock/auth';
import type { GBPAuthResponse } from '../types';

export async function getAuthUrl(): Promise<string> {
  if (GBP_CONFIG.isDevelopment) {
    return 'http://localhost:5173/auth/mock';
  }

  const oauth2Client = gbpClient.getOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GBP_CONFIG.scopes,
    prompt: 'consent'
  });
}

export async function authenticate(code: string): Promise<GBPAuthResponse> {
  try {
    if (GBP_CONFIG.isDevelopment) {
      return mockAuthResponse;
    }

    const oauth2Client = gbpClient.getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    gbpClient.setCredentials(tokens);

    const userInfo = await getUserInfo();

    return {
      tokens,
      userInfo
    };
  } catch (error) {
    logError(error, 'authenticate');
    throw new GBPAuthError('Failed to authenticate with Google', error);
  }
}

export async function getUserInfo() {
  try {
    const oauth2Client = gbpClient.getOAuth2Client();
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    
    return {
      id: data.id || '',
      email: data.email || '',
      name: data.name || '',
      picture: data.picture
    };
  } catch (error) {
    logError(error, 'getUserInfo');
    throw new GBPAuthError('Failed to get user info', error);
  }
}
import type { GoogleAuthResponse } from '../types/google-account';

export async function initiateGoogleAuth(): Promise<GoogleAuthResponse> {
  // In a real app, this would initiate the Google OAuth flow
  // For demo purposes, we'll simulate a successful connection
  return new Promise((resolve) => {
    // Simulate OAuth popup and API call
    setTimeout(() => {
      resolve({
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        expiresIn: 3600,
        scope: 'https://www.googleapis.com/auth/business.manage',
        email: 'business@example.com',
        name: 'Business Account',
        picture: undefined
      });
    }, 1000);
  });
}

export async function revokeGoogleAuth(accountId: string): Promise<void> {
  // In a real app, this would revoke the Google OAuth tokens
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}
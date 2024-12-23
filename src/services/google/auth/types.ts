import type { GoogleUserInfo, GoogleAuthResponse, TokenResponse } from '../../../types/google-auth';

export interface AuthConfig {
  clientId: string;
  scopes: string[];
  origins: string[];
  redirectUri: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type { GoogleUserInfo, GoogleAuthResponse, TokenResponse };
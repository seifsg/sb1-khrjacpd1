import type { GoogleUserInfo, GoogleAuthResponse, TokenResponse } from '../../types/google-auth';

export type { GoogleUserInfo, GoogleAuthResponse, TokenResponse };

export interface TokenClientConfig {
  clientId: string;
  scope: string;
  callback: (response: TokenResponse) => void;
  error_callback?: (error: Error) => void;
}
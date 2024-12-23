import { GBPLocation } from './gbp-fields';

export interface GoogleAccount {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  connectedAt: Date;
  lastSynced: Date;
  locations: GBPLocation[];
}

export interface GoogleAuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
  email: string;
  name: string;
  picture?: string;
}
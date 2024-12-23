import { AuthLogger } from '../../../utils/logging/auth-logger';
import { TokenClient } from './token-client';
import { UserInfoService } from './user-info';
import { tokenManager } from './token-manager';
import { accountsApi } from '../../gbp/api/accounts';
import { ScriptLoader } from './script-loader';
import { PopupManager } from './popup-manager';
import type { GoogleAuthResponse } from '../types';

export class AuthFlow {
  private readonly tokenClient: TokenClient;
  private readonly userInfoService: UserInfoService;
  private readonly scriptLoader: ScriptLoader;
  private readonly popupManager: PopupManager;
  private isAuthInProgress = false;

  constructor() {
    this.tokenClient = new TokenClient();
    this.userInfoService = new UserInfoService();
    this.scriptLoader = ScriptLoader.getInstance();
    this.popupManager = new PopupManager();
  }

  async start(): Promise<GoogleAuthResponse> {
    if (this.isAuthInProgress) {
      throw new Error('Authentication already in progress');
    }

    this.isAuthInProgress = true;
    AuthLogger.logInfo('Starting Authentication Flow', {
      timestamp: new Date().toISOString()
    });

    try {
      // Step 1: Load Google Script
      await this.scriptLoader.load();
      AuthLogger.logInfo('Google Script Loaded');

      // Step 2: Initialize Token Client
      await this.tokenClient.initialize(this.popupManager);
      AuthLogger.logInfo('Token Client Ready');

      // Step 3: Request Access Token
      const tokenResponse = await this.tokenClient.requestToken({
        prompt: 'select_account'
      });

      if (!tokenResponse.access_token) {
        throw new Error('No access token received');
      }

      // Step 4: Get User Info
      const userInfo = await this.userInfoService.getUserInfo(tokenResponse.access_token);
      AuthLogger.logInfo('User Info Retrieved', {
        email: userInfo.email
      });

      // Step 5: Get GBP Accounts
      try {
        const accounts = await accountsApi.listAccounts(tokenResponse.access_token);
        AuthLogger.logInfo('GBP Accounts Retrieved', {
          accountCount: accounts.length,
          userEmail: userInfo.email,
          accounts: accounts.map(acc => ({
            accountName: acc.accountName,
            type: acc.type,
            role: acc.role,
            verificationState: acc.state.status
          }))
        });
      } catch (error) {
        AuthLogger.logError('Failed to fetch GBP accounts', {
          error,
          userEmail: userInfo.email
        });
      }

      return {
        user: userInfo,
        accessToken: tokenResponse.access_token
      };

    } catch (error) {
      AuthLogger.logError('Authentication Flow Failed', error);
      throw error;
    } finally {
      this.isAuthInProgress = false;
      this.popupManager.cleanup();
    }
  }
}
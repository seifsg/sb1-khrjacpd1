import { BaseApi } from './base';
import { GBPCache } from '../utils/cache';
import { ApiLogger } from '../../../utils/logging/api-logger';
import { withRetry } from '../utils/retry';
import type { GBPAccount } from '../types';

export class AccountsApi extends BaseApi {
  private readonly ACCOUNTS_ENDPOINT = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts';

  async listAccounts(accessToken: string): Promise<GBPAccount[]> {
    const cacheKey = `accounts_${accessToken}`;
    const cached = GBPCache.get<GBPAccount[]>(cacheKey);

    if (cached) {
      ApiLogger.logRequest('accounts.list', { 
        source: 'cache',
        timestamp: new Date().toISOString()
      });
      return cached;
    }

    try {
      ApiLogger.logRequest('accounts.list', { 
        endpoint: this.ACCOUNTS_ENDPOINT,
        method: 'GET',
        timestamp: new Date().toISOString()
      });

      const response = await withRetry(() => 
        fetch(this.ACCOUNTS_ENDPOINT, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.statusText}`);
      }

      const data = await response.json();
      const accounts = data.accounts || [];

      ApiLogger.logResponse('accounts.list', {
        status: 'success',
        accountCount: accounts.length,
        timestamp: new Date().toISOString()
      });

      // Log each account (excluding sensitive info)
      accounts.forEach((account: GBPAccount) => {
        ApiLogger.logInfo('GBP Account Found', {
          accountName: account.accountName,
          type: account.type,
          role: account.role,
          verificationState: account.state.status,
          timestamp: new Date().toISOString()
        });
      });

      GBPCache.set(cacheKey, accounts);
      return accounts;

    } catch (error) {
      ApiLogger.logError('accounts.list', {
        error,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}

export const accountsApi = new AccountsApi();
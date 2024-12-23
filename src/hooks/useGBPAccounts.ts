import { useState, useEffect } from 'react';
import { accountsApi } from '../services/gbp/api/accounts';
import { ApiLogger } from '../utils/logging/api-logger';
import type { GBPAccount, GBPLocation } from '../types/gbp-fields';

export function useGBPAccounts(accessToken: string | null) {
  const [accounts, setAccounts] = useState<GBPAccount[]>([]);
  const [locations, setLocations] = useState<Record<string, GBPLocation[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedAccounts = await accountsApi.listAccounts(accessToken);
        setAccounts(fetchedAccounts);
        
        ApiLogger.logInfo('GBP Accounts Loaded', {
          accountCount: fetchedAccounts.length,
          timestamp: new Date().toISOString()
        });

        // Log each account's details
        fetchedAccounts.forEach(account => {
          ApiLogger.logInfo('GBP Account Details', {
            accountName: account.accountName,
            type: account.type,
            role: account.role,
            verificationState: account.state.status,
            timestamp: new Date().toISOString()
          });
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch accounts';
        setError(message);
        ApiLogger.logError('Failed to fetch GBP accounts', {
          error: err,
          timestamp: new Date().toISOString()
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [accessToken]);

  return { accounts, locations, isLoading, error };
}
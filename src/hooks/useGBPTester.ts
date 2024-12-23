import { useState, useEffect } from 'react';
import { AuthLogger } from '../utils/logging/auth-logger';
import { tokenManager } from '../services/google/auth/token-manager';
import type { GBPAccount, GBPLocation } from '../types/gbp-fields';
import type { RequestDetails } from '../types/gbp-tester';

export function useGBPTester() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<GBPAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [locations, setLocations] = useState<GBPLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<RequestDetails | null>(null);

  useEffect(() => {
    const storedToken = tokenManager.ensureValidToken();
    if (storedToken) {
      storedToken.then(token => {
        if (token) setToken(token);
      });
    }
  }, []);

  const makeRequest = async (url: string) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const requestDetails: RequestDetails = {
      url,
      method: 'GET',
      headers
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      requestDetails.response = data;
      setLastRequest(requestDetails);
      return data;
    } catch (err) {
      requestDetails.error = err;
      setLastRequest(requestDetails);
      throw err;
    }
  };

  const fetchAccounts = async () => {
    setIsLoading(true);
    setError(null);
    setAccounts([]);
    setLocations([]);
    setSelectedAccount('');

    try {
      const data = await makeRequest('https://mybusinessaccountmanagement.googleapis.com/v1/accounts');
      
      if (data.accounts) {
        setAccounts(data.accounts);
        AuthLogger.logInfo('GBP Accounts Retrieved', {
          accountCount: data.accounts.length,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('No accounts data in response');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch accounts';
      setError(message);
      AuthLogger.logError('Failed to fetch GBP accounts', { error: err });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocations = async (accountName: string) => {
    setIsLoading(true);
    setError(null);
    setLocations([]);

    try {
      const data = await makeRequest(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`);
      
      if (data.locations) {
        setLocations(data.locations);
        AuthLogger.logInfo('GBP Locations Retrieved', {
          accountName,
          locationCount: data.locations.length,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('No locations data in response');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch locations';
      setError(message);
      AuthLogger.logError('Failed to fetch GBP locations', { error: err, accountName });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAccounts();
  };

  const handleAccountSelect = (accountName: string) => {
    setSelectedAccount(accountName);
    fetchLocations(accountName);
  };

  return {
    token,
    setToken,
    isLoading,
    accounts,
    locations,
    error,
    lastRequest,
    handleSubmit,
    handleAccountSelect
  };
}
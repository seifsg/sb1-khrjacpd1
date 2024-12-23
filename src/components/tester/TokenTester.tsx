import React, { useState, useEffect } from 'react';
import { Send, Building, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthLogger } from '../../utils/logging/auth-logger';
import { tokenManager } from '../../services/google/auth/token-manager';

interface RequestDetails {
  url: string;
  method: string;
  headers: Record<string, string>;
  response?: any;
  error?: any;
}

export default function TokenTester() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [locations, setLocations] = useState<any[]>([]);
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

  const makeRequest = async (url: string, headers: Record<string, string>) => {
    const requestDetails: RequestDetails = {
      url,
      method: 'GET',
      headers
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();

      if (!response.ok) {
        requestDetails.error = data.error;
        throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      requestDetails.response = data;
      return data;
    } catch (err) {
      requestDetails.error = err;
      throw err;
    } finally {
      setLastRequest(requestDetails);
    }
  };

  const fetchAccounts = async () => {
    setIsLoading(true);
    setError(null);
    setAccounts([]);
    setLocations([]);
    setSelectedAccount('');

    const url = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const data = await makeRequest(url, headers);
      setAccounts(data.accounts || []);

      AuthLogger.logInfo('GBP Accounts List Request', {
        status: 'success',
        accountCount: data.accounts?.length || 0,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch accounts';
      setError(message);
      AuthLogger.logError('GBP Accounts List Request Failed', {
        error: err,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocations = async (accountName: string) => {
    setIsLoading(true);
    setError(null);
    setLocations([]);

    // Use the full account name path for locations request
    const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const data = await makeRequest(url, headers);
      setLocations(data.locations || []);

      AuthLogger.logInfo('GBP Locations List Request', {
        status: 'success',
        accountName,
        locationCount: data.locations?.length || 0,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch locations';
      setError(message);
      AuthLogger.logError('GBP Locations List Request Failed', {
        error: err,
        accountName,
        timestamp: new Date().toISOString()
      });
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">GBP API Tester</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access Token
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="Your access token will be pre-filled if available..."
          />
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <p>This will make requests to:</p>
          <code className="block bg-gray-100 px-2 py-1 rounded mb-1">
            GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts
          </code>
          <code className="block bg-gray-100 px-2 py-1 rounded">
            GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/&#123;accountId&#125;/locations
          </code>
        </div>

        <button
          type="submit"
          disabled={!token || isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={20} />
          <span>{isLoading ? 'Fetching...' : 'Fetch Accounts'}</span>
        </button>
      </form>

      {lastRequest && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4 border">
          <h3 className="font-medium mb-2">Last Request Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">URL:</span> {lastRequest.url}
            </p>
            <p>
              <span className="font-medium">Method:</span> {lastRequest.method}
            </p>
            <div>
              <p className="font-medium mb-1">Headers:</p>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(lastRequest.headers, null, 2)}
              </pre>
            </div>
            {lastRequest.error && (
              <div>
                <p className="font-medium text-red-600 mb-1">Error Response:</p>
                <pre className="bg-red-50 p-2 rounded text-red-700">
                  {JSON.stringify(lastRequest.error, null, 2)}
                </pre>
              </div>
            )}
            {lastRequest.response && (
              <div>
                <p className="font-medium text-green-600 mb-1">Response:</p>
                <pre className="bg-green-50 p-2 rounded text-green-700">
                  {JSON.stringify(lastRequest.response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg mb-6">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {accounts.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-4 mb-4">
              <Building size={24} className="text-blue-600" />
              <h2 className="text-xl font-semibold">Business Accounts ({accounts.length})</h2>
            </div>
            <div className="space-y-4">
              {accounts.map((account: any) => (
                <div key={account.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{account.accountName}</h3>
                      <p className="text-sm text-gray-500">{account.name}</p>
                    </div>
                    <button
                      onClick={() => handleAccountSelect(account.name)}
                      disabled={isLoading}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                    >
                      <span>View Locations</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="text-sm">
                    <p>Type: {account.type}</p>
                    {account.role && <p>Role: {account.role}</p>}
                    <p>Status: {account.state?.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {locations.length > 0 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-4 mb-4">
                <MapPin size={24} className="text-green-600" />
                <h2 className="text-xl font-semibold">Locations ({locations.length})</h2>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                {JSON.stringify(locations, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
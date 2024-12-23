import React from 'react';
import { Send } from 'lucide-react';

interface TokenInputProps {
  token: string;
  setToken: (token: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TokenInput({ token, setToken, isLoading, onSubmit }: TokenInputProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mb-8">
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
          GET https://mybusinessbusinessinformation.googleapis.com/v1/&#123;accountName&#125;/locations
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
  );
}
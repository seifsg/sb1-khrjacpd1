import React, { useState } from 'react';
import { Plus, AlertCircle, Mail } from 'lucide-react';
import { useGoogleAccount } from '../../context/GoogleAccountContext';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useToast } from '../../context/ToastContext';
import { AuthLogger } from '../../utils/logging/auth-logger';

export default function ConnectAccountButton() {
  const { addAccount } = useGoogleAccount();
  const { signIn, isLoading, userEmail } = useGoogleAuth();
  const { showSuccess, showError } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    
    try {
      AuthLogger.logInfo('Initiating Google account connection');
      const response = await signIn();
      
      if (!response?.user) {
        throw new Error('No user information received from Google');
      }

      await addAccount(
        response.user.email,
        response.user.name,
        response.user.picture
      );

      showSuccess(`Successfully connected account: ${response.user.email}`);
      
      AuthLogger.logAuthEvent('Account Connected', {
        userEmail: response.user.email,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect account';
      setError(message);
      showError(message);
      AuthLogger.logError('Failed to connect account', { error: err });
    }
  };

  return (
    <div className="inline-flex flex-col items-start">
      {userEmail && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Mail size={16} />
          <span>Connected as: {userEmail}</span>
        </div>
      )}
      
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} />
        <span>{isLoading ? 'Connecting...' : 'Connect Account'}</span>
      </button>
      
      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
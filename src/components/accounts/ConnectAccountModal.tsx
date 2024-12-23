import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useGoogleAccount } from '../../context/GoogleAccountContext';
import type { GoogleAuthResponse } from '../../types/google-account';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (response: GoogleAuthResponse) => void;
}

const ConnectAccountModal: React.FC<ConnectAccountModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { hasAccount } = useGoogleAccount();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would initiate the Google OAuth flow
      // For now, we'll simulate a successful connection
      const mockResponse: GoogleAuthResponse = {
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        expiresIn: 3600,
        scope: 'https://www.googleapis.com/auth/business.manage',
        email: 'newbusiness@gmail.com',
        name: 'New Business',
        picture: undefined
      };

      // Check if account already exists
      if (hasAccount(mockResponse.email)) {
        setError('This Google account is already connected');
        return;
      }

      await onConnect(mockResponse);
      onClose();
    } catch (err) {
      setError('Failed to connect Google account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Connect Google Account</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Connect your Google account to monitor your business profiles. We'll only
            access the information needed to track changes to your listings.
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>{isLoading ? 'Connecting...' : 'Sign in with Google'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectAccountModal;
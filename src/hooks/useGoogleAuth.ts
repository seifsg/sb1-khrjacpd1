import { useState } from 'react';
import { AuthFlow } from '../services/google/auth/auth-flow';
import { AuthLogger } from '../utils/logging/auth-logger';
import { useGoogleAccount } from '../context/GoogleAccountContext';
import type { GoogleAuthResponse } from '../types/google-auth';

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addAccount } = useGoogleAccount();

  const signIn = async (): Promise<GoogleAuthResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      AuthLogger.logInfo('Starting Google authentication');
      const response = await new AuthFlow().start();
      
      if (!response?.user?.email) {
        throw new Error('No user email received from Google');
      }

      // Add account to context immediately after successful auth
      await addAccount(
        response.user.email,
        response.user.name,
        response.user.picture
      );

      AuthLogger.logInfo('Authentication successful', { 
        email: response.user.email 
      });
      
      return response;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google';
      AuthLogger.logError('Authentication failed', { error: err });
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    signIn
  };
}
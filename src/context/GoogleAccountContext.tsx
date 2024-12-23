import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthLogger } from '../utils/logging/auth-logger';
import type { GoogleAccount } from '../types/google-account';
import type { GBPAccount, GBPLocation } from '../types/gbp-fields';

interface GoogleAccountContextType {
  accounts: GoogleAccount[];
  addAccount: (email: string, name: string, picture?: string) => Promise<void>;
  removeAccount: (accountId: string) => Promise<void>;
  updateLocations: (accountId: string, locations: GBPLocation[]) => void;
  getAccountById: (accountId: string) => GoogleAccount | undefined;
  hasAccount: (email: string) => boolean;
}

const GoogleAccountContext = createContext<GoogleAccountContextType | undefined>(undefined);

export function GoogleAccountProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<GoogleAccount[]>([]);

  const addAccount = useCallback(async (email: string, name: string, picture?: string) => {
    if (accounts.some(acc => acc.email === email)) {
      throw new Error('This Google account is already connected');
    }

    const newAccount: GoogleAccount = {
      id: crypto.randomUUID(),
      email,
      name,
      profilePicture: picture,
      connectedAt: new Date(),
      lastSynced: new Date(),
      locations: []
    };

    setAccounts(prev => [...prev, newAccount]);
    
    AuthLogger.logAuthEvent('Account Added', {
      userEmail: email,
      timestamp: new Date().toISOString()
    });
  }, [accounts]);

  const removeAccount = useCallback(async (accountId: string) => {
    setAccounts(prev => {
      const account = prev.find(acc => acc.id === accountId);
      if (account) {
        AuthLogger.logAuthEvent('Account Removed', {
          userEmail: account.email,
          timestamp: new Date().toISOString()
        });
      }
      return prev.filter(acc => acc.id !== accountId);
    });
  }, []);

  const updateLocations = useCallback((accountId: string, locations: GBPLocation[]) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          locations,
          lastSynced: new Date()
        };
      }
      return acc;
    }));
  }, []);

  const getAccountById = useCallback((accountId: string) => {
    return accounts.find(acc => acc.id === accountId);
  }, [accounts]);

  const hasAccount = useCallback((email: string) => {
    return accounts.some(acc => acc.email === email);
  }, [accounts]);

  return (
    <GoogleAccountContext.Provider value={{
      accounts,
      addAccount,
      removeAccount,
      updateLocations,
      getAccountById,
      hasAccount,
    }}>
      {children}
    </GoogleAccountContext.Provider>
  );
}

export function useGoogleAccount() {
  const context = useContext(GoogleAccountContext);
  if (!context) {
    throw new Error('useGoogleAccount must be used within a GoogleAccountProvider');
  }
  return context;
}
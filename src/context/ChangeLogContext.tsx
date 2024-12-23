import React, { createContext, useContext, useState } from 'react';
import type { ChangeLog, Location } from '../types';
import type { ChangeNotification } from '../types/notification';

interface ChangeLogContextType {
  history: (ChangeLog & { locationName: string })[];
  addToHistory: (change: ChangeNotification, status: 'approved' | 'rejected') => void;
}

const ChangeLogContext = createContext<ChangeLogContextType | undefined>(undefined);

export function ChangeLogProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<(ChangeLog & { locationName: string })[]>([]);

  const addToHistory = (notification: ChangeNotification, status: 'approved' | 'rejected') => {
    const historyEntry: ChangeLog & { locationName: string } = {
      id: notification.id,
      locationId: notification.locationId,
      locationName: notification.locationName,
      field: notification.field,
      oldValue: notification.oldValue,
      newValue: notification.newValue,
      source: notification.source,
      timestamp: notification.timestamp,
      status
    };

    setHistory(prev => [historyEntry, ...prev]);
  };

  return (
    <ChangeLogContext.Provider value={{ history, addToHistory }}>
      {children}
    </ChangeLogContext.Provider>
  );
}

export function useChangeLog() {
  const context = useContext(ChangeLogContext);
  if (!context) {
    throw new Error('useChangeLog must be used within a ChangeLogProvider');
  }
  return context;
}
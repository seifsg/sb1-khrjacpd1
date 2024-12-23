import { useState } from 'react';
import type { Location } from '../types';

interface UpdateConfirmation {
  isOpen: boolean;
  field: string;
  oldValue: string;
  newValue: string;
  onConfirm: () => Promise<void>;
}

export function useLocationUpdate(location: Location) {
  const [confirmation, setConfirmation] = useState<UpdateConfirmation | null>(null);

  const handleUpdate = async (
    field: string,
    newValue: string,
    oldValue: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      setConfirmation({
        isOpen: true,
        field,
        oldValue,
        newValue,
        onConfirm: async () => {
          try {
            // In a real app, this would call the Google Business Profile API
            console.log(`Updating ${field} from "${oldValue}" to "${newValue}"`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            setConfirmation(null);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  };

  const closeConfirmation = () => {
    setConfirmation(null);
  };

  return {
    confirmation,
    handleUpdate,
    closeConfirmation
  };
}
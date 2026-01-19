'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { AlertType } from '@/src/types';

type AlertContextType = {
  alert: AlertType;
  showAlert: (alert: NonNullable<AlertType>) => void;
  clearAlert: () => void;
};

const AlertContext = createContext<AlertContextType>({
  alert: null,
  showAlert: () => {},
  clearAlert: () => {},
});

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertType>(null);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const showAlert = useCallback((newAlert: NonNullable<AlertType>) => {
    setAlert(newAlert);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

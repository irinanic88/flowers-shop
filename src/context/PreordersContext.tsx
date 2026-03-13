'use client';

import React, { createContext, useContext } from 'react';

import { usePreordersStatusDialog } from '@/src/hooks/usePreordersStatusDialog';
import { usePreordersTable } from '@/src/hooks/usePreordersTable';

type PreordersContextType = ReturnType<typeof usePreordersTable> &
  ReturnType<typeof usePreordersStatusDialog>;

const PreordersContext = createContext<PreordersContextType | null>(null);

export function PreordersProvider({ children }: { children: React.ReactNode }) {
  const table = usePreordersTable();
  const dialog = usePreordersStatusDialog();

  const value: PreordersContextType = {
    ...dialog,
    ...table,
  };

  return (
    <PreordersContext.Provider value={value}>
      {children}
    </PreordersContext.Provider>
  );
}

export function usePreordersContext() {
  const ctx = useContext(PreordersContext);

  if (!ctx) {
    throw new Error(
      'usePreordersContext must be used inside PreordersProvider',
    );
  }

  return ctx;
}

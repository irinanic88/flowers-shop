'use client';

import React from 'react';

import { PreordersStatusDialog } from '@/src/components/preorders/PreordersStatusDialog';
import { PreordersTable } from '@/src/components/preorders/PreordersTable';
import { PreordersToolbar } from '@/src/components/preorders/PreordersToolbar';
import { PreordersProvider } from '@/src/context/PreordersContext';

export default function PreordersTab() {
  return (
    <PreordersProvider>
      <PreordersToolbar />

      <PreordersTable />

      <PreordersStatusDialog />
    </PreordersProvider>
  );
}

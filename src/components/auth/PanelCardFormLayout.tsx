'use client';

import { Stack } from '@mui/material';
import React from 'react';

import CustomAlert from '@/src/components/common/CustomAlert';
import Loader from '@/src/components/common/Loader';
import Logo from '@/src/components/common/Logo';
import { useLoading } from '@/src/context/LoadingContext';
import { PanelCard, PrimaryButton } from '@/src/styledComponents';
import { AlertType } from '@/src/types/types';

export default function PanelCardFormLayout({
  alert,
  setAlert,
  children,
  submit,
}: {
  submit: { title: string; handler: () => void };
  alert: AlertType;
  setAlert: (v: AlertType) => void;
}) {
  const { loading } = useLoading();
  return (
    <Stack
      sx={{ height: '100vh', position: 'relative' }}
      justifyContent="center"
      alignItems="center"
    >
      {loading ? (
        <Loader />
      ) : (
        <PanelCard
          sx={{
            p: 4,
            maxWidth: '320px',
          }}
        >
          <Stack alignItems="center" spacing={4}>
            {children}
            <PrimaryButton type="submit" onClick={submit.handler}>
              {submit.title}
            </PrimaryButton>
          </Stack>
        </PanelCard>
      )}

      <Stack sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Logo />
      </Stack>
      {alert && (
        <CustomAlert alertState={alert} onClose={() => setAlert(null)} />
      )}
    </Stack>
  );
}

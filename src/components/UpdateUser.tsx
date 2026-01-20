'use client';

import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { AlertType } from '@/src/types';
import { AppDrawer } from '@/src/components/AppDrawer';
import PasswordUpdateForm from '@/src/components/auth/PasswordUpdateForm';
import NameUpdateForm from '@/src/components/auth/NameUpdateForm';

interface UpdateUserProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateUser({ open, onClose }: UpdateUserProps) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Configuración de usuario"
      setAlertState={(v) => setAlert(v)}
      alertState={alert}
      loading={loading}
    >
      <Stack
        spacing={4}
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
        justifyContent="center"
      >
        <NameUpdateForm
          setLoading={(v) => setLoading(v)}
          setAlert={(v) => setAlert(v)}
        />
        <PasswordUpdateForm
          setLoading={(v) => setLoading(v)}
          setAlert={(v) => setAlert(v)}
        />
      </Stack>
    </AppDrawer>
  );
}

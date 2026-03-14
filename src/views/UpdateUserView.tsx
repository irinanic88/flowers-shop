'use client';

import EditNoteIcon from '@mui/icons-material/EditNote';
import { Stack } from '@mui/material';
import React from 'react';

import NameUpdateForm from '@/src/components/auth/NameUpdateForm';
import PasswordUpdateForm from '@/src/components/auth/PasswordUpdateForm';
import { AppDrawer } from '@/src/components/common/AppDrawer';

interface UpdateUserProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateUserView({ open, onClose }: UpdateUserProps) {
  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Configuración de usuario"
      icon={<EditNoteIcon />}
    >
      <Stack sx={{ height: '100%' }} justifyContent="center" spacing={2}>
        <NameUpdateForm />
        <PasswordUpdateForm />
      </Stack>
    </AppDrawer>
  );
}

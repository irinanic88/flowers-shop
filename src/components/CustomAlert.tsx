'use client';

import { Snackbar, Alert } from '@mui/material';
import { AlertType } from '@/src/types';

interface CustomAlertProps {
  alertState: AlertType;
  onClose: () => void;
}

export default function CustomAlert({ alertState, onClose }: CustomAlertProps) {
  return (
    <Snackbar
      open
      autoHideDuration={alertState?.duration}
      onClose={onClose}
      sx={{
        position: 'relative',
        top: 8,
        left: '0 !important',
        right: 0,
        width: '100%',
        justifyContent: 'center',
        px: 1,
      }}
    >
      <Alert onClose={onClose} severity={alertState?.severity} variant="filled">
        {alertState?.message}
      </Alert>
    </Snackbar>
  );
}

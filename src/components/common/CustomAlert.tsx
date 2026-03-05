'use client';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

import { AlertType } from '@/src/types/types';

interface CustomAlertProps {
  alertState: AlertType;
  onClose: () => void;
}

export default function CustomAlert({ alertState, onClose }: CustomAlertProps) {
  return (
    <Snackbar
      open
      autoHideDuration={alertState?.duration || 5000}
      onClose={onClose}
      sx={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'absolute',
        top: 97,
      }}
    >
      <Alert
        onClose={onClose}
        severity={alertState.severity}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          border: `2px solid ${theme.palette[alertState.severity].main}`,
          color: theme.palette[alertState.severity].main,
          alignItems: 'flex-start',
        })}
      >
        <AlertTitle sx={{ textTransform: 'capitalize' }}>
          {alertState.severity}
        </AlertTitle>
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}

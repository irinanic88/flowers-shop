'use client';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

import { CustomAlertProps } from '@/src/types/propsTypes';

export default function CustomAlert({ alertState, onClose }: CustomAlertProps) {
  if (!alertState) return null;

  return (
    <Snackbar
      open
      autoHideDuration={alertState.duration || 3000}
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

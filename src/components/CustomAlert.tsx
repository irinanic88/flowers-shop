'use client';

import { useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface CustomAlertProps {
  message: string;
  severity?: AlertColor;
  duration?: number;
  onClose?: () => void;
}

export default function CustomAlert({
  message,
  severity = 'info',
  duration = 4000,
  onClose,
}: CustomAlertProps) {
  const [open, setOpen] = useState(true);

  const handleClose = (_?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

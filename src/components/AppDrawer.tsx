'use client';

import { Drawer, Box, IconButton, Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CustomAlert from '@/src/components/CustomAlert';
import { AlertType } from '@/src/types';
import Loader from '@/src/components/Loader';

interface AppDrawerProps {
  actions?: React.ReactNode;
  alertState: AlertType;
  setAlertState: (state: AlertType) => void;
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  loading: boolean;
}

export function AppDrawer({
  actions,
  open,
  onClose,
  title,
  header,
  children,
  alertState,
  setAlertState,
  loading,
}: AppDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'secondary',
          maxWidth: '400px',
          width: '100%',
        },
      }}
    >
      {title && (
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h6">{title}</Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {header}

      {alertState && (
        <CustomAlert
          alertState={alertState}
          onClose={() => setAlertState(null)}
        />
      )}

      {loading ? (
        <Loader />
      ) : (
        <Stack alignItems="center" sx={{ width: '100%', height: '100%' }}>
          <Stack
            sx={{
              height: '100%',
              p: 2,
              overflowY: 'auto',
              width: { xs: '100%', md: 400 },
            }}
            justifyContent="space-between"
          >
            {children}
            <Stack mt={2}>{actions}</Stack>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}

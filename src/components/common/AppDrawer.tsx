'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Drawer, Box, IconButton, Typography, Stack } from '@mui/material';
import React from 'react';

import CustomAlert from '@/src/components/common/CustomAlert';
import Loader from '@/src/components/common/Loader';
import { useLoading } from '@/src/context/LoadingContext';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';
import { AlertType } from '@/src/types/types';

interface AppDrawerProps {
  alertState?: AlertType;
  setAlertState?: (state: AlertType) => void;
  open: boolean;
  onClose?: () => void;
  primaryButton?: {
    disabled?: boolean;
    handleSubmit: () => void;
    title: string;
  };
  secondaryButton?: {
    disabled?: boolean;
    handleSubmit: () => void;
    title: string;
  };
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
}

export function AppDrawer({
  open,
  onClose,
  title,
  header,
  children,
  alertState,
  primaryButton,
  secondaryButton,
  setAlertState,
}: AppDrawerProps) {
  const { loading } = useLoading();

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

          {onClose && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}

      {header}

      <Stack sx={{ position: 'relative', height: '100vh' }}>
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

              <Stack direction="row" justifyContent="right" mt={2}>
                <Stack spacing={1}>
                  {primaryButton && (
                    <PrimaryButton
                      disabled={primaryButton.disabled}
                      onClick={primaryButton.handleSubmit}
                    >
                      {primaryButton.title}
                    </PrimaryButton>
                  )}

                  {secondaryButton && (
                    <SecondaryButton
                      disabled={secondaryButton.disabled}
                      onClick={secondaryButton.handleSubmit}
                    >
                      {secondaryButton.title}
                    </SecondaryButton>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
}

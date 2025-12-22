'use client';

import { Drawer, Box, IconButton, Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

interface AppDrawerProps {
  actions?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
}

export function AppDrawer({
  actions,
  open,
  onClose,
  title,
  header,
  children,
}: AppDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'secondary',
          minWidth: '300px',
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
    </Drawer>
  );
}

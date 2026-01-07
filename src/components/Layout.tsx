'use client';

import React, { ReactNode } from 'react';
import { Divider, Stack } from '@mui/material';
import Logo from '@/src/components/Logo';

interface LayoutProps {
  actions: ReactNode;
  children: ReactNode;
}

export default function Layout({ actions, children }: LayoutProps) {
  return (
    <Stack
      sx={{
        height: '100vh',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          width: '100%',
          flexShrink: 0,
        }}
        px={{ xs: 2, md: 5 }}
        py={2}
      >
        <Logo />

        {actions}
      </Stack>

      <Divider
        sx={(theme) => ({
          borderColor: theme.palette.divider,
        })}
        flexItem
      />

      <Stack
        sx={{
          flex: 1,
        }}
        px={{ xs: 3, md: 5 }}
        pb={10}
        alignItems="center"
      >
        {children}
      </Stack>
    </Stack>
  );
}

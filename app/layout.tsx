'use client';

import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './globals.css';
import { AuthProvider } from '@/src/context/AuthContext';

const theme = createTheme({
  palette: {
    primary: { main: '#59ab5c' },
    secondary: { main: '#fd8171' },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

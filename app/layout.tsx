import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import './globals.css';

import AppProviders from '@/src/components/setup/AppProviders';
import ClientThemeProvider from '@/src/components/setup/ClientThemeProvider';
import ThemeRegistry from '@/src/components/setup/ThemeRegistry';

export const metadata = {
  title: 'APS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ClientThemeProvider>
            <CssBaseline />

            <AppProviders>{children}</AppProviders>
          </ClientThemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

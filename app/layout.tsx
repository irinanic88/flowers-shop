import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import './globals.css';

import { AuthProvider } from '@/src/context/AuthContext';
import { CartProvider } from '@/src/context/CartContext';
import { OrdersProvider } from '@/src/context/OrdersContext';
import { ProductsProvider } from '@/src/context/ProductsContext';
import ThemeRegistry from '@/src/components/ThemeRegistry';
import ClientThemeProvider from '@/src/components/ClientThemeProvider';
import { AlertProvider } from '@/src/context/AlertContext';

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

            <AuthProvider>
              <AlertProvider>
                <ProductsProvider>
                  <OrdersProvider>
                    <CartProvider>{children}</CartProvider>
                  </OrdersProvider>
                </ProductsProvider>
              </AlertProvider>
            </AuthProvider>
          </ClientThemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

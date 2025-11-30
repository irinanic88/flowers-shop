import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import ClientThemeProvider from "@/src/components/ClientThemeProvider";
import { CartProvider } from "@/src/context/CartContext";
import { OrdersProvider } from "@/src/context/OrdersContext";

export const metadata = {
  title: "APS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <OrdersProvider>
            <CartProvider>
              <ClientThemeProvider>
                <CssBaseline />
                {children}
              </ClientThemeProvider>
            </CartProvider>
          </OrdersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

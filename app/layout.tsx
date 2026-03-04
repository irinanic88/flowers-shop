import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import "./globals.css";

import ThemeRegistry from "@/src/components/setup/ThemeRegistry.tsx";
import ClientThemeProvider from "@/src/components/setup/ClientThemeProvider.tsx";
import AppProviders from "@/src/components/setup/AppProviders.tsx";

export const metadata = {
  title: "APS",
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

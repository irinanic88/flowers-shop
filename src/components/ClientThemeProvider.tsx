"use client";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: { main: "#548c2f" },
    secondary: { main: "#f1f8ff" },
  },
});

export default function ClientThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

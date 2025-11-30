"use client";

import { ReactNode } from "react";
import { Box, Stack } from "@mui/material";
import Logo from "@/src/components/Logo";

interface LayoutProps {
  actions: ReactNode;
  children: ReactNode;
}

export default function Layout({ actions, children }: LayoutProps) {
  return (
    <Stack
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: "100%",
          flexShrink: 0,
          p: 2,
        }}
      >
        <Logo />

        {actions}
      </Stack>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}

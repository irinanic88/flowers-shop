"use client";

import React, { ReactNode } from "react";
import { Divider, Stack } from "@mui/material";
import Loader from "@/src/components/common/Loader.tsx";
import Logo from "@/src/components/common/Logo.tsx";
import CustomAlert from "@/src/components/common/CustomAlert.tsx";
import { useAlert } from "@/src/context/AlertContext.tsx";
import { useLoading } from "@/src/context/LoadingContext.tsx";

interface LayoutProps {
  actions: ReactNode;
  children: ReactNode;
}

export default function Layout({ actions, children }: LayoutProps) {
  const { alert, clearAlert } = useAlert();
  const { loading } = useLoading();

  return (
    <Stack
      sx={{
        height: "100vh",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
          flexShrink: 0,
        }}
        px={{ xs: 2, md: 5 }}
        py={2}
      >
        <Logo />

        {!loading && actions}
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
        {alert && <CustomAlert alertState={alert} onClose={clearAlert} />}
        {loading ? <Loader /> : children}
      </Stack>
    </Stack>
  );
}

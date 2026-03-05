"use client";

import React from "react";
import { Stack } from "@mui/material";
import Loader from "@/src/components/common/Loader.tsx";
import { PanelCard, PrimaryButton } from "@/src/styledComponents.tsx";
import Logo from "@/src/components/common/Logo.tsx";
import { AlertType } from "@/src/types/types.ts";
import { useLoading } from "@/src/context/LoadingContext.tsx";
import CustomAlert from "@/src/components/common/CustomAlert.tsx";

export default function PanelCardFormLayout({
  alert,
  setAlert,
  children,
  submit,
}: {
  submit: { title: string; handler: () => void };
  alert: AlertType;
  setAlert: (v: AlertType) => void;
}) {
  const { loading } = useLoading();
  return (
    <Stack
      sx={{ height: "100vh", position: "relative" }}
      justifyContent="center"
      alignItems="center"
    >
      {loading ? (
        <Loader />
      ) : (
        <PanelCard
          sx={{
            p: 4,
            maxWidth: "320px",
          }}
        >
          <Stack alignItems="center" spacing={4}>
            {children}
            <PrimaryButton type="submit" onClick={submit.handler}>
              {submit.title}
            </PrimaryButton>
          </Stack>
        </PanelCard>
      )}

      <Stack sx={{ position: "absolute", top: 20, left: 20 }}>
        <Logo />
      </Stack>
      {alert && (
        <CustomAlert alertState={alert} onClose={() => setAlert(null)} />
      )}
    </Stack>
  );
}

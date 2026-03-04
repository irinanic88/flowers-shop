"use client";

import React, { useState } from "react";
import { Stack } from "@mui/material";
import { AlertType } from "@/src/types.ts";
import { AppDrawer } from "@/src/components/common/AppDrawer.tsx";
import PasswordUpdateForm from "@/src/components/auth/PasswordUpdateForm.tsx";
import NameUpdateForm from "@/src/components/auth/NameUpdateForm.tsx";

interface UpdateUserProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateUserView({ open, onClose }: UpdateUserProps) {
  const [alert, setAlert] = useState<AlertType>(null);

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Configuración de usuario"
      setAlertState={(v) => setAlert(v)}
      alertState={alert}
    >
      <Stack sx={{ height: "100%" }} justifyContent="center" spacing={1}>
        <NameUpdateForm
          setLoading={(v) => setLoading(v)}
          setAlert={(v) => setAlert(v)}
        />
      </Stack>
    </AppDrawer>
  );
}

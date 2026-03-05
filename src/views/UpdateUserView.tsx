"use client";

import React, { useState } from "react";
import { Stack } from "@mui/material";
import { AlertType } from "@/src/types/types.ts";
import { AppDrawer } from "@/src/components/common/AppDrawer.tsx";
import PasswordUpdateForm from "@/src/components/auth/PasswordUpdateForm.tsx";
import NameUpdateForm from "@/src/components/auth/NameUpdateForm.tsx";

interface UpdateUserProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateUserView({ open, onClose }: UpdateUserProps) {
  return (
    <AppDrawer open={open} onClose={onClose} title="Configuración de usuario">
      <Stack sx={{ height: "100%" }} justifyContent="center" spacing={2}>
        <NameUpdateForm />
        <PasswordUpdateForm />
      </Stack>
    </AppDrawer>
  );
}

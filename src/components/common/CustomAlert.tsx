"use client";

import { Snackbar, Alert } from "@mui/material";
import { AlertType } from "@/src/types.ts";

interface CustomAlertProps {
  alertState: AlertType;
  onClose: () => void;
}

export default function CustomAlert({ alertState, onClose }: CustomAlertProps) {
  return (
    <Snackbar
      open
      autoHideDuration={alertState?.duration}
      onClose={onClose}
      sx={{
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        px: 1,
        position: "absolute",
        top: 0,
      }}
    >
      <Alert onClose={onClose} severity={alertState?.severity} variant="filled">
        {alertState?.message}
      </Alert>
    </Snackbar>
  );
}

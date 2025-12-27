"use client";

import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, forwardRef, useImperativeHandle } from "react";

export type PasswordFieldsRef = {
  resetVisibility: () => void;
};

interface PasswordFieldsProps {
  password: string;
  onChangePassword: (value: string) => void;
  confirmPassword?: string;
  onChangeConfirmPassword?: (value: string) => void;
  showConfirm?: boolean;
  disabled?: boolean;
}

const PasswordFields = forwardRef<PasswordFieldsRef, PasswordFieldsProps>(
  (
    {
      password,
      onChangePassword,
      confirmPassword,
      onChangeConfirmPassword,
      showConfirm = false,
      disabled = false,
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useImperativeHandle(ref, () => ({
      resetVisibility() {
        setShowPassword(false);
        setShowConfirmPassword(false);
      },
    }));

    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="Contraseña"
          type={showPassword && !disabled ? "text" : "password"}
          value={!password && disabled ? "00000000000000" : password}
          onChange={(e) => onChangePassword(e.target.value)}
          fullWidth
          disabled={disabled}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ display: disabled ? "none" : "flex" }}
              >
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                  disabled={disabled}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {showConfirm && onChangeConfirmPassword && (
          <TextField
            label="Confirmar Contraseña"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => onChangeConfirmPassword(e.target.value)}
            fullWidth
            disabled={disabled}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>
    );
  },
);

PasswordFields.displayName = "PasswordFields";

export default PasswordFields;

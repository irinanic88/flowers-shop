"use client";

import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface PasswordFieldsProps {
  password: string;
  onChangePassword: (value: string) => void;
  confirmPassword?: string;
  onChangeConfirmPassword?: (value: string) => void;
  showConfirm?: boolean;
  disabled?: boolean;
}

export default function PasswordFields({
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
  showConfirm = false,
  disabled = false,
}: PasswordFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <TextField
        label="Contraseña"
        type={showPassword ? "text" : "password"}
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
                onClick={() => setShowPassword((prev) => !prev)}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={disabled}
        />
      )}
    </Stack>
  );
}

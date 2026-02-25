"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Stack, TextField } from "@mui/material";
import { AlertType, AuthFormType } from "@/src/types";
import { PanelCard, PrimaryButton } from "@/src/styledComponents";
import { equals } from "ramda";
import { useAlert } from "@/src/context/AlertContext";

import {
  isEmailValid,
  isPasswordValid,
  isRequired,
} from "@/src/helpers/validators";
import PasswordFields from "@/src/components/PasswordFields";
import Loader from "@/src/components/Loader.tsx";
import Logo from "@/src/components/Logo.tsx";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<AlertType>(null);

  const { showAlert } = useAlert();

  const handleFieldChange = (field: keyof AuthFormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!isEmailValid(form.email))
      return setAlert({ message: "Correo inválido", severity: "error" });

    void submitSignUp(form);
  };

  const submitSignUp = async ({ email, password, name }: AuthFormType) => {
    if (!isPasswordValid(password))
      return setAlert({
        message: "Contraseña inválida (≥8 caracteres, letras y números)",
        severity: "error",
      });
    if (!isRequired(name))
      return setAlert({
        message: "El nombre es obligatorio",
        severity: "error",
      });

    if (!equals(password, confirmPassword)) {
      return setAlert({
        message: "Las contraseñas no coinciden",
        severity: "error",
      });
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: "http://localhost:3000",
        },
      });

      if (error) throw error;

      showAlert({
        message: "Revisa tu correo para confirmar el registro",
        severity: "success",
      });

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";

      setAlert({
        message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
            p: 2,
            width: "320px",
          }}
        >
          <Stack alignItems="center" spacing={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit();
              }}
              style={{
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
                spacing={2}
              >
                <Stack spacing={2}>
                  <TextField
                    label="Nombre de usuario"
                    value={form.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    fullWidth
                  />

                  <TextField
                    label="Correo electrónico"
                    value={form.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    fullWidth
                  />

                  <PasswordFields
                    password={form.password}
                    onChangePassword={(v) => handleFieldChange("password", v)}
                    showConfirm={true}
                    confirmPassword={confirmPassword}
                    onChangeConfirmPassword={setConfirmPassword}
                  />
                </Stack>
              </Stack>
            </form>

            <PrimaryButton type="submit" onClick={handleSubmit}>
              Iniciar sesion
            </PrimaryButton>
          </Stack>
        </PanelCard>
      )}

      <Stack sx={{ position: "absolute", top: 20, left: 20 }}>
        <Logo />
      </Stack>
    </Stack>
  );
}

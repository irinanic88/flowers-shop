"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase.js";
import { Stack, TextField } from "@mui/material";
import { AlertType, AuthFormType } from "@/src/types.ts";
import { PrimaryButton } from "@/src/styledComponents.tsx";
import { equals } from "ramda";
import { AuthTitlesDict } from "@/src/constants.ts";
import { useAlert } from "@/src/context/AlertContext.tsx";

import { isEmailValid, isPasswordValid } from "@/src/helpers/validators.ts";
import { AppDrawer } from "@/src/components/AppDrawer.tsx";
import PasswordFields from "@/src/components/PasswordFields.tsx";
import RedirectionLink from "@/src/components/RedirectionLink.tsx";
import ValidationErrorsList from "@/src/components/ValidationErrorsList.tsx";

type AuthFormProps = {
  open: boolean;
  onClose: () => void;
};

type AuthMode = "signIn" | "forgotPassword";

export default function AuthForm({ open, onClose }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<AlertType>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [isSignIn, setIsSignIn] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [title, setTitle] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { showAlert } = useAlert();

  useEffect(() => {
    setIsSignIn(equals(mode, "signIn"));
    setIsForgotPassword(equals(mode, "forgotPassword"));

    setTitle(AuthTitlesDict[mode].title);
  }, [mode]);

  const handleFieldChange = (field: keyof AuthFormType, value: string) => {
    setValidationErrors([]);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isEmailValid(form.email)) {
      setValidationErrors(["Correo inválido"]);
      return;
    }

    if (isSignIn) return await submitSignIn(form);

    if (isForgotPassword) return await submitForgotPassword(form.email);
  };

  const submitSignIn = async ({ email, password }: AuthFormType) => {
    if (!isPasswordValid(password)) {
      setValidationErrors((prev) => [
        ...prev,
        "Contraseña inválida (≥8 caracteres, letras y números)",
      ]);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
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

  const submitForgotPassword = async (email: string) => {
    setLoading(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    showAlert({
      message: "Si el correo existe, recibirás un email con instrucciones.",
      severity: "success",
    });

    setCooldown(60);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    onClose();

    setLoading(false);
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <Stack spacing={1}>
          <PrimaryButton
            disabled={loading || cooldown > 0}
            onClick={handleSubmit}
          >
            {cooldown > 0
              ? `Espera ${cooldown}s`
              : AuthTitlesDict[mode].submitButton}
          </PrimaryButton>
        </Stack>
      }
      alertState={alert}
      setAlertState={(v) => setAlert(v)}
      loading={loading}
    >
      <Stack sx={{ height: "100%" }} justifyContent="center">
        <Stack alignItems="flex-start" spacing={2} sx={{ width: "100%" }}>
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
                  label="Correo electrónico"
                  value={form.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  fullWidth
                />

                {isSignIn && (
                  <PasswordFields
                    password={form.password}
                    onChangePassword={(v) => handleFieldChange("password", v)}
                    showConfirm={false}
                    confirmPassword={confirmPassword}
                    onChangeConfirmPassword={setConfirmPassword}
                  />
                )}
              </Stack>
            </Stack>
          </form>
          {validationErrors.length > 0 && (
            <ValidationErrorsList validationErrors={validationErrors} />
          )}
        </Stack>

        {isSignIn && (
          <RedirectionLink
            linkText="Olvidaste tu contraseña?"
            linkTitle="Recuperar"
            onLinkClick={() => setMode("forgotPassword")}
          />
        )}
      </Stack>
    </AppDrawer>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { AlertType } from "@/src/types.ts";
import { equals } from "ramda";
import { AuthTitlesDict } from "@/src/constants.ts";

import { AppDrawer } from "@/src/components/common/AppDrawer.tsx";
import RedirectionLink from "@/src/components/common/RedirectionLink.tsx";
import CommonForm from "@/src/components/common/CommonForm.tsx";
import { useResetPassword, useSignIn } from "@/src/hooks/api.ts";
import { useAuthFormConfig } from "@/src/helpers/formConfigs.ts";

type AuthFormProps = {
  open: boolean;
  onClose: () => void;
};

type AuthMode = "signIn" | "forgotPassword";

export default function AuthForm({ open, onClose }: AuthFormProps) {
  const [alert, setAlert] = useState<AlertType>(null);
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [authForm, setAuthForm] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const isSignIn = equals(mode, "signIn");
  const isForgotPassword = equals(mode, "forgotPassword");
  const title = AuthTitlesDict[mode].title || "";

  const { requestSignIn, signInError } = useSignIn();
  const { requestResetPassword, resetPasswordError } = useResetPassword();
  const authFormConfig = useAuthFormConfig(isSignIn);

  useEffect(() => {
    if (signInError) setAlert(signInError);
    if (resetPasswordError) setAlert(resetPasswordError);
  }, [signInError, resetPasswordError]);

  const handleSubmit = async () => {
    if (!isFormValid || cooldown > 0) return;

    if (isSignIn) {
      await requestSignIn(authForm);
      void onClose();
    }

    if (isForgotPassword) {
      await requestResetPassword(authForm.email);

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
      void onClose();
    }
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title={title}
      alertState={alert}
      primaryButton={{
        disabled: !isFormValid || cooldown > 0,
        handleSubmit,
        title:
          cooldown > 0
            ? `Inténtalo en ${cooldown}s`
            : AuthTitlesDict[mode].submitButton,
      }}
      setAlertState={(v) => setAlert(v)}
    >
      <Stack sx={{ height: "100%" }} justifyContent="center" spacing={1}>
        <CommonForm
          fillForm={(form, isValid) => {
            setAuthForm(form);
            setIsFormValid(isValid);
          }}
          formConfig={authFormConfig}
        />

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

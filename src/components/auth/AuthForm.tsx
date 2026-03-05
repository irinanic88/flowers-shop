"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { equals } from "ramda";
import { AuthTitlesDict } from "@/src/constants.ts";

import { AppDrawer } from "@/src/components/common/AppDrawer.tsx";
import RedirectionLink from "@/src/components/common/RedirectionLink.tsx";
import CommonForm from "@/src/components/form/CommonForm.tsx";
import { useResetPassword, useSignIn } from "@/src/hooks/api.ts";
import {
  AuthFormConfig,
  RequestResetPasswordFormConfig,
} from "@/src/components/form/formConfigs.ts";
import { useAlert } from "@/src/context/AlertContext.tsx";

type AuthFormProps = {
  open: boolean;
  onClose: () => void;
};

type AuthMode = "signIn" | "forgotPassword";

export default function AuthForm({ open, onClose }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [authForm, setAuthForm] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const isSignIn = equals(mode, "signIn");
  const isForgotPassword = equals(mode, "forgotPassword");
  const title = AuthTitlesDict[mode].title || "";

  const { signIn } = useSignIn();
  const { resetPassword } = useResetPassword();
  const { showAlert } = useAlert();

  const startCooldown = (seconds = 60) => {
    setCooldown(seconds);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    if (!isFormValid || cooldown > 0) return;

    const action = isSignIn
      ? () => signIn(authForm)
      : () => resetPassword(authForm);

    const { success, error } = await action();

    if (error) {
      showAlert(error);
      return;
    }

    showAlert(success);

    if (isForgotPassword) {
      startCooldown();
    }

    onClose();
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title={title}
      primaryButton={{
        disabled: !isFormValid || cooldown > 0,
        handleSubmit,
        title:
          cooldown > 0
            ? `Inténtalo en ${cooldown}s`
            : AuthTitlesDict[mode].submitButton,
      }}
    >
      <Stack sx={{ height: "100%" }} justifyContent="center">
        {isSignIn && (
          <Stack spacing={2}>
            <CommonForm
              fillForm={(form, isValid) => {
                setAuthForm(form);
                setIsFormValid(isValid);
              }}
              formConfig={AuthFormConfig}
            />

            <RedirectionLink
              linkText="Olvidaste tu contraseña?"
              linkTitle="Recuperar"
              onLinkClick={() => {
                setAuthForm({});
                setIsFormValid(false);
                setMode("forgotPassword");
              }}
            />
          </Stack>
        )}

        {isForgotPassword && (
          <CommonForm
            fillForm={(form, isValid) => {
              setAuthForm(form);
              setIsFormValid(isValid);
            }}
            formConfig={RequestResetPasswordFormConfig}
          />
        )}
      </Stack>
    </AppDrawer>
  );
}

"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import PanelCardFormLayout from "@/src/components/auth/PanelCardFormLayout";
import CommonForm from "@/src/components/form/CommonForm";
import { SignUpFormConfig } from "@/src/components/form/formConfigs";
import { useConsumeInvite, useInviteToken, useSignUp } from "@/src/hooks/api";
import { AlertType, SignUpFormType } from "@/src/types/types";

export default function SignUpForm() {
  const [signUpForm, setSignUpForm] = useState<SignUpFormType>({
    email: "",
    password: "",
    name: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);
  const [inviteId, setInviteId] = useState<string | null>(null);

  const router = useRouter();
  const { checkInviteToken } = useInviteToken();
  const { signUp } = useSignUp();
  const { consumeInvite } = useConsumeInvite();

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("invite");

      if (!token) {
        setAlert({
          message: "Token de invitación no proporcionado",
          severity: "error",
        });
        return;
      }

      const { data, error } = await checkInviteToken(token);

      if (error) {
        setAlert(error);
        return;
      }

      const parsed = JSON.parse(data);

      if (!parsed?.inviteId) {
        setAlert({
          message: "Token inválido o ya usado",
          severity: "error",
        });
        return;
      }

      setInviteId(parsed.inviteId);
    };

    void verifyToken();
  }, []);

  const handleSubmit = async () => {
    if (!inviteId || !isFormValid) return;

    const { email, password, name } = signUpForm;

    const { data: signUpData, error: signUpError } = await signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signUpError) {
      setAlert(signUpError);
      return;
    }

    const { error: consumeError, success } = await consumeInvite({
      inviteId,
      userId: signUpData.user.id,
    });

    if (consumeError) {
      setAlert(consumeError);
      return;
    }

    setAlert(success);
    router.push("/");
  };

  return (
    <PanelCardFormLayout
      submit={{
        title: "Registrarse",
        handler: handleSubmit,
      }}
      alert={alert}
      setAlert={(v) => setAlert(v)}
    >
      <CommonForm
        fillForm={(form, isValid) => {
          setSignUpForm(form);
          setIsFormValid(isValid);
        }}
        formConfig={SignUpFormConfig}
      />
    </PanelCardFormLayout>
  );
}

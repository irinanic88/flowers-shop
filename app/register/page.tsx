"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Stack, TextField } from "@mui/material";
import { AlertType, AuthFormType } from "@/src/types";
import { PanelCard, PrimaryButton } from "@/src/styledComponents";
import { useAlert } from "@/src/context/AlertContext";
import PasswordFields from "@/src/components/PasswordFields";
import Loader from "@/src/components/Loader.tsx";
import Logo from "@/src/components/Logo.tsx";
import { useRouter } from "next/navigation";
import { validateRegistrationForm } from "@/src/helpers/validators.ts";
import ValidationErrorsList from "@/src/components/ValidationErrorsList.tsx";
import CustomAlert from "@/src/components/CustomAlert.tsx";

export default function SignUpForm() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<AuthFormType>({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertType>(null);

  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const checkInviteToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("invite");

      if (!token) {
        setAlert({
          message: "Token de invitación no proporcionado",
          severity: "error",
        });
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke(
          "check-invite",
          {
            body: { invite: token },
          },
        );

        if (error) throw error;

        const parsed = JSON.parse(data);

        if (!parsed?.inviteId) throw new Error("Token inválido o ya usado");

        setInviteId(parsed.inviteId);
      } catch (err) {
        setAlert({
          message: err instanceof Error ? err.message : "Error desconocido",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    void checkInviteToken();
  }, []);

  const handleFieldChange = (field: keyof AuthFormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const errors = validateRegistrationForm({ ...form, confirmPassword });

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    void createUser(form);
  };

  const createUser = async ({ email, password, name }: AuthFormType) => {
    if (!inviteId) return;

    setLoading(true);

    try {
      const { error: signUpError, data: signUpData } =
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
      if (signUpError) throw signUpError;

      const { error: consumeError } = await supabase.functions.invoke(
        "consume-invite",
        {
          body: {
            inviteId,
            userId: signUpData.user.id,
          },
        },
      );

      if (consumeError) throw consumeError;

      showAlert({
        message: "Tu cuenta ha sido creada correctamente!",
        severity: "success",
      });
      router.push("/");
    } catch (err) {
      setAlert({
        message: err instanceof Error ? err.message : "Error desconocido",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack
      sx={{ height: "100vh", position: "relative" }}
      justifyContent="center"
      alignItems="center"
    >
      {alert ? (
        <CustomAlert alertState={alert} onClose={() => setAlert(null)} />
      ) : (
        <PanelCard
          sx={{
            p: 4,
            maxWidth: "320px",
          }}
        >
          <Stack alignItems="center" spacing={4}>
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
                      label="Nombre de usuario"
                      value={form.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      fullWidth
                    />

                    <TextField
                      label="Correo electrónico"
                      value={form.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
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

              {validationErrors.length > 0 && (
                <ValidationErrorsList validationErrors={validationErrors} />
              )}
            </Stack>

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

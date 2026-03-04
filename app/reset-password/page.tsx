"use client";

import React, { useState, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import Loader from "@/src/components/common/Loader.tsx";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase.js";
import { useAlert } from "@/src/context/AlertContext.tsx";
import { PanelCard, PrimaryButton } from "@/src/styledComponents.tsx";
import PasswordFields, {
  PasswordFieldsRef,
} from "@/src/components/common/PasswordFields.tsx";
import ValidationErrorsList from "@/src/components/common/ValidationErrorsList.tsx";
import { validatePasswordUpdate } from "@/src/helpers/validators.ts";
import Logo from "@/src/components/common/Logo.tsx";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formIsNotValid, setFormIsNotValid] = useState(false);

  const passwordRef = useRef<PasswordFieldsRef>(null);
  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", "?"));
    const access_token = params.get("access_token");
    const type = params.get("type");

    if (access_token && type === "recovery") {
      supabase.auth.setSession({ access_token });
    }
  }, []);

  const handleSubmit = async () => {
    const errors = validatePasswordUpdate(password, confirm);

    if (errors.length > 0) {
      setValidationErrors(errors);
      setFormIsNotValid(true);
      return;
    }

    setFormIsNotValid(false);
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setPassword("");
      setConfirm("");
      showAlert({
        message: "Contraseña actualizada correctamente.",
        severity: "success",
      });
    } catch (err) {
      showAlert({
        message: err instanceof Error ? err.message : "Error desconocido",
        severity: "error",
      });
    } finally {
      setLoading(false);
      router.push("/");
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
            p: 4,
            maxWidth: "320px",
          }}
        >
          <Stack alignItems="center" spacing={4}>
            <Stack alignItems="center" spacing={2} sx={{ width: "100%" }}>
              <PasswordFields
                ref={passwordRef}
                password={password}
                confirmPassword={confirm}
                showConfirm={true}
                onChangePassword={(v: string) => setPassword(v)}
                onChangeConfirmPassword={(v: string) => setConfirm(v)}
                disabled={formIsNotValid}
              />
              {formIsNotValid && (
                <ValidationErrorsList validationErrors={validationErrors} />
              )}
            </Stack>
            <PrimaryButton type="submit" onClick={handleSubmit}>
              Actualizar
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

"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase.js";
import { Stack } from "@mui/material";
import { PrimaryButton } from "@/src/styledComponents.tsx";
import PasswordFields from "@/src/components/PasswordFields.tsx";
import { isPasswordValid } from "@/src/helpers/validators.ts";
import { notEqual } from "ramda";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {
    setError(null);

    if (!isPasswordValid(password))
      return setAlert({
        message: "Contraseña inválida (≥8 caracteres, letras y números)",
        severity: "error",
      });

    if (notEqual(password, confirmPassword)) {
      return setAlert({
        message: "Las contraseñas no coinciden",
        severity: "error",
      });
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  };

  // if (done) {
  //   return (
  //     <Typography>Contraseña actualizada. Ya puedes iniciar sesión.</Typography>
  //   );
  // }

  return (
    <Stack spacing={2} maxWidth={400}>
      <PasswordFields
        password={form.password}
        onChangePassword={(v) => setPassword(v)}
        showConfirm={isSignUp}
        confirmPassword={confirmPassword}
        onChangeConfirmPassword={setConfirmPassword}
      />

      <PrimaryButton onClick={handleReset}>Guardar contraseña</PrimaryButton>
    </Stack>
  );
}

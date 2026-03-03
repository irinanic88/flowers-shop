import PasswordFields, {
  PasswordFieldsRef,
} from "@/src/components/PasswordFields";
import { Stack } from "@mui/material";
import { RoundIconButton } from "@/src/styledComponents";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import React, { useRef, useState } from "react";
import { AlertType } from "@/src/types";
import { validatePasswordUpdate } from "@/src/helpers/validators";
import { supabase } from "@/lib/supabase";
import ValidationErrorsList from "@/src/components/ValidationErrorsList.tsx";

type PasswordUpdateFormProps = {
  setLoading: (v: boolean) => void;
  setAlert: (v: AlertType) => void;
  onSubmit?: () => void;
};

export default function PasswordUpdateForm({
  setLoading,
  setAlert,
  onSubmit,
}: PasswordUpdateFormProps) {
  const [editingPassword, setEditingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const passwordRef = useRef<PasswordFieldsRef>(null);

  const handleSavePassword = async () => {
    const validationErrors = validatePasswordUpdate(password, confirm);

    if (validationErrors.length > 0) return;

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setAlert({ message: `Error: ${error.message}`, severity: "error" });
    } else {
      setEditingPassword(false);
      setPassword("");
      setConfirm("");
      setAlert({
        message: "Contraseña actualizada correctamente.",
        severity: "success",
      });
      onSubmit?.();
    }
  };

  const handleCancelPassword = () => {
    setEditingPassword(false);
    setPassword("");
    setConfirm("");

    passwordRef.current?.resetVisibility();
  };

  return (
    <Stack
      direction={editingPassword ? "column" : "row"}
      spacing={1}
      alignItems={editingPassword ? "flex-start" : "center"}
    >
      <PasswordFields
        ref={passwordRef}
        password={password}
        confirmPassword={confirm}
        showConfirm={editingPassword}
        onChangePassword={(v: string) => setPassword(v)}
        onChangeConfirmPassword={(v: string) => setConfirm(v)}
        disabled={!editingPassword}
      />

      {editingPassword ? (
        <Stack>
          <Stack direction="row" spacing={1}>
            <RoundIconButton onClick={() => handleCancelPassword()}>
              <CloseIcon />
            </RoundIconButton>
            <RoundIconButton
              onClick={() => handleSavePassword()}
              disabled={!password || !confirm}
            >
              <CheckIcon />
            </RoundIconButton>
          </Stack>
          {validationErrors.length > 0 && (
            <ValidationErrorsList validationErrors={validationErrors} />
          )}
        </Stack>
      ) : (
        <RoundIconButton onClick={() => setEditingPassword(true)}>
          <EditIcon />
        </RoundIconButton>
      )}
    </Stack>
  );
}

import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateField, validateForm } from "@/src/helpers/validators.ts";
import { FormField } from "@/src/types.ts";
import PasswordFields from "@/src/components/common/PasswordFields.tsx";
import ValidationErrorsList from "@/src/components/common/ValidationErrorsList.tsx";

const prepareInitialState = (config: FormField[]) =>
  config.reduce<Record<string, unknown>>((acc, field) => {
    acc[field.key] = field.initialValue;
    return acc;
  }, {});

export default function CommonForm({
  formConfig,
  fillForm,
}: {
  fillForm: (v: Record<string, unknown>, isValid: boolean) => void;
  formConfig: FormField[];
}) {
  const [form, setForm] = useState<Record<string, unknown>>(() =>
    prepareInitialState(formConfig),
  );

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const hasErrors = Object.values(validationErrors).some((e) => e.length);
  const configMap = React.useMemo(
    () => Object.fromEntries(formConfig.map((f) => [f.key, f])),
    [formConfig],
  );

  useEffect(() => {
    fillForm(form, validateForm(form, formConfig));
  }, [form, formConfig]);

  const handleFieldChange = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field: string) => {
    const fieldConfig = configMap[field];

    const errors = validateField(form[field], form, fieldConfig?.rules);

    setValidationErrors((prev) => ({
      ...prev,
      [field]: errors,
    }));
  };

  return (
    <Stack alignItems="flex-start" spacing={2} sx={{ width: "100%" }}>
      <Stack
        sx={{
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
          width: "100%",
        }}
        spacing={2}
      >
        <Stack spacing={2}>
          {formConfig
            .filter(({ visibility }) => visibility)
            .map(({ disabled, key, label, type }) => {
              switch (type) {
                case "text":
                  return (
                    <TextField
                      key={key}
                      label={label}
                      value={form[key] ?? ""}
                      onBlur={() => handleFieldBlur(key)}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      fullWidth
                    />
                  );

                case "password":
                case "confirm":
                  return (
                    <PasswordFields
                      key={key}
                      password={{
                        value: form[key],
                        onBlur: () => handleFieldBlur(key),
                        onChange: (v) => handleFieldChange(key, v),
                      }}
                      disabled={disabled}
                    />
                  );

                default:
                  return null;
              }
            })}
        </Stack>
      </Stack>

      {hasErrors && <ValidationErrorsList formErrors={validationErrors} />}
    </Stack>
  );
}

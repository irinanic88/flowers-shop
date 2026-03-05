import { Stack } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import ValidationErrorsList from '@/src/components/common/ValidationErrorsList';
import FormFieldRenderer from '@/src/components/form/FormFieldRenderer';
import { validateField, validateForm } from '@/src/helpers/validators';
import { FormField } from '@/src/types/types';

const prepareInitialState = (config: FormField[]) =>
  config.reduce<Record<string, unknown>>((acc, field) => {
    acc[field.key] = field.initialValue;
    return acc;
  }, {});

export default function CommonForm({
  formConfig,
  fillForm,
}: {
  fillForm: (form: Record<string, unknown>, isValid: boolean) => void;
  formConfig: FormField[];
}) {
  const [form, setForm] = useState<Record<string, unknown>>(() =>
    prepareInitialState(formConfig),
  );

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const configMap = useMemo(
    () => Object.fromEntries(formConfig.map((f) => [f.key, f])),
    [formConfig],
  );

  useEffect(() => {
    fillForm(form, validateForm(form, formConfig));
  }, [form, formConfig, fillForm]);

  const handleFieldChange = (field: string, value: unknown) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    const fieldConfig = configMap[field];
    const errors = validateField(value, nextForm, fieldConfig?.rules);

    setValidationErrors((prev) => ({
      ...prev,
      [field]: errors,
    }));
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const visibleErrors = Object.entries(validationErrors)
    .filter(([key]) => touched[key])
    .flatMap(([, errors]) => errors);

  const hasErrors = visibleErrors.length > 0;

  return (
    <Stack alignItems="flex-start" spacing={2} sx={{ width: '100%' }}>
      <Stack
        sx={{
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
          width: '100%',
        }}
        spacing={2}
      >
        <Stack spacing={2}>
          {formConfig
            .filter(({ visibility }) => visibility)
            .map((field) => (
              <FormFieldRenderer
                key={field.key}
                field={field}
                value={form[field.key]}
                onChange={(value) => handleFieldChange(field.key, value)}
                onBlur={() => handleFieldBlur(field.key)}
              />
            ))}
        </Stack>
      </Stack>

      {hasErrors && <ValidationErrorsList formErrors={visibleErrors} />}
    </Stack>
  );
}

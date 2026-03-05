import { TextField } from '@mui/material';
import React from 'react';

import ImageUploader from '@/src/components/common/ImageUploader';
import PasswordFields from '@/src/components/common/PasswordFields';
import { FieldProps } from '@/src/types/propsTypes';

export default function FormFieldRenderer({
  field,
  value,
  onChange,
  onBlur,
}: FieldProps) {
  if (field.type === 'text') {
    return (
      <TextField
        label={field.label}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        fullWidth
        required={field.required}
      />
    );
  }

  if (field.type === 'number') {
    return (
      <TextField
        label={field.label}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        type="number"
        fullWidth
        required={field.required}
      />
    );
  }

  if (field.type === 'textarea') {
    return (
      <TextField
        label={field.label}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        fullWidth
        required={field.required}
        multiline
        rows={3}
      />
    );
  }

  if (field.type === 'password') {
    return (
      <PasswordFields
        password={{
          value,
          onChange,
          onBlur,
        }}
        disabled={field.disabled}
        required={field.required}
      />
    );
  }

  if (field.type === 'confirm') {
    return (
      <PasswordFields
        confirm={{
          value,
          onChange,
          onBlur,
        }}
        disabled={field.disabled}
        required={field.required}
      />
    );
  }

  if (field.type === 'images') {
    return (
      <ImageUploader
        initialImages={field.initialValue || []}
        onChange={(urls) => onChange(urls)}
      />
    );
  }

  return null;
}

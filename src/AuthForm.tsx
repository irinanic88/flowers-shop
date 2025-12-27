'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Stack, TextField, Typography, Link } from '@mui/material';
import { AuthFormType } from '@/src/types';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';
import CustomAlert from '@/src/components/CustomAlert';

import {
  isEmailValid,
  isPasswordValid,
  isRequired,
} from '@/src/helpers/validators';
import Loader from '@/src/components/Loader';
import { AppDrawer } from '@/src/components/AppDrawer';
import PasswordFields from '@/src/components/PasswordFields';
import { notEqual } from 'assert';

type AuthFormProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthForm({ open, onClose }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    password: '',
    name: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState<{
    message: string;
    severity?: 'error' | 'success';
  } | null>(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleFieldChange = (field: keyof AuthFormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async ({ email, password, name }: AuthFormType) => {
    if (!isEmailValid(email))
      return setAlert({ message: 'Correo inválido', severity: 'error' });
    if (!isPasswordValid(password))
      return setAlert({
        message: 'Contraseña inválida (≥8 caracteres, letras y números)',
        severity: 'error',
      });
    if (!isSignIn && !isRequired(name))
      return setAlert({
        message: 'El nombre es obligatorio',
        severity: 'error',
      });
    if (!isSignIn && notEqual(password, confirmPassword)) {
      return setAlert({
        message: 'Las contraseñas no coinciden',
        severity: 'error',
      });
    }

    setLoading(true);
    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
            emailRedirectTo: 'http://localhost:3000',
          },
        });

        if (error) throw error;

        setAlert({
          message: 'Revisa tu correo para confirmar el registro',
          severity: 'success',
        });
      }
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';

      setAlert({
        message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title={isSignIn ? 'Iniciar sesión' : 'Registrarse'}
      actions={
        <Stack spacing={1}>
          <PrimaryButton type="submit" onClick={() => handleSubmit(form)}>
            {isSignIn ? 'Iniciar sesión' : 'Registrarse'}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Cerrar</SecondaryButton>
        </Stack>
      }
    >
      <Stack sx={{ height: '100%' }} justifyContent="center">
        {alert && (
          <CustomAlert
            message={alert.message}
            severity={alert.severity}
            onClose={() => setAlert(null)}
          />
        )}

        {loading ? (
          <Loader />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(form);
            }}
            style={{
              width: '100%',
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
                {!isSignIn && (
                  <TextField
                    label="Nombre de usuario"
                    value={form.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    fullWidth
                  />
                )}
                <TextField
                  label="Correo electrónico"
                  value={form.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  fullWidth
                />
                <PasswordFields
                  password={form.password}
                  onChangePassword={(v) => handleFieldChange('password', v)}
                  showConfirm={!isSignIn}
                  confirmPassword={confirmPassword}
                  onChangeConfirmPassword={(v) => setConfirmPassword(v)}
                />
              </Stack>
            </Stack>
          </form>
        )}

        <Stack direction="row" spacing={0.5} mt={1}>
          <Typography variant="body2" color="text.secondary">
            {isSignIn ? 'Aún no estás registrado?' : 'Ya tienes una cuenta?'}
          </Typography>
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => setIsSignIn(!isSignIn)}
            sx={{ cursor: 'pointer' }}
          >
            {isSignIn ? 'Registrarse' : 'Iniciar sesión'}
          </Link>
        </Stack>
      </Stack>
    </AppDrawer>
  );
}

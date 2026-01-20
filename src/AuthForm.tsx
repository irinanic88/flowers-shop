'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Stack, TextField } from '@mui/material';
import { AlertType, AuthFormType } from '@/src/types';
import { PrimaryButton } from '@/src/styledComponents';
import { equals } from 'ramda';
import { AuthTitlesDict } from '@/src/constants';
import { useAlert } from '@/src/context/AlertContext';

import {
  isEmailValid,
  isPasswordValid,
  isRequired,
} from '@/src/helpers/validators';
import { AppDrawer } from '@/src/components/AppDrawer';
import PasswordFields from '@/src/components/PasswordFields';
import RedirectionLink from '@/src/components/auth/RedirectionLink';

type AuthFormProps = {
  open: boolean;
  onClose: () => void;
};

type AuthMode = 'signIn' | 'signUp' | 'forgotPassword';

export default function AuthForm({ open, onClose }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    password: '',
    name: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState<AlertType>(null);
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [title, setTitle] = useState('');

  const { showAlert } = useAlert();

  useEffect(() => {
    setIsSignIn(equals(mode, 'signIn'));
    setIsSignUp(equals(mode, 'signUp'));

    setTitle(AuthTitlesDict[mode].title);
  }, [mode]);

  const handleFieldChange = (field: keyof AuthFormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isEmailValid(form.email))
      return setAlert({ message: 'Correo inválido', severity: 'error' });

    switch (mode) {
      case 'signIn':
        return submitSignIn(form);
      case 'signUp':
        return submitSignUp(form);
      case 'forgotPassword':
        return submitForgotPassword(form.email);
    }
  };

  const submitSignIn = async ({ email, password }: AuthFormType) => {
    if (!isPasswordValid(password))
      return setAlert({
        message: 'Contraseña inválida (≥8 caracteres, letras y números)',
        severity: 'error',
      });

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
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

  const submitSignUp = async ({ email, password, name }: AuthFormType) => {
    if (!isPasswordValid(password))
      return setAlert({
        message: 'Contraseña inválida (≥8 caracteres, letras y números)',
        severity: 'error',
      });
    if (!isRequired(name))
      return setAlert({
        message: 'El nombre es obligatorio',
        severity: 'error',
      });

    if (!equals(password, confirmPassword)) {
      return setAlert({
        message: 'Las contraseñas no coinciden',
        severity: 'error',
      });
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: 'http://localhost:3000',
        },
      });

      if (error) throw error;

      showAlert({
        message: 'Revisa tu correo para confirmar el registro',
        severity: 'success',
      });

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

  const submitForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password',
      });

      if (error) throw error;

      showAlert({
        message:
          'Revisa tu correo. Te enviamos un enlace para cambiar tu contraseña.',
        severity: 'success',
      });

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
      title={title}
      actions={
        <Stack spacing={1}>
          <PrimaryButton type="submit" onClick={handleSubmit}>
            {AuthTitlesDict[mode].submitButton}
          </PrimaryButton>
        </Stack>
      }
      alertState={alert}
      setAlertState={(v) => setAlert(v)}
      loading={loading}
    >
      <Stack sx={{ height: '100%' }} justifyContent="center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
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
              {isSignUp && (
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

              {(isSignIn || isSignUp) && (
                <PasswordFields
                  password={form.password}
                  onChangePassword={(v) => handleFieldChange('password', v)}
                  showConfirm={isSignUp}
                  confirmPassword={confirmPassword}
                  onChangeConfirmPassword={setConfirmPassword}
                />
              )}
            </Stack>
          </Stack>
        </form>

        {isSignIn && (
          <RedirectionLink
            linkText="Olvidaste tu contraseña?"
            linkTitle="Recuperar"
            onLinkClick={() => setMode('forgotPassword')}
          />
        )}

        <RedirectionLink
          linkTitle={AuthTitlesDict[mode].linkTitle}
          linkText={AuthTitlesDict[mode].linkText}
          onLinkClick={() => setMode(isSignIn ? 'signUp' : 'signIn')}
        />
      </Stack>
    </AppDrawer>
  );
}

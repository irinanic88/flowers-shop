'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Stack, TextField, Typography, Link } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { AuthFormType } from '@/src/types';
import { equals } from 'ramda';
import { PrimaryButton, RoundIconButton } from '@/src/styledComponents';
import HomeIcon from '@mui/icons-material/Home';
import CustomAlert from '@/src/components/CustomAlert';
import {
  isEmailValid,
  isPasswordValid,
  isRequired,
} from '@/src/helpers/validators';
import Layout from '@/src/components/Layout';
import Loader from '@/src/components/Loader';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    password: '',
    name: '',
  });
  const [alert, setAlert] = useState<{
    message: string;
    severity?: 'error' | 'success';
  } | null>(null);

  const params = useParams();
  const mode = params.mode;
  const isSignIn = equals(mode, 'signIn');

  const router = useRouter();

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

    setLoading(true);
    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        router.replace('/');
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
    <Layout
      actions={
        <RoundIconButton onClick={() => router.push('/')}>
          <HomeIcon />
        </RoundIconButton>
      }
    >
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
        <Stack
          sx={{
            width: '100%',
            maxWidth: 400,
            py: 3,
            px: { xs: 2, sm: 3 },
            borderRadius: 2,
            mt: 8,
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
            <TextField
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              fullWidth
            />
          </Stack>

          <PrimaryButton onClick={() => handleSubmit(form)}>
            {isSignIn ? 'Iniciar sesión' : 'Registrarse'}
          </PrimaryButton>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {isSignIn ? 'Aún no estás registrado?' : 'Ya tienes una cuenta?'}
            </Typography>
            <Link
              component="button"
              variant="body2"
              underline="hover"
              onClick={() =>
                router.push(isSignIn ? '/auth/signUp' : '/auth/signIn')
              }
              sx={{ cursor: 'pointer' }}
            >
              {isSignIn ? 'Registrarse' : 'Iniciar sesión'}
            </Link>
          </Stack>
        </Stack>
      )}
    </Layout>
  );
}

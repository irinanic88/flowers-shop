'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TextField, Box, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/app/styledComponents';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Revisa tu correo para confirmar el registro.');
    setLoading(false);
  }

  async function signIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else {
      router.replace('/main');
    }
    setLoading(false);
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: { xs: 2, sm: 3 },
        mt: { xs: 10, sm: 15 },
        p: { xs: 2, sm: 3 },
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Iniciar sesión / Registrarse
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <PrimaryButton onClick={signIn} disabled={loading}>
          Iniciar sesión
        </PrimaryButton>
        <Typography mb={2} textAlign="center">
          o
        </Typography>
        <PrimaryButton onClick={signUp} disabled={loading}>
          Registrarse
        </PrimaryButton>
      </Stack>
    </Box>
  );
}

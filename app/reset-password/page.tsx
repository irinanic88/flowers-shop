'use client';

import React, { useState } from 'react';
import { Stack } from '@mui/material';
import PasswordUpdateForm from '@/src/components/auth/PasswordUpdateForm';
import Loader from '@/src/components/Loader';
import { AlertType } from '@/src/types';
import CustomAlert from '@/src/components/CustomAlert';
import { RoundIconButton } from '@/src/styledComponents';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);

  const router = useRouter();

  return (
    <Stack
      sx={{ width: '100%', height: '100vh', position: 'relative' }}
      alignItems="center"
      justifyContent="center"
    >
      <Stack sx={{ position: 'absolute', top: 0, right: 0 }}>
        <Stack px={{ xs: 2, md: 5 }} py={2}>
          <RoundIconButton onClick={() => router.push('/')}>
            <HomeIcon />
          </RoundIconButton>
          {alert && (
            <CustomAlert alertState={alert} onClose={() => setAlert(null)} />
          )}
        </Stack>
      </Stack>
      {loading ? (
        <Loader />
      ) : (
        <Stack>
          <PasswordUpdateForm
            setLoading={(v: boolean) => setLoading(v)}
            setAlert={(v) => setAlert(v)}
            onSubmit={() =>
              setAlert({
                message:
                  'Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión con tu nueva contraseña',
                severity: 'success',
              })
            }
          />
        </Stack>
      )}
    </Stack>
  );
}

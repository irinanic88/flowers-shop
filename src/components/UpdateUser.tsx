'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Stack, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PasswordFields from '@/src/components/PasswordFields';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/src/context/AuthContext';
import { UiAlert } from '@/src/types';
import { AppDrawer } from '@/src/components/AppDrawer';
import {
  RoundIconButton,
  SecondaryButton,
  SecondaryRoundIconButton,
} from '@/src/styledComponents';
import CloseIcon from '@mui/icons-material/Close';

const alertInitialState: UiAlert = {
  open: false,
  message: '',
  severity: 'success',
};

interface UpdateUserProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateUser({ open, onClose }: UpdateUserProps) {
  const { name: userName, user, refreshProfile } = useAuth();

  const [editingName, setEditingName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<UiAlert>(alertInitialState);

  useEffect(() => {
    if (userName) {
      setName(userName);
    }
  }, [userName]);

  const showAlert = (message: string, severity: 'success' | 'error') => {
    setAlertState({
      open: true,
      message,
      severity,
    });
  };

  const handleSaveName = async () => {
    if (!user) return;

    if (!name.trim()) {
      showAlert('El nombre no puede estar vacío.', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({ name })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      showAlert(`Error: ${error.message}`, 'error');
    } else {
      await refreshProfile();

      setEditingName(false);
      showAlert('Nombre actualizado correctamente.', 'success');
    }
  };

  const handleSavePassword = async () => {
    if (!password || !confirm) {
      showAlert('Completa todos los campos.', 'error');
      return;
    }

    if (password !== confirm) {
      showAlert('Las contraseñas no coinciden.', 'error');
      return;
    }

    if (password.length < 6) {
      showAlert('La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      showAlert(`Error: ${error.message}`, 'error');
    } else {
      setEditingPassword(false);
      setPassword('');
      setConfirm('');
      showAlert('Contraseña actualizada correctamente.', 'success');
    }
  };

  return (
    <>
      <AppDrawer
        open={open}
        onClose={onClose}
        title="Configuración de usuario"
        actions={<SecondaryButton onClick={onClose}>Cerrar</SecondaryButton>}
      >
        <Stack
          spacing={4}
          sx={{
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Stack spacing={1} pt={1}>
            <Stack
              direction={editingName ? 'column' : 'row'}
              spacing={1}
              alignItems={editingName ? 'flex-start' : 'center'}
              sx={{ width: '100%' }}
            >
              <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editingName}
                fullWidth
              />

              {editingName ? (
                <Stack direction="row" spacing={1}>
                  <SecondaryRoundIconButton
                    onClick={() => {
                      setEditingName(false);
                      setName('');
                    }}
                    disabled={loading}
                  >
                    <CloseIcon />
                  </SecondaryRoundIconButton>
                  <RoundIconButton
                    onClick={() => handleSaveName()}
                    disabled={loading}
                  >
                    <CheckIcon />
                  </RoundIconButton>
                </Stack>
              ) : (
                <RoundIconButton
                  onClick={() => setEditingName(true)}
                  disabled={loading}
                >
                  <EditIcon />
                </RoundIconButton>
              )}
            </Stack>
          </Stack>

          <Stack
            direction={editingPassword ? 'column' : 'row'}
            spacing={1}
            alignItems={editingPassword ? 'flex-start' : 'center'}
          >
            <PasswordFields
              password={password}
              confirmPassword={confirm}
              showConfirm={editingPassword}
              onChangePassword={setPassword}
              onChangeConfirmPassword={setConfirm}
              disabled={!editingPassword}
            />

            {editingPassword ? (
              <Stack direction="row" spacing={1}>
                <SecondaryRoundIconButton
                  onClick={() => {
                    setEditingPassword(false);
                    setPassword('');
                    setConfirm('');
                  }}
                  disabled={loading}
                >
                  <CloseIcon />
                </SecondaryRoundIconButton>
                <RoundIconButton
                  onClick={() => handleSavePassword()}
                  disabled={loading}
                >
                  <CheckIcon />
                </RoundIconButton>
              </Stack>
            ) : (
              <RoundIconButton
                onClick={() => setEditingPassword(true)}
                disabled={loading}
              >
                <EditIcon />
              </RoundIconButton>
            )}
          </Stack>
        </Stack>
      </AppDrawer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={4000}
        onClose={() => setAlertState(alertInitialState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertState(alertInitialState)}
          severity={alertState.severity}
          sx={{ width: '100%' }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}

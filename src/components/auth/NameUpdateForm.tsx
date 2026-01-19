import { Stack, TextField } from '@mui/material';
import { RoundIconButton } from '@/src/styledComponents';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { AlertType } from '@/src/types';

type NameUpdateFormProps = {
  setLoading: (v: boolean) => void;
  setAlert: (v: AlertType) => void;
};

export default function NameUpdateForm({
  setLoading,
  setAlert,
}: NameUpdateFormProps) {
  const { name: userName, user, refreshProfile } = useAuth();

  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (userName) {
      setName(userName);
    }
  }, [userName]);
  const handleSaveName = async () => {
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({ name })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      setAlert({
        message: `Error: ${error.message}`,
        severity: 'error',
      });
    } else {
      await refreshProfile();

      setEditingName(false);
      setAlert({
        message: 'Nombre actualizado correctamente',
        severity: 'success',
      });
    }
  };
  return (
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
            <RoundIconButton
              onClick={() => {
                setEditingName(false);
                setName('');
              }}
            >
              <CloseIcon />
            </RoundIconButton>
            <RoundIconButton
              onClick={() => handleSaveName()}
              disabled={!name.trim()}
            >
              <CheckIcon />
            </RoundIconButton>
          </Stack>
        ) : (
          <RoundIconButton onClick={() => setEditingName(true)}>
            <EditIcon />
          </RoundIconButton>
        )}
      </Stack>
    </Stack>
  );
}

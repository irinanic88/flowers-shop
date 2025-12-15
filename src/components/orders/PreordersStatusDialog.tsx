'use client';

import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';

interface Props {
  open: boolean;
  comment: string;
  onChangeComment: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
  submitButton: 'Aprobar' | 'Cancelar';
}

export function PreordersStatusDialog({
  open,
  comment,
  onChangeComment,
  onClose,
  onSave,
  submitButton,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>Comentario del administrador:</Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          value={comment}
          onChange={(e) => onChangeComment(e.target.value)}
        />

        <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
          <SecondaryButton onClick={onClose}>Cerrar</SecondaryButton>
          <PrimaryButton onClick={onSave}>{submitButton}</PrimaryButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

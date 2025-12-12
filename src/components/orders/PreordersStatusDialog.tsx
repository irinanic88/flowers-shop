"use client";

import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { PrimaryButton, SecondaryButton } from "@/src/styledComponents";

interface Props {
  open: boolean;
  comment: string;
  onChangeComment: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export function PreordersStatusDialog({
  open,
  comment,
  onChangeComment,
  onClose,
  onSave,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>Comentario del administrador</Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          value={comment}
          onChange={(e) => onChangeComment(e.target.value)}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
          <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
          <PrimaryButton onClick={onSave}>Guardar</PrimaryButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

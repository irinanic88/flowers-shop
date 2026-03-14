"use client";

import { Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { PrimaryButton, SecondaryButton } from "@/src/styledComponents";
import { DeleteProductDialogProps } from "@/src/types/propsTypes";

export default function DeleteProductDialog({
  product,
  open,
  onClose,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>
          Eliminar articulo {product?.title}?
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
          <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>

          <PrimaryButton onClick={onConfirm}>Eliminar</PrimaryButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Dialog, DialogContent, Stack, Typography } from '@mui/material';

import { useAlert } from '@/src/context/AlertContext';
import { useDeleteProduct } from '@/src/hooks/api';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';
import { DeleteProductDialogProps } from '@/src/types/propsTypes';
import { ProductType } from '@/src/types/types';

export default function DeleteProductDialog({
  product,
  open,
  onClose,
}: DeleteProductDialogProps) {
  const { showAlert } = useAlert();
  const { deleteProduct } = useDeleteProduct();

  const handleDelete = async (selectedProduct: ProductType) => {
    const { error, success } = await deleteProduct(selectedProduct);

    if (error) return showAlert(error);
    if (success) {
      showAlert(success);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>
          Eliminar articulo {product.title}?
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
          <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>

          <PrimaryButton onClick={() => handleDelete(product as ProductType)}>
            Eliminar
          </PrimaryButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

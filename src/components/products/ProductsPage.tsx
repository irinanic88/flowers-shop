'use client';

import {
  Stack,
  Typography,
  Snackbar,
  Alert,
  DialogContent,
  Dialog,
  Box,
} from '@mui/material';
import ProductCard from '@/src/components/products/ProductCard';
import { useAuth } from '@/src/context/AuthContext';
import { useProducts } from '@/src/context/ProductsContext';
import React, { useCallback, useMemo, useState } from 'react';
import type { DisponibilityType, ProductType, UiAlert } from '@/src/types';
import { supabase } from '@/lib/supabase';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';
import { equals, isNotEmpty } from 'ramda';
import { ProductsFilters } from '@/src/components/products/ProductsFilters';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<
    DisponibilityType | 'all'
  >('all');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [alert, setAlert] = useState<UiAlert>({
    open: false,
    message: '',
    severity: 'success',
  });

  const { products, loading } = useProducts();
  const { isUnknownUser, isAdmin } = useAuth();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const availabilityOk =
        equals(availabilityFilter, 'all') ||
        (equals(availabilityFilter, 'available') && product.available > 0) ||
        (equals(availabilityFilter, 'outOfStock') &&
          equals(product.available, 0));

      const userAccessOk = isAdmin || product.available > 0;

      return availabilityOk && userAccessOk;
    });
  }, [products, availabilityFilter, isAdmin]);

  const notify = useCallback(
    (message: string, severity: UiAlert['severity']) => {
      setAlert({ open: true, message, severity });
    },
    [],
  );

  const handleDeleteProduct = async (p: ProductType) => {
    if (!p) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', p.id);

      if (error) {
        notify(`No se pudo eliminar el producto: ${error.message}`, 'error');
        return;
      }

      if (p.images?.length) {
        const filePaths = p.images
          .map((url) => url.split('product-images/')[1])
          .filter(Boolean);

        if (filePaths.length) {
          await supabase.storage.from('product-images').remove(filePaths);
        }
      }

      setOpenDeleteDialog(false);

      notify(`Producto ${p.title} eliminado.`, 'success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      notify(message, 'error');
    }
  };

  if (loading) {
    return (
      <Stack mt={20} alignItems="center">
        <Typography color="text.secondary">Cargando productos…</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        {isUnknownUser && (
          <Typography
            sx={{ textAlign: 'center', my: 4 }}
            variant="h4"
            color="text.primary"
          >
            Disponible para preordenar
          </Typography>
        )}

        {isAdmin && (
          <ProductsFilters
            availabilityFilter={availabilityFilter}
            onAvailabilityChange={(v: DisponibilityType | 'all') =>
              setAvailabilityFilter(v)
            }
          />
        )}

        {isNotEmpty(filteredProducts) ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 1400,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fill, minmax(300px, 350px))',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNotify={(m, s) => notify(m, s)}
                    onDelete={(p: ProductType) => setSelectedProduct(p)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', height: 200 }}
          >
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              No hay productos disponibles por el momento.
            </Typography>
          </Stack>
        )}
      </Stack>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert((p) => ({ ...p, open: false }))}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      {openDeleteDialog && (
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          fullWidth
        >
          <DialogContent>
            <Typography sx={{ mb: 1 }}>
              Eliminar producto {selectedProduct?.title}?
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
              <SecondaryButton onClick={() => setOpenDeleteDialog(false)}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton
                onClick={() =>
                  handleDeleteProduct(selectedProduct as ProductType)
                }
              >
                Eliminar
              </PrimaryButton>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

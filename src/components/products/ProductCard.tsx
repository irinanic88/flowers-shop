'use client';

import React, { useState } from 'react';
import { Typography, Box, Stack, Chip } from '@mui/material';
import { ProductType } from '@/src/types';
import ProductInfo from '@/src/components/products/ProductInfo';
import IncrementDecrementButtons from '@/src/components/products/IncrementDecrementButtons';
import { supabase } from '@/lib/supabase';
import { PanelCard, RoundIconButton } from '@/src/styledComponents';
import { useCart } from '@/src/context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useOrders } from '@/src/context/OrdersContext';
import { useAuth } from '@/src/context/AuthContext';
import AdminProductForm from '@/src/components/AdminProductForm';
import ProductImages from '@/src/components/products/ProductImages';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isAdmin, isUser, isUnknownUser } = useAuth();
  const { items, updateItemQuantity } = useCart();

  const itemInCart = items.find((i) => i.id === product.id);
  const quantity = itemInCart?.quantity ?? 0;

  const { orders } = useOrders();

  const totalOrdered = orders.reduce((sum, order) => {
    if (!order.items) return sum;
    const item = order.items.find((i) => i.product_id === product.id);
    return sum + (item?.quantity ?? 0);
  }, 0);

  const handleDeleteProduct = async () => {
    if (!confirm('Eliminar este producto?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) {
        console.error('Error deleting product:', error.message);
        alert('No se pudo eliminar el producto.');
        return;
      }

      if (product.images && product.images.length > 0) {
        const filePaths = product.images.map((url) => {
          const parts = url.split('product-images/');
          return parts[1];
        });

        await supabase.storage.from('product-images').remove(filePaths);
      }

      alert('Producto eliminado.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PanelCard>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 150,
            height: 150,
            flexShrink: 0,
          }}
        >
          <ProductImages images={product.images ?? []} title={product.title} />
        </Box>

        <Stack spacing={1} flex={1}>
          <ProductInfo product={product} showPrice={!isUnknownUser} />

          {!isUnknownUser && (
            <Chip
              size="small"
              color="primary"
              label={`Disponible: ${product.available} u.`}
              sx={{ width: 'fit-content' }}
              variant="outlined"
            />
          )}

          {isUser && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">Preordenar:</Typography>
              <IncrementDecrementButtons
                quantity={quantity}
                onChange={(q) =>
                  updateItemQuantity(
                    {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                    },
                    q,
                  )
                }
              />
            </Stack>
          )}

          {isAdmin && (
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Total preordenado: {totalOrdered ?? 0}
              </Typography>

              <Stack direction="row" spacing={1}>
                <RoundIconButton
                  onClick={() => setOpenUpdate(true)}
                  color="error"
                >
                  <EditIcon fontSize="small" />
                </RoundIconButton>
                <RoundIconButton onClick={handleDeleteProduct} color="error">
                  <DeleteIcon fontSize="small" />
                </RoundIconButton>
              </Stack>
            </Stack>
          )}
        </Stack>

        {openUpdate && (
          <AdminProductForm
            open={openUpdate}
            onClose={() => setOpenUpdate(false)}
            product={product}
          />
        )}
      </Stack>
    </PanelCard>
  );
}

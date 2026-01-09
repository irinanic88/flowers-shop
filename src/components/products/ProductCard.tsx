'use client';

import React, { useState } from 'react';
import { Typography, Box, Stack, Divider } from '@mui/material';
import { ProductType } from '@/src/types';
import ProductInfo from '@/src/components/products/ProductInfo';
import IncrementDecrementButtons from '@/src/components/products/IncrementDecrementButtons';
import { PanelCard } from '@/src/styledComponents';
import { useCart } from '@/src/context/CartContext';
import { CardEditButton, CardDeleteButton } from '@/src/styledComponents';
import { useAuth } from '@/src/context/AuthContext';
import AdminProductForm from '@/src/components/AdminProductForm';
import ProductImages from '@/src/components/products/ProductImages';
import type { UiAlert } from '@/src/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductCardProps {
  product: ProductType;
  onNotify: (message: string, severity: UiAlert['severity']) => void;
  onDelete: (p: ProductType) => void;
}

export default function ProductCard({
  product,
  onNotify,
  onDelete,
}: ProductCardProps) {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isAdmin, isUser, isUnknownUser } = useAuth();
  const { items, updateItemQuantity } = useCart();

  const itemInCart = items.find((i) => i.id === product.id);
  const quantity = itemInCart?.quantity ?? 0;

  return (
    <PanelCard
      sx={{
        minWidth: 300,
        maxWidth: 350,
      }}
    >
      <Stack sx={{ height: '100%', p: 0.5 }} justifyContent="space-between">
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography
              sx={{
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              {product.title}
            </Typography>
            {!isUnknownUser && (
              <Typography
                variant="body2"
                color={product.available > 0 ? 'primary' : 'error'}
              >
                En Stock: {product.available}
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 96,
                height: 96,
                border: '1px solid',
                borderRadius: 1,
                borderColor: (theme) => theme.palette.grey[200],
                bgcolor: (theme) => theme.palette.grey[200],
                overflow: 'hidden',
              }}
            >
              <ProductImages
                images={product.images ?? []}
                title={product.title}
              />
            </Box>

            <ProductInfo product={product} showPrice={!isUnknownUser} />
          </Stack>

          <Stack spacing={1}>
            {product.comment && (
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Detalles:
                </Typography>
                <Typography variant="body2">{product.comment}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>

        <Stack>
          {isAdmin && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <CardEditButton
                onClick={() => setOpenUpdate(true)}
                startIcon={<EditIcon fontSize="small" />}
              >
                Editar
              </CardEditButton>

              <Divider
                sx={(theme) => ({
                  borderColor: theme.palette.divider,
                })}
                orientation="vertical"
                flexItem
              />

              <CardDeleteButton
                onClick={() => onDelete(product)}
                startIcon={<DeleteIcon fontSize="small" />}
              >
                Eliminar
              </CardDeleteButton>
            </Stack>
          )}
          {isUser && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography variant="body2">Preordenar:</Typography>
              <IncrementDecrementButtons
                inStock={product.available}
                quantity={quantity}
                onChange={(q) =>
                  updateItemQuantity(
                    {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      available: product.available,
                    },
                    q,
                  )
                }
              />
            </Stack>
          )}
        </Stack>
      </Stack>

      {openUpdate && (
        <AdminProductForm
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onNotify={onNotify}
          product={product}
        />
      )}
    </PanelCard>
  );
}

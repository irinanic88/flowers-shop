'use client';
import { Typography, Stack, Box } from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import { ProductType } from '@/src/types';
import HeightIcon from '@mui/icons-material/Height';
import React from 'react';

interface ProductInfoProps {
  product: ProductType;
  showPrice: boolean;
}

export default function ProductInfo({
  product,
  showPrice = false,
}: ProductInfoProps) {
  return (
    <Box>
      <Stack>
        {showPrice && (
          <Typography
            sx={{ pl: 0.5, fontWeight: 600, fontSize: 20 }}
            color="primary"
          >
            {product.price} €
          </Typography>
        )}

        <Stack spacing={1} alignItems="flex-start" sx={{ mt: 0.5 }}>
          <Stack direction="row" spacing={0.5}>
            <HeightIcon fontSize="small" />
            <Typography variant="body2">
              Altura: {product.height ? `${product.height} cm` : '--'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <GrassIcon fontSize="small" />
            <Stack>
              <Typography variant="body2">
                Plantas por caja: {product.pots_count}
              </Typography>{' '}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

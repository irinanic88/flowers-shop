'use client';
import { useState } from 'react';
import {
  CardContent,
  Typography,
  Stack,
  Button,
  Collapse,
  Chip,
} from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Product } from '@/app/types';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <CardContent sx={{ flexGrow: 1, px: 0, py: 1 }}>
      {/* Название + цена */}
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography variant="h6">{product.title}</Typography>
        <Chip
          label={`€ ${product.price}`}
          color="primary"
          sx={{ fontWeight: 'bold' }}
          variant="outlined"
        />
      </Stack>

      {/* Цветки и горшки */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
        <Stack direction="row" spacing={0.5}>
          <GrassIcon fontSize="small" />
          <Typography variant="body2">Macetas: {product.pots_count}</Typography>
        </Stack>
      </Stack>

      {/* Collapsible комментарий */}
      {product.comment && (
        <>
          <Button
            size="small"
            onClick={() => setOpenComment(!openComment)}
            endIcon={<ArrowDropDownIcon />}
            sx={{ mt: 1 }}
          >
            {openComment ? 'Ocultar comentario' : 'Ver comentario'}
          </Button>
          <Collapse in={openComment}>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
              {product.comment}
            </Typography>
          </Collapse>
        </>
      )}
    </CardContent>
  );
}

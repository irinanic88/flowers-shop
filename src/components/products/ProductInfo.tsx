'use client';
import { CardContent, Typography, Stack } from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import { ProductType } from '@/src/types';
import HeightIcon from '@mui/icons-material/Height';
import CommentBox from '@/src/components/CommentBox';

interface ProductInfoProps {
  product: ProductType;
  showPrice: boolean;
}

export default function ProductInfo({
  product,
  showPrice = false,
}: ProductInfoProps) {
  return (
    <CardContent sx={{ flexGrow: 1, p: 0 }}>
      <Stack>
        <Typography variant="h6" sx={{ lineHeight: 1.3, pb: 0.5 }}>
          {product.title}
        </Typography>

        {showPrice && (
          <Typography sx={{ pl: 0.5 }} color="primary" variant="h6">
            {product.price} €
          </Typography>
        )}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
          <Stack direction="row" spacing={0.5}>
            <HeightIcon fontSize="small" />
            <Stack>
              <Typography variant="body2">Altura:</Typography>
              <Typography variant="body2">
                {product.height ? `${product.height} cm` : '--'}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <GrassIcon fontSize="small" />
            <Stack>
              <Typography variant="body2">Macetas:</Typography>{' '}
              <Typography variant="body2">{product.pots_count} m/u</Typography>
            </Stack>
          </Stack>
        </Stack>

        {product.comment && (
          <CommentBox title="Detalles" comment={product.comment} />
        )}
      </Stack>
    </CardContent>
  );
}

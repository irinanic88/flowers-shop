import { Stack, Typography, TextField, Box } from '@mui/material';
import React from 'react';

import { Row } from '@/src/styledComponents';
import { CartItemSummaryProps } from '@/src/types/propsTypes';

export function CartItemSummary({
  total,
  comment,
  setComment,
}: CartItemSummaryProps) {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <TextField
        label="Comentario (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />

      <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
        <Row sx={{ mb: 1 }}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1">€ {total.toFixed(2)}</Typography>
        </Row>
      </Box>
    </Stack>
  );
}

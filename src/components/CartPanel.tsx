'use client';

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Alert,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '@/src/context/CartContext';
import { PrimaryButton, Row, PanelCard } from '@/src/styledComponents';
import IncrementDecrementButtons from '@/src/components/products/IncrementDecrementButtons';
import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { useOrders } from '@/src/context/OrdersContext';

export interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function CartPanel({ open, onClose }: CartPanelProps) {
  const { items, total, updateItemQuantity, clearCart } = useCart();

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const { refreshOrders } = useOrders();

  const handleSubmitPreorder = async () => {
    if (!items.length) return;

    setLoading(true);
    setSuccess(false);
    setError('');

    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
      setError('Usuario no autenticado.');
      setLoading(false);
      return;
    }

    const orderItems = items.map((i) => ({
      product_id: i.id,
      title: i.title,
      price: i.price,
      quantity: i.quantity,
    }));

    const { error: err } = await supabase.from('orders').insert([
      {
        user_id: userId,
        items: orderItems,
        total: Number(total.toFixed(2)),
        comment: comment || null,
        status: 'pending',
      },
    ]);

    if (err) {
      console.error(err);
      setError('Error al enviar el preorden.');
      setLoading(false);
      return;
    } else {
      void refreshOrders();
    }

    clearCart();
    setComment('');
    setSuccess(true);
    setLoading(false);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '100%',
          backgroundColor: 'secondary',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography variant="h6">Preorden</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack justifyContent="space-between" sx={{ height: '100%' }}>
        <Box>
          {!items.length && (
            <Stack mt={20} alignItems="center">
              <Typography color="text.secondary">
                No hay productos en tu preorden.
              </Typography>
            </Stack>
          )}

          {items.length > 0 && (
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              <Stack spacing={2}>
                {items.map((item) => (
                  <PanelCard key={item.id}>
                    <Row>
                      <Typography>{item.title}</Typography>
                      <Typography color="primary" sx={{ minWidth: 75 }}>
                        € {(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Row>

                    <Box mt={1}>
                      <IncrementDecrementButtons
                        quantity={item.quantity}
                        onChange={(q) =>
                          updateItemQuantity(
                            {
                              id: item.id,
                              title: item.title,
                              price: item.price,
                            },
                            q,
                          )
                        }
                      />
                    </Box>
                  </PanelCard>
                ))}
              </Stack>

              <TextField
                label="Comentario (opcional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{ mt: 2 }}
              />
            </Box>
          )}

          {items.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
              {success && (
                <Alert severity="success">
                  Preorden enviado correctamente!
                </Alert>
              )}
              {error && <Alert severity="error">{error}</Alert>}

              <Row sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1">
                  € {total.toFixed(2)}
                </Typography>
              </Row>
            </Box>
          )}
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          sx={{ p: 2 }}
        >
          <PrimaryButton
            sx={{ width: { xs: '100%', sm: 200 } }}
            onClick={handleSubmitPreorder}
          >
            {loading ? 'Enviando...' : 'Enviar preorden'}
          </PrimaryButton>

          <PrimaryButton
            variant="outlined"
            sx={{ width: { xs: '100%', sm: 200 } }}
            onClick={clearCart}
          >
            Vaciar
          </PrimaryButton>
        </Stack>
      </Stack>
    </Drawer>
  );
}

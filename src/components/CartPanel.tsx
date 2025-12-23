"use client";

import { Box, Typography, Stack, Alert, TextField } from "@mui/material";
import { useCart } from "@/src/context/CartContext";
import {
  PrimaryButton,
  Row,
  PanelCard,
  SecondaryButton,
} from "@/src/styledComponents";
import IncrementDecrementButtons from "@/src/components/products/IncrementDecrementButtons";
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { useOrders } from "@/src/context/OrdersContext";
import { AppDrawer } from "@/src/components/AppDrawer.tsx";

export interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function CartPanel({ open, onClose }: CartPanelProps) {
  const { items, total, updateItemQuantity, clearCart } = useCart();

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const { refreshOrders } = useOrders();

  const handleSubmitPreorder = async () => {
    if (!items.length) return;

    setLoading(true);
    setSuccess(false);
    setError("");

    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
      setError("Usuario no autenticado.");
      setLoading(false);
      return;
    }

    const orderItems = items.map((i) => ({
      product_id: i.id,
      title: i.title,
      price: i.price,
      quantity: i.quantity,
    }));

    const { error: err } = await supabase.from("orders").insert([
      {
        user_id: userId,
        items: orderItems,
        total: Number(total.toFixed(2)),
        comment: comment || null,
        status: "pending",
      },
    ]);

    if (err) {
      console.error(err);
      setError("Error al enviar el preorden.");
      setLoading(false);
      return;
    } else {
      void refreshOrders();
    }

    clearCart();
    setComment("");
    setSuccess(true);
    setLoading(false);
    onClose();
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Preorden"
      actions={
        <Stack spacing={1}>
          <PrimaryButton onClick={handleSubmitPreorder}>
            Enviar Preorden
          </PrimaryButton>

          <SecondaryButton onClick={clearCart}>Vaciar</SecondaryButton>
        </Stack>
      }
    >
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        {!items.length && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Typography color="text.secondary">
              No hay productos en tu preorden.
            </Typography>
          </Stack>
        )}

        {items.length > 0 && (
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Stack spacing={1}>
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
          </Box>
        )}

        {items.length > 0 && (
          <Stack spacing={2}>
            <TextField
              label="Comentario (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={2}
              sx={{ mt: 2 }}
            />
            <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
              {/*    {success && (*/}
              {/*      <Alert severity="success">Preorden enviado correctamente!</Alert>*/}
              {/*    )}*/}
              {/*    {error && <Alert severity="error">{error}</Alert>}*/}
              <Row sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1">
                  € {total.toFixed(2)}
                </Typography>
              </Row>
            </Box>
          </Stack>
        )}
      </Stack>
    </AppDrawer>
  );
}

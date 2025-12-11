"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import { useOrders } from "@/src/context/OrdersContext";
import {
  PrimaryButton,
  SecondaryButton,
  ErrorButton,
  PanelCard,
  Row,
} from "@/src/styledComponents";
import { OrderType, OrderItem } from "@/src/types";
import { supabase } from "@/lib/supabase";
import Loader from "@/src/components/Loader";
import { equals } from "ramda";

export default function PreordersTab() {
  const { orders, loading, refreshOrders } = useOrders();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "approved" | "cancelled" | null
  >(null);

  const openStatusDialog = (id: string, status: "approved" | "cancelled") => {
    setSelectedOrderId(id);
    setSelectedStatus(status);
    setAdminComment("");
    setDialogOpen(true);
  };

  const applyStatus = async () => {
    if (!selectedOrderId || !selectedStatus) return;

    await supabase
      .from("orders")
      .update({
        status: selectedStatus,
        admin_comment: adminComment || null,
      })
      .eq("id", selectedOrderId);

    setDialogOpen(false);
    refreshOrders();
  };

  const statusColor = (status: OrderType["status"]) => {
    switch (status) {
      case "approved":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "warning";
    }
  };

  if (loading) return <Loader />;
  if (orders.length === 0)
    return (
      <Stack mt={20} alignItems="center" justifyContent="center">
        <Typography color="text.secondary">No hay preordenes aún.</Typography>
      </Stack>
    );

  return (
    <>
      <Stack spacing={2}>
        {orders.map((order: OrderType) => (
          <PanelCard key={order.id}>
            <Stack spacing={1}>
              <Row>
                <Typography variant="h6">{order.profiles?.name}</Typography>
                <Chip
                  label={order.status}
                  color={statusColor(order.status)}
                  variant="outlined"
                />
              </Row>

              <Typography variant="body2" color="text.secondary">
                {new Date(order.created_at).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Stack spacing={1}>
                {order.items?.map((item: OrderItem, i: number) => (
                  <Row key={i}>
                    <Typography>
                      {item.title} × {item.quantity}
                    </Typography>
                    <Typography>
                      € {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Row>
                ))}
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Row>
                <Typography fontWeight="bold">Total:</Typography>
                <Typography fontWeight="bold">
                  € {order.total.toFixed(2)}
                </Typography>
              </Row>

              {order.comment && (
                <Box
                  sx={{
                    mt: 1,
                    p: 1.5,
                    borderRadius: 2,
                    background: "#fafafa",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Comentario del cliente:
                  </Typography>
                  <Typography variant="body2">{order.comment}</Typography>
                </Box>
              )}

              {order.admin_comment && (
                <Box
                  sx={{
                    mt: 1,
                    p: 1.5,
                    borderRadius: 2,
                    background: (theme) => theme.palette.secondary.main,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Nota del vendedor:
                  </Typography>
                  <Typography variant="body2">{order.admin_comment}</Typography>
                </Box>
              )}

              <Stack direction="row" spacing={1} mt={2}>
                <PrimaryButton
                  disabled={equals(selectedStatus, "approved")}
                  fullWidth
                  variant="outlined"
                  onClick={() => openStatusDialog(order.id, "approved")}
                >
                  Aprobar
                </PrimaryButton>

                <ErrorButton
                  fullWidth
                  onClick={() => openStatusDialog(order.id, "cancelled")}
                >
                  Cancelar
                </ErrorButton>
              </Stack>
            </Stack>
          </PanelCard>
        ))}
      </Stack>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogContent>
          <Typography sx={{ mb: 1 }}>Comentario del administrador:</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
            placeholder="Escribe un comentario..."
          />
        </DialogContent>

        <Stack direction="row" px={3} pb={3} justifyContent="flex-end">
          <SecondaryButton onClick={() => setDialogOpen(false)}>
            Cancelar
          </SecondaryButton>

          <PrimaryButton onClick={applyStatus}>Guardar</PrimaryButton>
        </Stack>
      </Dialog>
    </>
  );
}

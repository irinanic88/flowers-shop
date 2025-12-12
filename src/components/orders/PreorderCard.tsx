"use client";

import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Chip,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import {
  PanelCard,
  Row,
  PrimaryButton,
  SecondaryButton,
} from "@/src/styledComponents";
import { OrderItem, OrderType, OrderStatusType } from "@/src/types";
import { orderStatusesDict, statusColorsDict } from "@/src/constants";
import { supabase } from "@/lib/supabase";
import CommentBox from "@/src/components/CommentBox";
import { equals } from "ramda";
import { useAuth } from "@/src/context/AuthContext";

interface PreorderCardProps {
  order: OrderType;
  refreshOrders: () => void;
}

export default function PreorderCard({
  order,
  refreshOrders,
}: PreorderCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const [nextStatus, setNextStatus] = useState<OrderStatusType | null>(null);

  const { isAdmin } = useAuth();

  const isPending = equals(order.status, "pending");

  const openDialog = (status: OrderStatusType) => {
    setNextStatus(status);
    setAdminComment("");
    setDialogOpen(true);
  };

  const applyStatus = async () => {
    if (!nextStatus) return;

    await supabase
      .from("orders")
      .update({
        status: nextStatus,
        admin_comment: adminComment || null,
      })
      .eq("id", order.id);

    setDialogOpen(false);
    refreshOrders();
  };

  return (
    <PanelCard
      sx={{
        width: "100%",
        mx: "auto",
      }}
    >
      <Stack spacing={1}>
        <Stack>
          {isAdmin && (
            <Typography variant="h6">{order.profiles?.name}</Typography>
          )}
          <Chip
            label={orderStatusesDict[order.status]}
            color={statusColorsDict[order.status]}
            variant="outlined"
            sx={{ width: 120, alignSelf: "flex-end" }}
          />
        </Stack>

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
          <Typography fontWeight="bold">€ {order.total.toFixed(2)}</Typography>
        </Row>

        {order.comment && (
          <CommentBox
            title="Comentario del cliente"
            comment={order.comment}
            color="#fafafa"
          />
        )}

        {order.admin_comment && (
          <CommentBox
            title="Commentario del vendedor"
            comment={order.admin_comment}
          />
        )}

        {isAdmin && (
          <Stack
            direction="row"
            spacing={1}
            mt={2}
            justifyContent="space-between"
          >
            <PrimaryButton
              fullWidth
              variant="outlined"
              onClick={() => openDialog("approved")}
              disabled={!isPending}
            >
              Aprobar
            </PrimaryButton>

            <SecondaryButton
              fullWidth
              onClick={() => openDialog("cancelled")}
              disabled={!isPending}
            >
              Cancelar
            </SecondaryButton>
          </Stack>
        )}
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
    </PanelCard>
  );
}

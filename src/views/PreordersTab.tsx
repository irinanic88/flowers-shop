"use client";

import Loader from "@/src/components/Loader";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TableSortLabel,
  Stack,
  TablePagination,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAuth } from "@/src/context/AuthContext";
import { OrderType, OrderStatusType } from "@/src/types";
import { useMemo, useState } from "react";
import { orderStatusesDict, statusColorsDict } from "@/src/constants";
import { supabase } from "@/lib/supabase";
import { useOrders } from "@/src/context/OrdersContext";
import {
  PrimaryButton,
  RoundIconButton,
  SecondaryRoundIconButton,
} from "@/src/styledComponents";
import DownloadIcon from "@mui/icons-material/Download";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { equals } from "ramda";
import { PreordersStatusDialog } from "@/src/components/orders/PreordersStatusDialog";
import { PreordersFilters } from "@/src/components/orders/PreordersFilters";
import { PreordersTableContent } from "@/src/components/orders/PreordersTableContent";
import { exportOrdersToExcel } from "@/src/helpers/exportToExcel";

export default function PreordersTab() {
  const [statusFilter, setStatusFilter] = useState<OrderStatusType | "all">(
    "all",
  );
  const [userFilter, setUserFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "status" | "user">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [nextStatus, setNextStatus] = useState<OrderStatusType | null>(null);

  const { orders, loading, refreshOrders } = useOrders();
  const { isAdmin } = useAuth();

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const openStatusDialog = (order: OrderType, status: OrderStatusType) => {
    setSelectedOrder(order);
    setNextStatus(status);
    setAdminComment("");
    setDialogOpen(true);
  };

  const applyStatus = async () => {
    if (!selectedOrder || !nextStatus) return;

    try {
      if (equals(nextStatus, "approved")) {
        const { error } = await supabase.rpc("approve_order", {
          p_order_id: selectedOrder.id,
        });

        if (error) throw error;
      } else {
        await supabase
          .from("orders")
          .update({
            status: "cancelled",
            admin_comment: adminComment || null,
          })
          .eq("id", selectedOrder.id);
      }

      setDialogOpen(false);
      refreshOrders();
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const statusOk =
        equals(statusFilter, "all") || equals(order.status, statusFilter);

      const userOk =
        !isAdmin ||
        equals(userFilter, "all") ||
        equals(order.profile_name, userFilter);

      return statusOk && userOk;
    });
  }, [orders, statusFilter, userFilter, isAdmin]);

  const users = useMemo(
    () =>
      Array.from(
        new Set(
          orders
            .map((o) => o.profile_name)
            .filter((u): u is string => Boolean(u)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [orders],
  );

  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];

    sorted.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return equals(sortDir, "asc")
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime();
        case "status":
          return equals(sortDir, "asc")
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        case "user":
          return equals(sortDir, "asc")
            ? (a.profile_name || "").localeCompare(b.profile_name || "")
            : (b.profile_name || "").localeCompare(a.profile_name || "");
        default:
          return 0;
      }
    });

    return sorted;
  }, [filteredOrders, sortBy, sortDir]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  if (loading) return <Loader />;

  if (!orders.length)
    return (
      <Stack mt={20} alignItems="center" justifyContent="center">
        <Typography color="text.secondary">No hay preordenes aún.</Typography>
      </Stack>
    );

  return (
    <>
      {isAdmin && (
        <Stack alignItems="flex-end">
          <PrimaryButton
            endIcon={<DownloadIcon />}
            onClick={() => exportOrdersToExcel(sortedOrders)}
            sx={{ mb: 2 }}
          >
            Descargar Excel
          </PrimaryButton>
        </Stack>
      )}

      <PreordersFilters
        statusFilter={statusFilter}
        onStatusChange={(v) => setStatusFilter(v as OrderStatusType | "all")}
        userFilter={userFilter}
        onUserChange={(v) => setUserFilter(v)}
        users={users}
      />

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: 4,
          border: "1px solid",
          borderColor: (theme) => theme.palette.grey[200],
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>

              {isAdmin && (
                <TableCell>
                  <TableSortLabel
                    active={equals(sortBy, "user")}
                    direction={sortDir}
                    onClick={() => toggleSort("user")}
                  >
                    Usuario
                  </TableSortLabel>
                </TableCell>
              )}

              <TableCell align="center">
                <TableSortLabel
                  active={equals(sortBy, "status")}
                  direction={sortDir}
                  onClick={() => toggleSort("status")}
                >
                  Estado
                </TableSortLabel>
              </TableCell>

              <TableCell>Total(€)</TableCell>

              <TableCell>
                <TableSortLabel
                  active={equals(sortBy, "date")}
                  direction={sortDir}
                  onClick={() => toggleSort("date")}
                >
                  Fecha
                </TableSortLabel>
              </TableCell>

              {isAdmin && <TableCell align="center">Aprobar</TableCell>}
              {isAdmin && <TableCell align="center">Cancelar</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow hover>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleExpand(order.id)}
                    >
                      {equals(expandedOrderId, order.id) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{order.id}</TableCell>

                  {isAdmin && (
                    <TableCell>{order.profile_name || "—"}</TableCell>
                  )}

                  <TableCell>
                    <Chip
                      label={orderStatusesDict[order.status]}
                      color={statusColorsDict[order.status]}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>{order.total.toFixed(2)}</TableCell>

                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>

                  {isAdmin && (
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      align="center"
                    >
                      <RoundIconButton
                        disabled={order.status !== "pending"}
                        onClick={() => openStatusDialog(order, "approved")}
                      >
                        {" "}
                        <CheckIcon />
                      </RoundIconButton>
                    </TableCell>
                  )}

                  {isAdmin && (
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      align="center"
                    >
                      <SecondaryRoundIconButton
                        disabled={order.status !== "pending"}
                        onClick={() => openStatusDialog(order, "cancelled")}
                      >
                        {" "}
                        <ClearIcon />
                      </SecondaryRoundIconButton>
                    </TableCell>
                  )}
                </TableRow>

                {equals(expandedOrderId, order.id) && (
                  <PreordersTableContent order={order} />
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={sortedOrders.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>

      <PreordersStatusDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        comment={adminComment}
        onSave={applyStatus}
        onChangeComment={(v) => setAdminComment(v)}
      />
    </>
  );
}

"use client";

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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  TablePagination,
} from "@mui/material";
import { useAuth } from "@/src/context/AuthContext";
import { OrderType, OrderStatusType } from "@/src/types";
import { useMemo, useState } from "react";
import { orderStatusesDict, statusColorsDict } from "@/src/constants";
import PreorderCard from "@/src/components/orders/PreorderCard";
import Modal from "@mui/material/Modal";

interface PreordersTableProps {
  orders: OrderType[];
  refreshOrders: () => void;
}

export default function PreordersTable({
  orders,
  refreshOrders,
}: PreordersTableProps) {
  const { isAdmin } = useAuth();

  const [statusFilter, setStatusFilter] = useState<OrderStatusType | "all">(
    "all",
  );
  const [userFilter, setUserFilter] = useState<string>("all");

  const [sortBy, setSortBy] = useState<"date" | "status" | "user">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      let ok = true;

      if (statusFilter !== "all") ok = ok && order.status === statusFilter;

      if (isAdmin && userFilter !== "all")
        ok = ok && order.profiles?.name === userFilter;

      return ok;
    });
  }, [orders, statusFilter, userFilter, isAdmin]);

  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];

    sorted.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return sortDir === "asc"
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime();

        case "status":
          return sortDir === "asc"
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);

        case "user":
          return sortDir === "asc"
            ? (a.profiles?.name || "").localeCompare(b.profiles?.name || "")
            : (b.profiles?.name || "").localeCompare(a.profiles?.name || "");

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

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            label="Estado"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as OrderStatusType | "all")
            }
          >
            <MenuItem value="all">Todos</MenuItem>
            {Object.keys(orderStatusesDict).map((st) => (
              <MenuItem key={st} value={st}>
                {orderStatusesDict[st as OrderStatusType]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isAdmin && (
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Usuario</InputLabel>
            <Select
              label="Usuario"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              {[...new Set(orders.map((o) => o.profiles?.name))].map(
                (u, i) =>
                  u && (
                    <MenuItem key={i} value={u}>
                      {u}
                    </MenuItem>
                  ),
              )}
            </Select>
          </FormControl>
        )}
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          maxWidth: "100%",
          borderRadius: 4,
          border: "1px solid",
          borderColor: (theme) => theme.palette.grey[200],
          boxShadow: "none",
          width: "100%",
        }}
      >
        <Table
          sx={{
            minWidth: 520,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>

              {isAdmin && (
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "user"}
                    direction={sortDir}
                    onClick={() => toggleSort("user")}
                  >
                    Usuario
                  </TableSortLabel>
                </TableCell>
              )}

              <TableCell>
                <TableSortLabel
                  active={sortBy === "status"}
                  direction={sortDir}
                  onClick={() => toggleSort("status")}
                >
                  Estado
                </TableSortLabel>
              </TableCell>

              <TableCell>Total (€)</TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "date"}
                  direction={sortDir}
                  onClick={() => toggleSort("date")}
                >
                  Fecha
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedOrder(order)}
              >
                <TableCell>{order.id}</TableCell>

                {isAdmin && (
                  <TableCell>{order.profiles?.name || "—"}</TableCell>
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
                  {new Date(order.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
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

      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95vw", sm: 500, md: 600 },
          }}
        >
          {selectedOrder && (
            <PreorderCard
              order={selectedOrder}
              refreshOrders={() => {
                refreshOrders();
                setSelectedOrder(null);
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}

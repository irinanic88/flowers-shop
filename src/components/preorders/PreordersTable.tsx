"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper,
  TableSortLabel,
} from "@mui/material";

import { PreodersTableProps } from "@/src/types/propsTypes";

import { PreordersRow } from "./PreordersRow";

export function PreordersTable({
  orders,
  expandedOrderId,
  toggleExpand,
  isAdmin,
  sortBy,
  sortDir,
  toggleSort,
  openStatusDialog,
  page,
  rowsPerPage,
  total,
  setPage,
  setRowsPerPage,
}: PreodersTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
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

            <TableCell>Total</TableCell>

            <TableCell>
              <TableSortLabel
                active={sortBy === "date"}
                direction={sortDir}
                onClick={() => toggleSort("date")}
              >
                Fecha
              </TableSortLabel>
            </TableCell>

            <TableCell>Comentarios</TableCell>

            {isAdmin && <TableCell align="center">Aprobar</TableCell>}
            {isAdmin && <TableCell align="center">Rechazar</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 9 : 6} align="center">
                No hay pedidos todavía
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <PreordersRow
                key={order.id}
                order={order}
                expanded={expandedOrderId === order.id}
                toggleExpand={toggleExpand}
                isAdmin={isAdmin}
                openStatusDialog={openStatusDialog}
              />
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );
}

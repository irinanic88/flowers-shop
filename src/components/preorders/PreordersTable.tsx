'use client';

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
} from '@mui/material';

import { useAuth } from '@/src/context/AuthContext';
import { usePreordersContext } from '@/src/context/PreordersContext';

import { PreordersRow } from './PreordersRow';

export function PreordersTable() {
  const {
    paginated: orders,
    sortBy,
    sortDir,
    toggleSort,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    sortedOrders,
  } = usePreordersContext();
  const { isAdmin } = useAuth();

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
                  active={sortBy === 'user'}
                  direction={sortDir}
                  onClick={() => toggleSort('user')}
                >
                  Usuario
                </TableSortLabel>
              </TableCell>
            )}

            <TableCell>
              <TableSortLabel
                active={sortBy === 'status'}
                direction={sortDir}
                onClick={() => toggleSort('status')}
              >
                Estado
              </TableSortLabel>
            </TableCell>

            <TableCell>Total</TableCell>

            <TableCell>
              <TableSortLabel
                active={sortBy === 'date'}
                direction={sortDir}
                onClick={() => toggleSort('date')}
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
            orders.map((order) => <PreordersRow key={order.id} order={order} />)
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sortedOrders.length}
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

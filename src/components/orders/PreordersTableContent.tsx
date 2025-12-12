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
  IconButton,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { OrderType, OrderStatusType } from "@/src/types";
import { orderStatusesDict, statusColorsDict } from "@/src/constants";
import {
  RoundIconButton,
  SecondaryRoundIconButton,
} from "@/src/styledComponents";
import { equals } from "ramda";
import { useAuth } from "@/src/context/AuthContext";

interface PreordersTableContentProps {
  order: OrderType;
}

export function PreordersTableContent({ order }: PreordersTableContentProps) {
  const { isAdmin } = useAuth();

  return (
    <TableRow>
      <TableCell colSpan={isAdmin ? 8 : 5} sx={{ p: 0 }}>
        <Box sx={{ px: 2, py: 2, bgcolor: "grey.50" }}>
          <Table
            size="small"
            sx={{
              "& tbody tr:last-child td": {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
                <TableCell align="center" sx={{ width: 90, fontWeight: 600 }}>
                  Precio
                </TableCell>
                <TableCell align="center" sx={{ width: 90, fontWeight: 600 }}>
                  Cantidad
                </TableCell>
                <TableCell align="right" sx={{ width: 90, fontWeight: 600 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order.items?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="center">
                    € {item.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">
                    € {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableCell>
    </TableRow>
  );
}

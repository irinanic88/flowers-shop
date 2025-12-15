"use client";

import {
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { OrderStatusType } from "@/src/types";
import { orderStatusesDict } from "@/src/constants";
import { useAuth } from "@/src/context/AuthContext";

interface PreordersFiltersProps {
  statusFilter: OrderStatusType | "all";
  onStatusChange: (v: OrderStatusType | "all") => void;
  userFilter: string;
  onUserChange: (v: string) => void;
  users: string[];
}

export function PreordersFilters({
  statusFilter,
  onStatusChange,
  userFilter,
  onUserChange,
  users,
}: PreordersFiltersProps) {
  const { isAdmin } = useAuth();

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <FormControl size="small" variant="filled" sx={{ minWidth: 150 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) =>
            onStatusChange(e.target.value as OrderStatusType | "all")
          }
          sx={{ backgroundColor: "transparent" }}
        >
          <MenuItem value="all">Todos</MenuItem>
          {Object.entries(orderStatusesDict).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isAdmin && (
        <FormControl size="small" variant="filled" sx={{ minWidth: 150 }}>
          <InputLabel>Usuario</InputLabel>
          <Select
            value={userFilter}
            onChange={(e) => onUserChange(e.target.value)}
            sx={{ backgroundColor: "transparent" }}
          >
            <MenuItem value="all">Todos</MenuItem>
            {users.map((u) => (
              <MenuItem key={u} value={u}>
                {u}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  );
}

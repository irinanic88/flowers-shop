"use client";

import React from "react";
import { FilterSelect } from "@/src/components/common/FilterSelect.tsx";
import {
  Stack,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { availabilityStatusesDict } from "@/src/constants";
import { DisponibilityType } from "@/src/types/types.ts";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

type ProductsFiltersProps = {
  availabilityFilter: DisponibilityType | "all";
  onAvailabilityChange: (v: DisponibilityType | "all") => void;
  onSearchChange: (v: string) => void;
  searchFilter: string;
};

export function ProductsFilters({
  availabilityFilter,
  onAvailabilityChange,
  searchFilter,
  onSearchChange,
}: ProductsFiltersProps) {
  return (
    <Stack spacing={2}>
      <OutlinedInput
        size="small"
        value={searchFilter}
        placeholder="Buscar articulos"
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: { xs: "100%", md: "350px" } }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          searchFilter ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => onSearchChange("")}
                edge="end"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      <FilterSelect
        label="Disponibilidad"
        value={availabilityFilter}
        options={availabilityStatusesDict}
        onChange={onAvailabilityChange}
      />
    </Stack>
  );
}

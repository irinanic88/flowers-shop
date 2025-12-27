'use client';

import React from 'react';
import {
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ProductType } from '@/src/types';
import { availabilityStatusesDict } from '@/src/constants';

interface ProductsFiltersProps {
  availabilityFilter: string;
  onAvailabilityChange: (v: string) => void;
  products: ProductType[];
}

export function ProductsFilters({
  availabilityFilter,
  onAvailabilityChange,
}: ProductsFiltersProps) {
  return (
    <Stack
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: 300,
        },
        maxWidth: '100%',
      }}
    >
      <FormControl size="small" variant="filled" sx={{ width: '100%' }}>
        <InputLabel>Disponibilidad</InputLabel>
        <Select
          value={availabilityFilter}
          onChange={(e) => onAvailabilityChange(e.target.value)}
          sx={{ backgroundColor: 'transparent' }}
        >
          <MenuItem value="all">Todos</MenuItem>
          {Object.entries(availabilityStatusesDict).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

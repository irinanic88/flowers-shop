'use client';

import React from 'react';
import { FilterSelect } from '@/src/components/FilterSelect';
import { Stack } from '@mui/material';
import { availabilityStatusesDict } from '@/src/constants';

export function ProductsFilters({
  availabilityFilter,
  onAvailabilityChange,
}: ProductsFiltersProps) {
  return (
    <Stack>
      <FilterSelect
        label="Disponibilidad"
        value={availabilityFilter}
        options={availabilityStatusesDict}
        onChange={onAvailabilityChange}
      />
    </Stack>
  );
}

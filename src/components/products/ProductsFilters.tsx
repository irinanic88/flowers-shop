'use client';

import React from 'react';
import { FilterSelect } from '@/src/components/FilterSelect';
import { Stack } from '@mui/material';
import { availabilityStatusesDict } from '@/src/constants';
import { DisponibilityType } from '@/src/types';

type ProductsFiltersProps = {
  availabilityFilter: DisponibilityType | 'all';
  onAvailabilityChange: (v: DisponibilityType | 'all') => void;
};

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

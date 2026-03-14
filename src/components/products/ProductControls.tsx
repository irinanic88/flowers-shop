import { Stack } from '@mui/material';
import React from 'react';

import { ProductsFilters } from '@/src/components/products/ProductsFilters';
import { ProductsControlsProps } from '@/src/types/propsTypes';

export default function ProductsControls({
  availabilityFilter,
  isProductListEmpty,
  setAvailabilityFilter,
  searchTerm,
  setSearchTerm,
}: ProductsControlsProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <ProductsFilters
        availabilityFilter={availabilityFilter}
        isProductListEmpty={isProductListEmpty}
        searchFilter={searchTerm}
        onAvailabilityChange={setAvailabilityFilter}
        onSearchChange={setSearchTerm}
      />
    </Stack>
  );
}

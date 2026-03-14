import { useMemo } from 'react';

import type { DisponibilityType, ProductType } from '@/src/types/types';

export function useFilteredProducts(
  products: ProductType[],
  availabilityFilter: DisponibilityType | 'all',
  searchTerm: string,
  isAdmin: boolean,
) {
  return useMemo(() => {
    return products
      .filter((product) => {
        const availabilityOk =
          availabilityFilter === 'all' ||
          (availabilityFilter === 'available' && product.available > 0) ||
          (availabilityFilter === 'outOfStock' && product.available === 0);

        const userAccessOk = isAdmin || product.available > 0;

        return availabilityOk && userAccessOk;
      })
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [products, availabilityFilter, isAdmin, searchTerm]);
}

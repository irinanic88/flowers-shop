'use client';

import { useMemo, useState } from 'react';

import { useAuth } from '@/src/context/AuthContext';
import { useProducts } from '@/src/context/ProductsContext';
import { UseProductsStateProps } from '@/src/types/propsTypes';
import type {
  DisponibilityType,
  ProductSortKey,
  ProductsViewType,
} from '@/src/types/types';

export function useProductsState(): UseProductsStateProps {
  const { products } = useProducts();
  const { isAdmin } = useAuth();

  const [availabilityFilter, setAvailabilityFilter] = useState<
    DisponibilityType | 'all'
  >('all');

  const [searchTerm, setSearchTerm] = useState('');

  const [sortBy, setSortBy] = useState<ProductSortKey>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const [viewMode, setViewMode] = useState<ProductsViewType>('cards');

  const toggleSort = (key: ProductSortKey) => {
    if (sortBy === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const availabilityOk =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && product.available > 0) ||
        (availabilityFilter === 'outOfStock' && product.available === 0);

      const userAccessOk = isAdmin || product.available > 0;

      const searchOk = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return availabilityOk && userAccessOk && searchOk;
    });

    return [...filtered].sort((a, b) => {
      let result = 0;

      if (sortBy === 'title') result = a.title.localeCompare(b.title);
      if (sortBy === 'price') result = a.price - b.price;
      if (sortBy === 'available') result = a.available - b.available;

      return sortDir === 'asc' ? result : -result;
    });
  }, [products, availabilityFilter, searchTerm, sortBy, sortDir, isAdmin]);

  const isProductListEmpty = visibleProducts.length === 0;

  return {
    products: visibleProducts,
    isProductListEmpty,

    availabilityFilter,
    setAvailabilityFilter,

    searchTerm,
    setSearchTerm,

    sortBy,
    sortDir,
    toggleSort,

    viewMode,
    setViewMode,
  };
}

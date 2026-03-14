'use client';

import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

import DeleteProductDialog from '@/src/components/products/DeleteProductDialog';
import { ProductsFilters } from '@/src/components/products/ProductsFilters';
import ProductsGrid from '@/src/components/products/ProductsGrid';
import { useAlert } from '@/src/context/AlertContext';
import { useAuth } from '@/src/context/AuthContext';
import { useProducts } from '@/src/context/ProductsContext';
import { useDeleteProduct } from '@/src/hooks/api';
import { useFilteredProducts } from '@/src/hooks/useFilteredProducts';
import type { DisponibilityType, ProductType } from '@/src/types/types';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<
    DisponibilityType | 'all'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { products } = useProducts();
  const { isUnknownUser, isAdmin } = useAuth();
  const { showAlert } = useAlert();
  const { deleteProduct } = useDeleteProduct();

  const filteredProducts = useFilteredProducts(
    products,
    availabilityFilter,
    searchTerm,
    isAdmin,
  );

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    const { error, success } = await deleteProduct(selectedProduct);

    if (error) return showAlert(error);
    if (success) showAlert(success);

    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        {isUnknownUser && (
          <Typography sx={{ textAlign: 'center', my: 4 }} variant="h4">
            Disponible para pedir
          </Typography>
        )}

        {isAdmin && (
          <ProductsFilters
            availabilityFilter={availabilityFilter}
            searchFilter={searchTerm}
            onAvailabilityChange={setAvailabilityFilter}
            onSearchChange={setSearchTerm}
          />
        )}

        {filteredProducts.length > 0 ? (
          <ProductsGrid
            products={filteredProducts}
            onDelete={(product) => {
              setSelectedProduct(product);
              setOpenDeleteDialog(true);
            }}
          />
        ) : (
          <Typography textAlign="center" color="text.secondary">
            No hay productos disponibles por el momento.
          </Typography>
        )}
      </Stack>

      <DeleteProductDialog
        product={selectedProduct}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
}

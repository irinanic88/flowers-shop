'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Stack, Typography } from '@mui/material';
import { ProductType } from '@/src/types';
import ProductCard from '@/src/components/products/ProductCard';
import { useAuth } from '@/src/context/AuthContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { isUnknownUser } = useAuth();

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProducts(data);
  }

  useEffect(() => {
    void fetchProducts();

    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        fetchProducts,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!products.length) {
    return (
      <Stack mt={20} alignItems="center">
        <Typography color="text.secondary">
          No hay productos disponibles por el momento.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {isUnknownUser && (
        <Typography sx={{ textAlign: 'center', my: 4 }} variant="h4">
          Disponible para preordenar
        </Typography>
      )}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Stack>
  );
}

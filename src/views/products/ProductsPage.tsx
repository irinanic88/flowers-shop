"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Box, Stack, Typography, Grid } from "@mui/material";
import { ProductType } from "@/src/types";
import ProductCard from "@/src/views/products/ProductCard";
import { isEmpty } from "ramda";
import { useAuth } from "@/src/context/AuthContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const { isUnknownUser } = useAuth();

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data);
  }

  useEffect(() => {
    void fetchProducts();

    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          void fetchProducts();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isEmpty(products)) {
    return (
      <Stack mt={20} alignItems="center" justifyContent="center">
        <Typography color="text.secondary">
          No hay productos disponibles por el momento.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {!isEmpty(products) && isUnknownUser && (
        <Typography
          sx={{ textAlign: "center", mt: 4 }}
          variant="h4"
          color="text.primary"
        >
          Disponible para preordenar
        </Typography>
      )}
      <Grid container spacing={2} justifyContent="flex-start">
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

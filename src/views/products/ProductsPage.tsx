"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { ProductType, UserRoleTypes } from "@/src/types";
import ProductCard from "@/src/views/products/ProductCard";
import { isEmpty } from "ramda";

export default function ProductsPage({
  userRole,
}: {
  userRole: UserRoleTypes;
}) {
  const [products, setProducts] = useState<ProductType[]>([]);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data);
  }

  useEffect(() => {
    void fetchProducts();
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
    <Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid
            key={product.id}
            component="div"
            sx={{
              width: { xs: "100%", sm: "50%", md: "33.33%" },
              minHeight: { md: 400 },
            }}
          >
            <ProductCard
              product={product}
              onDeleted={fetchProducts}
              userRole={userRole}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

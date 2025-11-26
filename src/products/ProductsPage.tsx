"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Typography, Box, Grid } from "@mui/material";
import { Product } from "@/app/types";
import ProductCard from "@/src/products/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data);
    }
    void load();
  }, []);

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
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

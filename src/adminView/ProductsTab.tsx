import { Box, Stack } from "@mui/material";
import { PrimaryButton } from "@/app/styledComponents";
import { useState } from "react";
import AdminProductForm from "@/src/adminView/AdminProductForm";
import ProductsPage from "@/src/products/ProductsPage";
import { Product } from "@/app/types";

export default function ProductsTab() {
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (p: Product) => {
    console.log("Nuevo producto:", p);

    setShowForm(false);
  };

  return (
    <Box>
      {showForm ? (
        <AdminProductForm
          onClose={() => setShowForm(false)}
          onAdded={handleAddProduct}
        />
      ) : (
        <Stack spacing={2} alignItems="flex-end">
          <PrimaryButton
            onClick={() => setShowForm(true)}
            sx={{ width: "fit-content" }}
          >
            Añadir
          </PrimaryButton>
          <ProductsPage />
        </Stack>
      )}
    </Box>
  );
}

import { Box, Stack } from "@mui/material";
import { PrimaryButton } from "@/src/styledComponents";
import { useState } from "react";
import AdminProductForm from "@/src/views/adminView/AdminProductForm";
import ProductsPage from "@/src/views/products/ProductsPage";
import { ProductType } from "@/src/types";
import AddIcon from "@mui/icons-material/Add";
import { userRolesDict } from "@/src/constants";

export default function ProductsTab() {
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (p: ProductType) => {
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
        <Stack spacing={2} alignItems="flex-start">
          <PrimaryButton
            onClick={() => setShowForm(true)}
            sx={{ width: "fit-content" }}
            endIcon={<AddIcon />}
          >
            Añadir
          </PrimaryButton>
          <ProductsPage userRole={userRolesDict.ADMIN} />
        </Stack>
      )}
    </Box>
  );
}

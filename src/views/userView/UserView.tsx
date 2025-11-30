"use client";

import ProductsPage from "@/src/views/products/ProductsPage";
import { Box, Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { userRolesDict } from "@/src/constants";
import CartPanel from "@/src/components/CartPanel";

export default function UserView() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleToggleCart = () => setCartOpen((prev) => !prev);

  return (
    <Box sx={{ mt: 2, position: "relative" }}>
      <ProductsPage userRole={userRolesDict.USER} />

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={handleToggleCart}
      >
        <ShoppingCartIcon />
      </Fab>

      {cartOpen && <CartPanel open={cartOpen} onClose={handleToggleCart} />}
    </Box>
  );
}

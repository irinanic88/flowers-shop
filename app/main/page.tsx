"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "@/src/context/AuthContext";
import ProductsPage from "@/src/products/ProductsPage";
import Loader from "@/src/components/Loader";
import AdminView from "@/src/adminView/AdminView";

export default function Main() {
  const [userRoles, setUserRoles] = useState({ admin: false, user: false });
  const { role, name, loading } = useAuth();

  useEffect(() => {
    if (role) {
      setUserRoles((prev) => ({ ...prev, [role]: true }));
    }
  }, [role]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Hola, {name ?? "Usuario"}!</Typography>
      {userRoles.admin ? <AdminView /> : <ProductsPage />}
    </Box>
  );
}

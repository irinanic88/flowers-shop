"use client";

import { Stack, Typography, DialogContent, Dialog, Box } from "@mui/material";
import ProductCard from "@/src/components/products/ProductCard";
import { useAuth } from "@/src/context/AuthContext";
import { useProducts } from "@/src/context/ProductsContext";
import React, { useMemo, useState } from "react";
import type { DisponibilityType, ProductType } from "@/src/types/types.ts";
import { PrimaryButton, SecondaryButton } from "@/src/styledComponents";
import { isNotEmpty } from "ramda";
import { ProductsFilters } from "@/src/components/products/ProductsFilters";
import { useAlert } from "@/src/context/AlertContext";
import { useDeleteProduct } from "@/src/hooks/api.ts";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<
    DisponibilityType | "all"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { products } = useProducts();
  const { isUnknownUser, isAdmin } = useAuth();
  const { showAlert } = useAlert();
  const { deleteProduct } = useDeleteProduct();

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const availabilityOk =
          availabilityFilter === "all" ||
          (availabilityFilter === "available" && product.available > 0) ||
          (availabilityFilter === "outOfStock" && product.available === 0);

        const userAccessOk = isAdmin || product.available > 0;

        return availabilityOk && userAccessOk;
      })
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [products, availabilityFilter, isAdmin, searchTerm]);

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    const { error, success } = await deleteProduct(selectedProduct);

    if (error) {
      showAlert(error);
      return;
    }

    showAlert(success);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {isUnknownUser && (
          <Typography
            sx={{ textAlign: "center", my: 4 }}
            variant="h4"
            color="text.primary"
          >
            Disponible para pedir
          </Typography>
        )}

        {isAdmin && (
          <ProductsFilters
            availabilityFilter={availabilityFilter}
            searchFilter={searchTerm}
            onAvailabilityChange={(v: DisponibilityType | "all") =>
              setAvailabilityFilter(v)
            }
            onSearchChange={(v: string) => setSearchTerm(v)}
          />
        )}

        {isNotEmpty(filteredProducts) ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 1400,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(300px, 350px))",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={(p: ProductType) => {
                      setSelectedProduct(p);
                      setOpenDeleteDialog(true);
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", height: 200 }}
          >
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              No hay productos disponibles por el momento.
            </Typography>
          </Stack>
        )}
      </Stack>

      {openDeleteDialog && (
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          fullWidth
        >
          <DialogContent>
            <Typography sx={{ mb: 1 }}>
              Eliminar articulo {selectedProduct?.title}?
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
              <SecondaryButton onClick={() => setOpenDeleteDialog(false)}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton onClick={handleDeleteProduct}>
                Eliminar
              </PrimaryButton>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

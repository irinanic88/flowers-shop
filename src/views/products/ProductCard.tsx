"use client";

import React, { useState } from "react";
import { Typography, Box, Modal, Stack, Chip } from "@mui/material";
import Image from "next/image";
import { ProductType } from "@/src/types";
import ProductInfo from "@/src/views/products/ProductInfo";
import IncrementDecrementButtons from "@/src/views/products/IncrementDecrementButtons";
import { supabase } from "@/lib/supabase";
import { PanelCard, RoundIconButton } from "@/src/styledComponents";
import { useCart } from "@/src/context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useOrders } from "@/src/context/OrdersContext";
import { useAuth } from "@/src/context/AuthContext";
import AdminProductForm from "@/src/views/adminView/AdminProductForm";
import ProductImages from "@/src/views/products/ProductImages";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isAdmin = false, isUser = false, isUnknownUser = true } = useAuth();

  const { items, updateItemQuantity } = useCart();
  const itemInCart = items.find((i) => i.id === product.id);
  const quantity = itemInCart?.quantity ?? 0;

  const { orders } = useOrders();

  const totalOrdered = orders.reduce((sum, order) => {
    if (!order.items) return sum;
    const item = order.items.find((i) => i.product_id === product.id);
    return sum + (item?.quantity ?? 0);
  }, 0);

  const handleCloseModal = () => setSelectedImage(null);

  const handleDeleteProduct = async () => {
    if (!confirm("Eliminar este producto?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        console.error("Error deleting product:", error.message);
        alert("No se pudo eliminar el producto.");
        return;
      }

      if (product.images && product.images.length > 0) {
        const filePaths = product.images.map((url) => {
          const parts = url.split("product-images/");
          return parts[1];
        });

        await supabase.storage.from("product-images").remove(filePaths);
      }

      alert("Producto eliminado.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <PanelCard
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <ProductImages
          images={product.images ?? []}
          title={product.title}
          onSelectImage={(img) => setSelectedImage(img)}
        />

        <ProductInfo product={product} showPrice={!isUnknownUser} />

        {isUser && (
          <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
            <Typography>Preordenar: </Typography>
            <IncrementDecrementButtons
              onChange={(q) =>
                updateItemQuantity(
                  {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                  },
                  q,
                )
              }
              quantity={quantity}
            />
          </Stack>
        )}

        {!isUnknownUser && (
          <Chip
            sx={{ mt: isUser ? 1 : "auto", width: 150 }}
            color="primary"
            size="small"
            label={`disponible: ${product.available} u.`}
            variant="outlined"
          />
        )}

        {isAdmin && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2" color="text.secondary">
              Total preordenado: {totalOrdered ?? 0}
            </Typography>
            <Stack direction="row" spacing={1}>
              <RoundIconButton
                onClick={() => setOpenUpdate(true)}
                color="error"
              >
                <EditIcon fontSize="small" />
              </RoundIconButton>
              <RoundIconButton onClick={handleDeleteProduct} color="error">
                <DeleteIcon fontSize="small" />
              </RoundIconButton>
            </Stack>
          </Stack>
        )}
      </PanelCard>

      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {selectedImage ? (
          <Box sx={{ position: "relative", width: "90vw", height: "90vh" }}>
            <Image
              src={selectedImage}
              alt="Expanded"
              fill
              style={{ objectFit: "contain", cursor: "pointer" }}
              onClick={handleCloseModal}
            />
          </Box>
        ) : (
          <Box />
        )}
      </Modal>

      {openUpdate && (
        <AdminProductForm
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          product={product}
        />
      )}
    </Box>
  );
}

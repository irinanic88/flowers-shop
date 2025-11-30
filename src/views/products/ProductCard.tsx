"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Modal, Stack, Collapse } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import { ProductType, UserRoleTypes } from "@/src/types";
import ProductInfo from "@/src/views/products/ProductInfo";
import IncrementDecrementButtons from "@/src/views/products/IncrementDecrementButtons";
import { supabase } from "@/lib/supabase";
import { PanelCard, RoundIconButton } from "@/src/styledComponents";
import { equals } from "ramda";
import { userRolesDict } from "@/src/constants";
import { useCart } from "@/src/context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useOrders } from "@/src/context/OrdersContext";

interface ProductCardProps {
  product: ProductType;
  onDeleted: () => void;
  userRole: UserRoleTypes;
}

export default function ProductCard({
  product,
  onDeleted,
  userRole,
}: ProductCardProps) {
  const [openImages, setOpenImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { items, updateItemQuantity } = useCart();
  const itemInCart = items.find((i) => i.id === product.id);
  const quantity = itemInCart?.quantity ?? 0;

  const { orders } = useOrders();

  const totalOrdered = orders.reduce((sum, order) => {
    if (!order.items) return sum;
    const item = order.items.find((i) => i.product_id === product.id);
    return sum + (item?.quantity ?? 0);
  }, 0);

  useEffect(() => {
    console.log("ORDENADO", orders);
  }, [orders]);

  const handleOpenImage = (img: string) => setSelectedImage(img);
  const handleCloseModal = () => setSelectedImage(null);

  const hasImages = product.images && product.images.length > 0;
  const moreThanOne = hasImages && product.images.length > 1;

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

      await onDeleted();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <PanelCard
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
        }}
      >
        {hasImages ? (
          <Box sx={{ width: "100%", pt: "100%", position: "relative" }}>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              style={{
                objectFit: "cover",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() => handleOpenImage(product.images![0])}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              pt: "100%",
              position: "relative",
              backgroundColor: "#f0f0f0",
              color: "#888",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              No hay imágenes disponibles
            </Typography>
          </Box>
        )}

        {moreThanOne && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
            <Button
              size="small"
              onClick={() => setOpenImages(!openImages)}
              endIcon={<ArrowDropDownIcon />}
              variant="text"
              sx={{ color: "#555", borderColor: "#ccc" }}
            >
              {openImages
                ? "Ocultar imágenes"
                : `Ver ${product.images!.length - 1} imágenes más`}
            </Button>
          </Box>
        )}

        <Collapse in={openImages}>
          <Stack spacing={1} mt={1}>
            {product.images!.slice(1).map((img, i) => (
              <Box
                key={i}
                sx={{ width: "100%", pt: "100%", position: "relative" }}
              >
                <Image
                  src={img}
                  alt={`${product.title}-${i}`}
                  fill
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => handleOpenImage(img)}
                />
              </Box>
            ))}
          </Stack>
        </Collapse>

        <ProductInfo
          product={product}
          showPrice={!equals(userRole, userRolesDict.NONE)}
        />

        {equals(userRole, userRolesDict.USER) && (
          <Stack direction="row" spacing={1}>
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

        {equals(userRole, userRolesDict.ADMIN) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2" color="text.secondary">
              Total preordenado: {totalOrdered ?? 0}
            </Typography>
            <RoundIconButton onClick={handleDeleteProduct} color="error">
              <DeleteIcon fontSize="small" />
            </RoundIconButton>
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
    </>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import { CartItemCard } from "@/src/components/cart/CartItemCard";
import { CartItemListProps } from "@/src/types/propsTypes.ts";

export function CartItemsList({
  items,
  updateItemQuantity,
}: CartItemListProps) {
  if (!items.length) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Typography color="text.secondary">
          No hay productos en tu preorden.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ flex: 1, overflowY: "auto" }}>
      <Stack spacing={1}>
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            updateItemQuantity={updateItemQuantity}
          />
        ))}
      </Stack>
    </Box>
  );
}

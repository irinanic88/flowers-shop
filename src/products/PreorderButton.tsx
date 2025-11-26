import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Product } from "@/app/types";
import { PrimaryButton } from "@/app/styledComponents";

interface PreorderButtonProps {
  product: Product;
  onAdd: (p: Product, q: number) => void;
}

export default function PreorderButton({
  product,
  onAdd,
}: PreorderButtonProps) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 0));

  return (
    <Stack direction="row" spacing={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={decrement}
          size="small"
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "1px solid #ccc",
          }}
        >
          <Remove sx={{ width: 15, height: 15 }} fontSize="small" />
        </IconButton>

        <Typography>{quantity}</Typography>

        <IconButton
          onClick={increment}
          size="small"
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "1px solid #ccc",
          }}
        >
          <Add sx={{ width: 15, height: 15 }} fontSize="small" />
        </IconButton>
      </Box>

      <PrimaryButton
        disabled={quantity === 0}
        onClick={() => onAdd(product, quantity)}
      >
        Preordenar
      </PrimaryButton>
    </Stack>
  );
}

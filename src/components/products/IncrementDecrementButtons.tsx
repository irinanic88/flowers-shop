import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { equals } from "ramda";

interface PreorderButtonProps {
  inStock: number;
  quantity: number;
  onChange: (q: number) => void;
}

export default function IncrementDecrementButtons({
  inStock,
  quantity,
  onChange,
}: PreorderButtonProps) {
  const increment = () => {
    if (quantity > inStock) return;
    return onChange(quantity + 1);
  };

  const decrement = () => {
    if (quantity < 0) return;
    return onChange(quantity - 1);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        disabled={equals(quantity, 0)}
        onClick={decrement}
        size="small"
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      >
        <Remove sx={{ width: 15, height: 15 }} />
      </IconButton>

      <Typography>{quantity}</Typography>

      <IconButton
        disabled={quantity >= inStock}
        onClick={increment}
        size="small"
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      >
        <Add sx={{ width: 15, height: 15 }} />
      </IconButton>
    </Box>
  );
}

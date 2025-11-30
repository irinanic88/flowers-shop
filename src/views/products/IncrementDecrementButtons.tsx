import React, { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface PreorderButtonProps {
  quantity: number;
  onChange: (q: number) => void;
}

export default function IncrementDecrementButtons({
  quantity,
  onChange,
}: PreorderButtonProps) {
  const increment = () => onChange(quantity + 1);
  const decrement = () => onChange(Math.max(quantity - 1, 0));

  useEffect(() => {
    onChange(quantity);
  }, [quantity]);

  return (
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
  );
}

"use client";
import { useState } from "react";
import {
  CardContent,
  Typography,
  Stack,
  Button,
  Collapse,
  Chip,
} from "@mui/material";
import GrassIcon from "@mui/icons-material/Grass";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Product } from "@/src/types";

interface ProductInfoProps {
  product: Product;
  showPrice: boolean;
}

export default function ProductInfo({
  product,
  showPrice = false,
}: ProductInfoProps) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <CardContent sx={{ flexGrow: 1, px: 0, py: 1 }}>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography variant="h6">{product.title}</Typography>
        {showPrice && (
          <Chip
            label={`€ ${product.price}`}
            color="primary"
            sx={{ fontWeight: "bold" }}
            variant="outlined"
          />
        )}
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
        <Stack direction="row" spacing={0.5}>
          <GrassIcon fontSize="small" />
          <Typography variant="body2">Macetas: {product.pots_count}</Typography>
        </Stack>
      </Stack>

      {product.comment && (
        <>
          <Button
            size="small"
            onClick={() => setOpenComment(!openComment)}
            endIcon={<ArrowDropDownIcon />}
            sx={{ mt: 1 }}
          >
            {openComment ? "Ocultar comentario" : "Ver comentario"}
          </Button>
          <Collapse in={openComment}>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
              {product.comment}
            </Typography>
          </Collapse>
        </>
      )}
    </CardContent>
  );
}

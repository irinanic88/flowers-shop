"use client";
import {
  CardContent,
  Typography,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import GrassIcon from "@mui/icons-material/Grass";
import { ProductType } from "@/src/types";
import HeightIcon from "@mui/icons-material/Height";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ProductInfoProps {
  product: ProductType;
  showPrice: boolean;
}

export default function ProductInfo({
  product,
  showPrice = false,
}: ProductInfoProps) {
  return (
    <CardContent sx={{ flexGrow: 1, px: 0, py: 1, mb: 1.5 }}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "65px",
            }}
          >
            {product.title}
          </Typography>

          {showPrice && (
            <Chip
              label={`${product.price} €`}
              color="primary"
              sx={{ fontWeight: "bold", fontSize: 16 }}
              variant="outlined"
            />
          )}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
          <Stack direction="row" spacing={0.5}>
            <HeightIcon fontSize="small" />
            <Typography variant="body2">
              Altura: {product.height ? `${product.height} cm` : "--"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <GrassIcon fontSize="small" />
            <Typography variant="body2">
              Macetas: {product.pots_count} m/u
            </Typography>
          </Stack>
        </Stack>

        {product.comment && (
          <Accordion
            disableGutters
            square
            sx={{
              mt: 1,
              background: (theme) => theme.palette.secondary.main,
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Nota del vendedor:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{product.comment}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>
    </CardContent>
  );
}
